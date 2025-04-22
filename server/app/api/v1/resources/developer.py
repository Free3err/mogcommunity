from flask import request
from flask_restful import Resource

from ....database.handlers import DevelopersHandler
from ....utils import DatabaseUtils


class DevelopersList(Resource):
    def get(self):
        developers = DevelopersHandler.get_all()
        developers_data = [DatabaseUtils.object_to_dict(dev) for dev in developers]
        return {'ok': True, 'developers': developers_data}, 200


class Developer(Resource):
    def get(self, dev_id):
        developer = DevelopersHandler.get(dev_id)
        if not developer:
            return {'ok': False, "error": "Developer not found"}, 400

        developer_data = DatabaseUtils.object_to_dict(developer)
        return {'ok': True, 'developer': developer_data}, 200

    def patch(self):
        attrs = request.get_json()
        if not attrs:
            return {'ok': False, "error": "Request body is empty"}, 400

        dev = DevelopersHandler.update(attrs)
        if not dev:
            return {'ok': False, "error": "Developer not found"}, 400
        developer_data = DatabaseUtils.object_to_dict(dev)
        return {'ok': True, 'developer': developer_data}, 200
