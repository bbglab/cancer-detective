<img src="logo.png" alt="Cancer Detective" width="120px" height="110px">

# [Cancer Detective](https://bbglab.irbbarcelona.org/cancer-detective/home)

An analysis simulation based on [Cancer Genome Interpreter](https://www.cancergenomeinterpreter.org/home), for an educational purpose. 

## Installation

It is recommended to use [Conda](https://docs.conda.io/en/latest/) or any other type of environment, but not required.

```bash
conda create --name cancer-detective
conda activate cancer-detective
conda install pip
pip install -r requirements.txt
python3 setup.py develop
```

## Usage

Running the website:

```bash
python3 web.py
```

The website should be accessible by going in your
browser to http://localhost:8080/

Running as cli:

```bash
play -c [lung/skin]
```

or see help:

```bash
play --help
```

## Configuration

In the `conf` folder you can create a file named
`game.cfg` or you can pass a different location
to the script:

```bash
python3 web.py /path/to/game.cfg
```

This configuration file can be used to tweak the
server and the application configuration. 
Take a look at the `conf/game.spec.cfg` file
for further details.

## Contributing

Feel free to contribute as much as you want to the code.

See [CONTRIBUTING](CONTRIBUTING.md) for guidelines on contributing and respect your behaviour specified at [CODE OF CONDUCT](CODE_OF_CONDUCT.md).

For more information, see also [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/).

## License

The software is licensed under [GNU-GPLv3](LICENSE), and 
the the artworks in the images folder are licensed
under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.txt).
