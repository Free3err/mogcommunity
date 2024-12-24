from app.repositories.project_repository import ProjectRepository
from app.core.errors import NotFoundError

class ProjectService:
    def __init__(self):
        self.repository = ProjectRepository()
    
    def get_all_projects(self):
        return self.repository.get_all()
    
    def create_project(self, name, description):
        return self.repository.create(name=name, description=description)
    
    def get_project(self, project_id):
        project = self.repository.get_by_id(project_id)
        if not project:
            raise NotFoundError(f"Project with id {project_id} not found")
        return project 