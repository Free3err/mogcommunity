from flask import jsonify, request

from . import projects_bp
from app.utils.request_validator import request_validator
from app.database.handlers.projects import (
    get_all_projects,
    get_project_by_id,
    create_project,
    update_project,
    delete_project,
)


@request_validator
@projects_bp.route("/get_all", methods=["GET"])
def get_all() -> dict:
    """Get all projects from database"""
    projects = get_all_projects()
    return jsonify({"ok": True, "projects": projects})


@request_validator
@projects_bp.route("/get_by_id", methods=["GET"])
def get_by_id() -> dict:
    """Get project by ID from database"""
    project_id = request.args.get("id")
    project = get_project_by_id(project_id)
    return jsonify({"ok": True, "project": project})


@request_validator
@projects_bp.route("/create", methods=["POST"])
def create() -> dict:
    """Create new project in database"""
    data = request.json
    create_project(data)
    return jsonify({"ok": True})


@request_validator
@projects_bp.route("/update", methods=["POST"])
def update() -> dict:
    """Update existing project in database"""
    data = request.json
    update_project(data)
    return jsonify({"ok": True})


@request_validator
@projects_bp.route("/delete", methods=["POST"])
def delete() -> dict:
    """Delete project from database by ID"""
    data = request.json
    delete_project(data["id"])
    return jsonify({"ok": True})