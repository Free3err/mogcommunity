import logging
import os
from dotenv import load_dotenv

load_dotenv()


class DatabaseConfig:
    DATABASE_NAME = os.getenv('DATABASE_NAME')
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')


class AppConfig:
    BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev')
    API_HOST = os.getenv('API_HOST')
    CORS_HEADERS = 'Content-Type'
    CORS_ORIGINS = ['http://localhost:3000', os.getenv('API_HOST')]


class LoggingConfig:
    logging.basicConfig(
        format='%(asctime)s - %(levelname)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    logging.addLevelName(logging.INFO, '\033[32m[INFO]\033[0m')
    logging.addLevelName(logging.WARNING, '\033[33m[WARNING]\033[0m')
    logging.addLevelName(logging.ERROR, '\033[31m[ERROR]\033[0m')
    logging.addLevelName(logging.CRITICAL, '\033[91m[CRITICAL]\033[0m')
