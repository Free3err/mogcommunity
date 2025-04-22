from typing import List

from ..models import Project
from ...utils import DatabaseUtils


class ProjectsHandler:
    @staticmethod
    @DatabaseUtils.db_transaction
    def get_all(session) -> List[Project]:
        """Get all projects from database"""
        return session.query(Project).all()

    @staticmethod
    @DatabaseUtils.db_transaction
    def get(project_id: int, session) -> dict | None:
        """Get project by ID from database"""
        project = session.query(Project).filter(Project.id == project_id).first()
        if project is None:
            return None

        project_data = DatabaseUtils.object_to_dict(project)
        return project_data

    @staticmethod
    @DatabaseUtils.db_transaction
    def update(project_id: int, attrs: dict, session) -> Project | None:
        """Update project data in database"""
        project = session.query(Project).filter(Project.id == project_id).first()
        if project is None:
            return None

        for key, value in attrs.items():
            setattr(project, key, value)

        session.add(project)
        session.commit()
        session.refresh(project)
        return project