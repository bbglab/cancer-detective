from os import path

import cherrypy
from configobj import ConfigObj
from jinja2 import Environment, FileSystemLoader
from validate import Validator


_THIS_FOLDER = path.dirname(path.abspath(__file__))


class Game:

    def __init__(self, mount_point='/'):
        self._mount_point = mount_point
        self._conf = {
            '/': {
            }
        }

        # static dirs for the server
        static_dirs = ['css', 'images', 'js', 'libs']
        static_base_dir = path.abspath(path.join(_THIS_FOLDER, 'static'))
        for dir in static_dirs:
            self._conf['/' + dir] = {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': path.join(static_base_dir, dir)
            }

        # template engine
        env = Environment(loader=FileSystemLoader(path.join(_THIS_FOLDER, 'templates')),
                          trim_blocks=True,
                          lstrip_blocks=True)
        env.globals['path_info'] = lambda: cherrypy.request.path_info
        self._env = env

    @property
    def mount_point(self):
        return self._mount_point

    @property
    def conf(self):
        return self._conf

    @cherrypy.expose
    def index(self):
        raise cherrypy.HTTPRedirect('home')

    @cherrypy.expose
    def home(self):
        return self._env.get_template("home.html").render()

    @cherrypy.expose
    def about(self):
        return self._env.get_template("about.html").render()

    @cherrypy.expose
    def game(self):
        return self._env.get_template("game.html").render()

    @cherrypy.expose
    def submit(self, **kwargs):

        # validate input
        ttype = kwargs['ttype']
        if ttype not in {'skin', 'lung'}:
            raise cherrypy.HTTPError(422, f'Invalid ttype {ttype}')

        mutations = 0
        for key in ['riskFactor1', 'riskFactor2', 'riskFactor3']:
            if key not in kwargs:
                raise cherrypy.HTTPError(422, f'Missing {key}')
            else:
                risk_factor = kwargs[key]
                if risk_factor not in {'1', '2', '3'}:
                    raise cherrypy.HTTPError(422, f'Invalid risk factor {risk_factor}')
                else:
                    mutations += int(risk_factor)

        # TODO select mutations

        return self._env.get_template("results.html").render(mutations=mutations)


def start_server(conf_file=None):

    if conf_file is None:
        conf_file = path.join(_THIS_FOLDER, 'conf', 'game.cfg')
        conf_file = conf_file if path.exists(conf_file) else None

    conf_spec = ConfigObj(path.join(_THIS_FOLDER, 'conf', 'game.spec.cfg'))
    conf = ConfigObj(infile=conf_file, configspec=conf_spec)
    conf.validate(Validator())

    # configure the server
    conf_server = conf['server']
    cherrypy.config.update({'server.socket_port': int(conf_server['port'])})
    cherrypy.config.update({'server.socket_host': conf_server['host']})
    cherrypy.config.update({'environment': conf_server['env']})

    # load the app
    conf_app = conf['app']
    app = Game(conf_app['mount_point'])
    cherrypy.tree.mount(app, app.mount_point, app.conf)

    # start the server
    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        start_server(sys.argv[1])
    else:
        start_server()
