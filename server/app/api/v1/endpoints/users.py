import requests

from flask import request, jsonify, Response
from flask_cors import CORS
from uuid import UUID, uuid4

from . import users_bp as bp
from ....database.handlers import is_user_exist

from ....database.handlers.users import get_user as get_user_from_db, update_user
from ....database.handlers.sessions import update_session
from ....utils import request_validator
from ....instance.config import AppConfig

CORS(bp, origins=AppConfig.CORS_ORIGINS, supports_credentials=True)


@request_validator
@bp.route("/get_user", methods=["GET"])
def get_user() -> Response:
    """Get user by ID from database"""
    user = get_user(request.args)
    return jsonify({"ok": True, "user": user})


@request_validator
@bp.route("/get_user_using_cookie", methods=["GET"])
def get_user_by_uuid() -> tuple[Response, int]:
    """Get user by UUID from database"""
    user_uuid = request.cookies.get("user_uuid")
    if not user_uuid:
        return jsonify({"ok": False, "error": "UUID not provided"}), 400

    user = get_user_from_db(user_uuid=UUID(user_uuid))
    if not user:
        return jsonify({"ok": False, "error": "User not found"}), 404

    del user["password_hash"]
    return jsonify({"ok": True, "data": user}), 200


@request_validator
@bp.route('/update_uuid', methods=["PATCH"])
def update_uuid() -> tuple[Response, int]:
    """Update user UUID"""

    user_uuid = request.cookies.get("user_uuid")
    session_id = request.cookies.get("session_id")

    if not session_id:
        return jsonify({"ok": False, "error": "Missing session_id"}), 400

    try:
        user_uuid = UUID(user_uuid)
    except ValueError:
        return jsonify({"ok": False, "error": "Invalid session_id"}), 400

    status_session = requests.get(
        f"{AppConfig.API_HOST}/api/v1/auth/validate_session",
        cookies={"session_id": session_id, "user_uuid": str(user_uuid)}
    )
    if status_session.ok and status_session.json().get("ok"):
        try:
            new_uuid = uuid4()
            update_user(user_uuid=user_uuid, uuid=new_uuid)
            response = jsonify({"ok": True, "uuid": new_uuid})
            response.set_cookie("user_uuid", str(new_uuid))
            return response, 200
        except Exception as e:
            pass
    return jsonify({"ok": False, "error": "Something went wrong while updating UUID"}), 502


@request_validator
@bp.route("/update_nickname", methods=["PATCH"])
def update_nickname() -> tuple[Response, int]:
    """Update user nickname"""
    data = request.json
    user_uuid = request.cookies.get("user_uuid")
    session_id = request.cookies.get("session_id")

    if not session_id:
        return jsonify({"ok": False, "error": "Missing session_id"}), 400

    try:
        user_uuid = UUID(user_uuid)
    except ValueError:
        return jsonify({"ok": False, "error": "Invalid session_id"}), 400

    status_session = requests.get(f"{AppConfig.API_HOST}/api/v1/auth/validate_session",
                                  cookies={"session_id": session_id, "user_uuid": str(user_uuid)})
    if status_session.ok and status_session.json().get("ok"):
        try:
            new_nickname = data["new_nickname"]
            if is_user_exist(username=new_nickname):
                return jsonify({"ok": False}), 409

            update_user(user_uuid=user_uuid, username=new_nickname)
            return jsonify({"ok": True, "newNickname": new_nickname}), 200
        except Exception as e:
            pass
    return jsonify({"ok": False, "error": "Something went wrong while updating nickname"}), 502
