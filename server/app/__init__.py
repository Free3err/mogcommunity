from flask import Flask
from flask_cors import CORS
from config import Config
from app.core.database import init_db
from app.api.v1 import api_v1

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Инициализация CORS
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
    
    # Инициализация БД
    init_db(app)
    
    # Регистрация blueprints
    app.register_blueprint(api_v1, url_prefix='/api/v1')
    
    return app