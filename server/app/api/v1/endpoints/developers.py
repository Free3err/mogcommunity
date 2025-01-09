from . import developers_bp as bp

from flask import jsonify, request

from ....utils import request_validator

from ....database.handlers.developers import (
    get_all_developers,
    create_developer,
    get_developer_by_id,
    update_developer,
    delete_developer,
)


@request_validator
@bp.route("/get_all", methods=["GET"])
def get_all():
    """Get all developers from database"""
    developers = get_all_developers()
    return jsonify({"ok": True, "developers": developers})


@request_validator 
@bp.route("/get_by_id", methods=["GET"])
def get_by_id():
    """Get developer by ID from database"""
    developer_id = request.args.get("id")
    developer = get_developer_by_id(developer_id)
    return jsonify({"ok": True, "developer": developer})


@request_validator
@bp.route("/create", methods=["POST"])
def create():
    """Create new developer in database"""
    data = request.json
    create_developer(data)
    return jsonify({"ok": True})


@request_validator
@bp.route("/update", methods=["POST"])
def update():
    """Update existing developer in database"""
    data = request.json
    update_developer(data)
    return jsonify({"ok": True})


@request_validator
@bp.route("/delete", methods=["POST"])
def delete():
    """Delete developer from database by ID"""
    data = request.json
    delete_developer(data["id"])
    return jsonify({"ok": True})
