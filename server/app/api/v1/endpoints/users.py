from flask import request, jsonify
from flask_cors import CORS
from uuid import UUID

from . import users_bp as bp

from ....database.handlers.users import get_user as get_user_from_db
from ....utils import request_validator
from ....instance.config import AppConfig

CORS(bp, origins=AppConfig.CORS_ORIGINS, supports_credentials=True)

@request_validator
@bp.route("/get_user", methods=["GET"])
def get_user() -> dict:
    """Get user by ID from database"""
    user = get_user(request.args)

    return jsonify({"ok": True, "user": user})


@request_validator
@bp.route("/get_user_using_cookie", methods=["GET"])
def get_user_by_uuid() -> dict:
    """Get user by UUID from database"""
    user_uuid = request.cookies.get("user_uuid")
    if not user_uuid:
        return jsonify({"ok": False, "error": "UUID not provided"}), 400

    user = get_user_from_db(user_uuid=UUID(user_uuid))
    if not user:
        return jsonify({"ok": False, "error": "User not found"}), 404

    del user["password_hash"]
    return jsonify({"ok": True, "data": user}), 200
