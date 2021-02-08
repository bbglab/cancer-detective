
# Readme

## Installation and run

You need Python 3.8+.
It is recommended to use conda but not required.

Install:

```sh
python setup.py develop
```

Running the website is as simple as:

```sh
python web.py
```

Running as cli:
```sh
play -c [lung/skin]
```

or see help:
```sh
play --help
```

The website should be accessible by going in your
browser to localhost:8080

## Configuration

In the `conf` folder you can create a file named
`game.cfg` or you can pass a different location
to the script:

```sh
python web.py /path/to/game.cfg
```

This configuration file can be used to tweak the
server and the application configuration. 
Take a look at the `conf/game.spec.cfg` file
for further details.

## Contributing

Feel free to contribute as much as you want to the code.

Some things to take into account:

- do not edit the `static/css/style.css` file directly
  but instead edit the `style.sass` file and compile it

## License

The software is licensed under GNU-GPLv3, and 
the the artworks in the images folder are licensed
under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
