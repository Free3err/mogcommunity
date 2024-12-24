from flask import jsonify, request
from app.api.v1 import api_v1
from app.api.v1.projects.services import ProjectService
from app.core.errors import NotFoundError, ValidationError
from app.schemas.project_schema import ProjectSchema

project_service = ProjectService()
project_schema = ProjectSchema()

@api_v1.route('/projects', methods=['GET'])
def get_projects():
    projects = project_service.get_all_projects()
    return jsonify(projects)

@api_v1.route('/projects', methods=['POST'])
def create_project():
    try:
        data = project_schema.load(request.get_json())
        project = project_service.create_project(**data)
        return jsonify(project_schema.dump(project)), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400 