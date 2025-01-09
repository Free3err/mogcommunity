from uuid import uuid4
from flask import session
from ..database.handlers import get_user, is_user_exist, create_user, create_session
from ..utils.password import check_password
from ..utils import error_catcher


@error_catcher
def register_user(username: str, email: str, password: str, role: int = 1) -> dict:
    """Register user"""
    if is_user_exist(username=username, email=email):
        return {"ok": False, "message": "User already exists"}, 409

    user_uuid = uuid4()
    create_user(
        username=username, email=email, password=password, role=role, uuid=user_uuid
    )
    session_id = create_session(user_uuid)
    return {
        "ok": True,
        "data": {
            "username": username, 
            "session_id": session_id,
            "user_uuid": str(user_uuid)
        },
    }


@error_catcher
def login_user(username, password) -> dict:
    """Login user"""
    if not is_user_exist(username=username):
        return {"ok": False, "message": "Unauthorized"}, 401

    user = get_user(username=username)
    if not check_password(user["password_hash"], password):
        return {"ok": False, "message": "Unauthorized"}, 401

    session_id = create_session(user["uuid"])
    return {
        "ok": True,
        "data": {
            "username": username, 
            "session_id": session_id,
            "user_uuid": str(user["uuid"])
        },
    }
