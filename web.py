from os import path

import cherrypy
import random
from configobj import ConfigObj
from jinja2 import Environment, FileSystemLoader
from validate import Validator

from game import muts

_THIS_FOLDER = path.dirname(path.abspath(__file__))


class Game:
    def __init__(self, mount_point="/"):
        self._mount_point = mount_point
        self._conf = {"/": {}}

        # static dirs for the server
        static_dirs = ["css", "images", "js", "libs"]
        static_base_dir = path.abspath(path.join(_THIS_FOLDER, "static"))
        for dir in static_dirs:
            self._conf["/" + dir] = {
                "tools.staticdir.on": True,
                "tools.staticdir.dir": path.join(static_base_dir, dir),
            }

        # template engine
        env = Environment(
            loader=FileSystemLoader(path.join(_THIS_FOLDER, "templates")),
            trim_blocks=True,
            lstrip_blocks=True,
        )
        env.globals["path_info"] = lambda: cherrypy.request.path_info
        self._env = env

    @property
    def mount_point(self):
        return self._mount_point

    @property
    def conf(self):
        return self._conf

    @cherrypy.expose
    def index(self):
        raise cherrypy.HTTPRedirect("home")

    @cherrypy.expose
    def home(self):
        return self._env.get_template("home.html").render()

    @cherrypy.expose
    def about(self):
        return self._env.get_template("about.html").render()

    @cherrypy.expose
    def play(self):
        return self._env.get_template("play.html").render()

    @cherrypy.expose
    def resources(self):
        return self._env.get_template("resources.html").render()

    def _get_name_card(self, type):
        names = {
            'lung': 'Lung cancer',
            'skin': 'Skin cancer',
            'riskFactor1': 'Age',
            'riskFactor2lung': 'Smoking',
            'riskFactor2skin': 'Sun exposure',
            'riskFactor3lung': 'Smoking exposure',
            'riskFactor3skin': 'Sun protection',
        }
        return names[type]

    @cherrypy.expose
    def submit(self, **kwargs):

        # validate input
        ttype = kwargs["ttype"]
        if ttype not in {"skin", "lung"}:
            raise cherrypy.HTTPError(422, f"Invalid ttype {ttype}")

        mutations = 0
        for key in ["riskFactor1", "riskFactor2", "riskFactor3"]:
            if key not in kwargs:
                raise cherrypy.HTTPError(422, f"Missing {key}")
            else:
                risk_factor = kwargs[key]
                if risk_factor not in {"1", "2", "3"}:
                    raise cherrypy.HTTPError(422, f"Invalid risk factor {risk_factor}")
                else:
                    mutations += int(risk_factor)

        code = kwargs.get("code", None)
        if code is not None and not code.isalnum():
            raise cherrypy.HTTPError(422, f"Invalid code {code}")

        # TODO pass a code to mutations so that the cache works
        df = muts.run(ttype, mutations, code=code)
        df['targeted_therapy_approved'] = df['targeted_therapy_approved'].astype(str)

        data = df.T.to_dict()

        attributes = {}
        attributes['ttype'] = {'type': kwargs.get("ttype", None),
                               'name': self._get_name_card(kwargs.get("ttype", None))}

        attributes['riskFactor1'] = {'type': kwargs.get("riskFactor1", None),
                                     'name': self._get_name_card("riskFactor1")}
        attributes['riskFactor2'] = {'type': kwargs.get("riskFactor2", None),
                                     'name': self._get_name_card("riskFactor2" + kwargs.get("ttype", None))}
        attributes['riskFactor3'] = {'type': kwargs.get("riskFactor3", None),
                                     'name': self._get_name_card("riskFactor3" + kwargs.get("ttype", None))}

        questions_results=[]
        passenger_muts=df[df['driver_passenger']=='passenger']['mutation_id'].to_list()
        driver_muts=df[df['driver_passenger']=='driver']['mutation_id'].to_list()
        #question 1
        questions_results.append({'question':'How many drivers were found in your sample?',
                                  'answers':[{'answer': mutations, 'correct': False},
                                            {'answer': len(driver_muts), 'correct': True},
                                            {'answer': 0, 'correct': False},
                                            {'answer': len(df[df['driver_passenger']=='passenger']), 'correct': False},
                                            {'answer': len(df[df['driver_passenger'] == 'driver'])+1,'correct': False}]
                                })

        #question 2
        questions_results.append({'question':'Which of these mutations is a driver mutation?',
                                  'answers':[{'answer': 'There are no driver mutations', 'correct': False},
                                            {'answer': passenger_muts[0].split('_')[1], 'correct': False},
                                            {'answer': passenger_muts[-1].split('_')[1], 'correct': False},
                                            {'answer': driver_muts[0].split('_')[1], 'correct': True}]
                                })
        #question 3
        questions_results.append({'question':'Which of these genes is mutated in your sample?',
                                  'answers':[{'answer': driver_muts[0].split('_')[1], 'correct': False},
                                            {'answer': passenger_muts[0].split('_')[1], 'correct': False},
                                            {'answer': passenger_muts[-1].split('_')[0], 'correct': True},
                                            {'answer': 'None of the above', 'correct': False}]
                                })
        #question 4
        df_treatment=df.dropna(axis=0,subset=['targeted_therapy'])
        other_therapies=random.sample(set(['Dabrafenib','Erlotinib','Rociletinib,HM61713','Afatinib','Dasatinib',
                                            'Dabrafenib;Trametinib','Vemurafenib','Sorafenib'
                                            ]) - set(df_treatment['targeted_therapy'].to_list()),3)

        questions_results.append({'question':'Which treatments of personalised medicine could be used in this patient?',
                                  'answers':[{'answer': other_therapies[0], 'correct': False},
                                            {'answer': other_therapies[1], 'correct': False},
                                            {'answer': df_treatment['targeted_therapy'].to_list()[0], 'correct': True},
                                            {'answer': other_therapies[2], 'correct': False}]
                                })
        return self._env.get_template("results.html").render(
            mutations=data, attributes=attributes,questions_results=questions_results)


def start_server(conf_file=None):

    if conf_file is None:
        conf_file = path.join(_THIS_FOLDER, "conf", "game.cfg")
        conf_file = conf_file if path.exists(conf_file) else None

    conf_spec = ConfigObj(path.join(_THIS_FOLDER, "conf", "game.spec.cfg"))
    conf = ConfigObj(infile=conf_file, configspec=conf_spec)
    conf.validate(Validator())

    # configure the server
    conf_server = conf["server"]
    cherrypy.config.update({"server.socket_port": int(conf_server["port"])})
    cherrypy.config.update({"server.socket_host": conf_server["host"]})
    cherrypy.config.update({"environment": conf_server["env"]})

    # load the app
    conf_app = conf["app"]
    app = Game(conf_app["mount_point"])
    cherrypy.tree.mount(app, app.mount_point, app.conf)

    # start the server
    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        start_server(sys.argv[1])
    else:
        start_server()
