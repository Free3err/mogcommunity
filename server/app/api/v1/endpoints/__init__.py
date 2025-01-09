from flask import Blueprint

users_bp = Blueprint('users', __name__, url_prefix="/users")
developers_bp = Blueprint('developers', __name__, url_prefix="/developers")
projects_bp = Blueprint('projects', __name__, url_prefix="/projects")
auth_bp = Blueprint('auth', __name__, url_prefix="/auth")

# Импортируем все модули с маршрутами
from . import users, projects, developers, auth

"""Export blueprints"""
blueprints = [
    users_bp,
    projects_bp,
    developers_bp,
    auth_bp
]
