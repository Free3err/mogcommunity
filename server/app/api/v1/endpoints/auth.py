from typing import Any
from uuid import UUID

from flask import request, jsonify, Response
from flask_cors import CORS

from . import auth_bp as bp
from ....services import auth as auth_service
from ....database.handlers import get_session, del_session
from ....utils import request_validator
from ....instance.config import AppConfig

CORS(bp, origins=AppConfig.CORS_ORIGINS, supports_credentials=True)


@request_validator
@bp.route("/sign_in", methods=["POST"])
def sign_in() -> tuple[Response, int]:
    """Sign in user"""
    data = request.json
    response = auth_service.login_user(
        username=data["username"], password=data["password"]
    )
    if isinstance(response, tuple):
        return jsonify(response[0]), response[1]

    session_id = response["data"]["session_id"]
    user_uuid = response["data"]["user_uuid"]
    del response["data"]["session_id"]
    del response["data"]["user_uuid"]

    response = jsonify(response)
    response.set_cookie(
        "session_id",
        session_id,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=60 * 60 * 24 * 7,
    )
    response.set_cookie(
        "user_uuid",
        user_uuid,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=60 * 60 * 24 * 7,
    )
    return response, 200


@request_validator
@bp.route("/sign_up", methods=["POST"])
def sign_up() -> tuple[Response, Any] | tuple[Response, int]:
    """Sign up user"""
    data = request.json
    response = auth_service.register_user(**data)
    if isinstance(response, tuple):
        return jsonify(response[0]), response[1]

    session_id = response["data"]["session_id"]
    user_uuid = response["data"]["user_uuid"]
    del response["data"]["session_id"]
    del response["data"]["user_uuid"]

    response = jsonify(response)
    response.set_cookie(
        "session_id",
        session_id,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=60 * 60 * 24 * 7,
    )
    response.set_cookie(
        "user_uuid",
        user_uuid,
        httponly=True,
        secure=False,
        samesite="strict",
        max_age=60 * 60 * 24 * 7,
    )
    return response, 200


@request_validator
@bp.route("/validate_session", methods=["GET"])
def validate_session() -> tuple[Response, int]:
    """Validate session token"""
    user_uuid = request.cookies.get("user_uuid")
    session_id = request.cookies.get("session_id")
    if not (user_uuid or session_id):
        return jsonify({"ok": False, "message": "No token provided"}), 401

    try:
        session = get_session(session_id)
        if not session:
            return jsonify({"ok": False, "message": "Invalid session"}), 401
        if session["user_uuid"] != UUID(user_uuid):
            return jsonify({"ok": False, "message": "Invalid session"}), 401
        return jsonify({"ok": True}), 200
    except Exception as e:
        return jsonify({"ok": False, "message": "Invalid token format"}), 401


@request_validator
@bp.route("/sign_out", methods=["GET"])
def sign_out() -> tuple[Response, int]:
    """Sign out user"""
    session_id = request.cookies.get("session_id")
    if not session_id:
        return jsonify({"ok": False, "message": "No token provided"}), 401

    try:
        session = get_session(session_id)
        if not session:
            return jsonify({"ok": False, "message": "Invalid session"}), 401
        del_session(session_id)
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"ok": False, "message": "Invalid token format"}), 401
