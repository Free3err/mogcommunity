from flask import request, make_response
from flask_restful import Resource

from ..services.auth import AuthService
from ....database.handlers import UsersHandler
from ....services import Security


class SignUp(Resource):
    def post(self):
        """Register a new user"""
        data = request.get_json()
        if not UsersHandler.does_exist({"email": data["email"],
                                        "username": data["username"]}):
            user = UsersHandler.create({"username": data["username"], "email": data["email"],
                                 "password_hash": Security.Password.encrypt(data["password"])})
            if user:
                return {"ok": True}, 200
            else:
                return {"ok": False, "session": "Server internal error"}, 502

        else:
            return {"message": "User already exists"}, 409


class SignIn(Resource):
    def post(self):
        """Sign in existing user"""
        data = request.get_json()
        user = UsersHandler.get(username=data["username"])
        
        if not user:
            return {"message": "Invalid credentials"}, 401
            
        session_token, refresh_token = AuthService.create_session(user.id)
        response = make_response({"ok": True, "user": {"id": user.id, "username": user.username}})

        response.set_cookie(
            "session_id",
            session_token,
            httponly=True,
            secure=True,
            samesite="Strict",
            max_age=AuthService.SESSION_DURATION
        )
        response.set_cookie(
            "refresh_token",
            refresh_token,
            httponly=True,
            secure=True,
            samesite="Strict",
            max_age=AuthService.REFRESH_TOKEN_DURATION
        )
        
        return response


class Session(Resource):
    def get(self):
        """Checking validity of session"""
        session_token = request.cookies.get("session_id")
        refresh_token = request.cookies.get("refresh_token")
        
        if not session_token or not refresh_token:
            return {"ok": False, "message": "No session found"}, 401
            
        if AuthService.is_valid_session(session_token, refresh_token):
            return {"ok": True}, 200
            
        return {"ok": False, "message": "Invalid session"}, 401
        
    def delete(self):
        """Logout user"""
        session_token = request.cookies.get("session_id")
        if session_token:
            AuthService.invalidate_session(session_token)

        response = make_response({"ok": True})
        response.delete_cookie("session_id")
        response.delete_cookie("refresh_token")
        return response
