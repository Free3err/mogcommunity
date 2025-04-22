import logging

from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from .instance.config import AppConfig
from .api import register_resources


def log_routes(app):
    """Logging all routes"""
    for rule in app.url_map.iter_rules():
        logging.info(f"{rule.endpoint} - {', '.join(rule.methods)}")


def create_app(config_class=AppConfig):
    """Creating server instance"""
    app = Flask(__name__)
    api = Api(app)

    register_resources(api)
    app.config.from_object(config_class)
    CORS(app)

    log_routes(app)

    return app
