from flask import Flask
from flask_cors import CORS

from .instance.config import AppConfig
from app.api.v1 import bp as api_v1_bp

def create_app(config_class=AppConfig):
    """Creating server instance"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app)

    app.register_blueprint(api_v1_bp)
    
    for rule in app.url_map.iter_rules():
        print(f'{rule.endpoint:50s} {rule.methods} {rule}')

    return app 