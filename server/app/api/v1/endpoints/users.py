import requests

from flask import request, jsonify, Response
from flask_cors import CORS
from uuid import UUID, uuid4

from . import users_bp as bp
from ....database.handlers import is_user_exist

from ....database.handlers.users import get_user as get_user_from_db, update_user
from ....utils import request_validator
from ....instance.config import AppConfig

CORS(bp, origins=AppConfig.CORS_ORIGINS, supports_credentials=True)


@request_validator
@bp.route("/get_user", methods=["GET"])
def get_user() -> tuple[Response, int]:
    """Get user by parameters"""
    args = dict(request.args)
    if args.get("by_using", None):
        match args["by_using"]:
            case "cookies":
                cookies = dict(request.cookies)
                if cookies:
                    user = get_user_from_db(user_uuid=cookies.get("user_uuid", None))
                else:
                    return jsonify({"ok": False, "error": "No enough cookies"}), 401
            case "args":
                del args["by_using"]
                if args:
                    user = get_user_from_db(**args)
                else:
                    return jsonify({"ok": False, "error": "No enough args"}), 401
            case _:
                return jsonify({"ok": False, "error": """Used not supported value of "using_by" argument"""}), 400

        if not user is None:
            return jsonify({"ok": True, "data": user}), 200
        else:
            return jsonify({"ok": True, "msg": "No enough founds"}), 200
    else:
        return jsonify({"ok": False, "error": "No required arguments"}), 400


@request_validator
@bp.route('/update_uuid', methods=["PATCH"])
def update_uuid() -> tuple[Response, int]:
    """Update user UUID"""
    is_valid_session = requests.get(f"{AppConfig.API_HOST}/api/v1/auth/validate_session",
                                    cookies={"session_id": request.cookies.get("session_id", None),
                                             "user_uuid": str(request.cookies.get("user_uuid", None))})
    if is_valid_session.ok:
        new_uuid = uuid4()
        update_user({"uuid": UUID(request.cookies["user_uuid"])}, user_uuid=new_uuid)
        response = jsonify({"ok": True, "user_uuid": new_uuid})
        response.set_cookie(
            "user_uuid",
            str(new_uuid),
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=60 * 60 * 24 * 7,
        )
        return response, 200
    else:
        return jsonify({"ok": False, "error": "Session is not valid"}), 401


@request_validator
@bp.route("/update_nickname", methods=["PATCH"])
def update_nickname() -> tuple[Response, int]:
    """Update user nickname"""
    is_valid_session = requests.get(f"{AppConfig.API_HOST}/api/v1/auth/validate_session",
                                    cookies={"session_id": request.cookies.get("session_id", None),
                                             "user_uuid": str(request.cookies.get("user_uuid", None))})
    if is_valid_session.ok:
        data = request.json

        new_nickname = data["newNickname"]
        if is_user_exist(username=new_nickname):
            return jsonify({"ok": False, "error": "Nickname is not available"}), 409

        update_user({"uuid": request.cookies["user_uuid"]}, username=new_nickname)
        return jsonify({"ok": True, "newNickname": new_nickname}), 200
    else:
        return jsonify({"ok": False, "error": "Session is not valid"}), 401
