from flask import request
from flask_restful import Resource

from ....database.handlers import ProjectsHandler
from ....utils import DatabaseUtils


class ProjectsList(Resource):
    def get(self):
        projects = ProjectsHandler.get_all()
        projects_data = [DatabaseUtils.object_to_dict(project) for project in projects]
        return {'ok': True, 'projects': projects_data}


class Project(Resource):
    def get(self, project_id):
        project = ProjectsHandler.get(project_id)
        if not project:
            return {'ok': False, 'error': 'Project not found'}, 404

        project_data = DatabaseUtils.object_to_dict(project)
        return {'ok': True, 'project': project_data}

    def patch(self, project_id):
        attrs = request.get_json()
        if not attrs:
            return {'ok': False, 'error': 'Request body is empty'}, 400

        project = ProjectsHandler.update(project_id, attrs)
        if not project:
            return {'ok': False, 'error': 'Project not found'}, 404

        project_data = DatabaseUtils.object_to_dict(project)
        return {'ok': True, 'project': project_data}

