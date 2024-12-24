import os

class Config:
    # Базовые настройки
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard-to-guess-string'
    
    # Настройки базы данных
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(BASE_DIR, "instance", "database.sqlite")}'
    
    # Настройки API
    API_TITLE = 'MogCommunity API'
    API_VERSION = 'v1'
    
    # Настройки CORS
    CORS_ORIGINS = ['http://localhost:3000']