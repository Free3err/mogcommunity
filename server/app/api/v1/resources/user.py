from flask import request
from flask_restful import Resource

from ....database.handlers import UsersHandler
from ....utils.db import DatabaseUtils


class UsersList(Resource):
    def get(self):
        users = UsersHandler.get_all()
        users_data = [DatabaseUtils.object_to_dict(user) for user in users]
        return {'ok': True, 'users': users_data}, 200
    

class User(Resource):
    def get(self, user_id):
        user = UsersHandler.get(user_id)
        if not user:
            return {'ok': False, 'error': 'User not found'}, 404
        
        user_data = DatabaseUtils.object_to_dict(user)
        return {'ok': True, 'user': user_data}, 200

    def patch(self, user_id):
        attrs = request.get_json()
        if not attrs:
            return {'ok': False, 'error': 'Request body is empty'}, 400
            
        user = UsersHandler.update(user_id, attrs=attrs)
        if not user:
            return {'ok': False, 'error': 'User not found'}, 404
            
        user_data = DatabaseUtils.object_to_dict(user)
        return {'ok': True, 'user': user_data}, 200
