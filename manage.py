# -*- coding: utf-8 -*-

import logging
import os
import subprocess

from flask_script import Manager, commands
from flask_frozen import Freezer

from pykwalify.core import Core

from application.app import AppFactory
from application.app_config import Config

app = AppFactory(Config).get_app(__name__)
manager = Manager(app, usage="Main usage")
logger = logging.getLogger()


@manager.option('--host', dest='host', default='0.0.0.0')
@manager.option('--port', dest='port', default=None)
def run(host=None, port=None):
    if port is None:
        port = app.config.get(
            'DEFAULT_PORT', int(os.environ.get('DEFAULT_PORT', 5000)))

    if host is None:
        host = os.environ.get('FLASK_HOST', '0.0.0.0')

    app.run(host=host, port=port)


@manager.command
def build():
    build_css = 'npm run build:css'.split()

    freezer = Freezer(app)
    freezer.freeze()

    # CSS process must be executed after the site is frozen because it needs
    # to run on the compiled CSS and CSS compilation is part of the Flask app.
    try:
        subprocess.check_call(build_css)
    except subprocess.CalledProcessError as e:
        raise commands.InvalidCommand('CSS build error, check npm script.')


@manager.command
def validate():
    validate_yaml(name="articles")
    validate_yaml(name="carousel")
    validate_yaml(name="ctas")
    validate_yaml(name="footer")
    validate_yaml(name="navigation")
    validate_yaml(name="stats")
    validate_yaml(name="timeline")


@manager.command
def validate_yaml(name="articles"):
    source_file = os.path.join('application', 'data', '{}.yml'.format(name))
    schema_file = os.path.join('schemas', '{}.yml'.format(name))
    print('Validating {}'.format(source_file))
    c = Core(source_file=source_file, schema_files=[schema_file])
    c.validate()

if __name__ == '__main__':
    manager.run()
