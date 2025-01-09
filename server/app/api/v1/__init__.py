from flask import Blueprint

from .endpoints import users_bp, projects_bp, developers_bp, auth_bp

bp = Blueprint("api_v1", __name__, url_prefix="/api/v1")

bp.register_blueprint(users_bp)
bp.register_blueprint(projects_bp)
bp.register_blueprint(developers_bp)
bp.register_blueprint(auth_bp)

