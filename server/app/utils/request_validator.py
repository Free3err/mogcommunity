from flask import jsonify
from werkzeug.exceptions import InternalServerError
from typing import Callable


def request_validator(func: Callable):
    def wrapper(*args, **kwargs):
        try:
            response = func(*args, **kwargs)
            if response is None:
                raise InternalServerError("Internal Server Error, Something went wrong")
            return response
        except Exception as e:
            return jsonify({"ok": False, "error": str(e)}), 500

    return wrapper
