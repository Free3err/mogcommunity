from ...database import db
from ...utils import error_catcher, db_transaction


@error_catcher
def get_all_projects() -> list:
    """Get all projects"""
    with db.cursor() as cursor:
        cursor.execute("SELECT * FROM projects")
        projects = cursor.fetchall()
    return projects


@error_catcher
def get_project_by_id(id: int) -> dict:
    """Get project by ID"""
    with db.cursor() as cursor:
        cursor.execute("SELECT * FROM projects WHERE id = %s", (id,))
        project = cursor.fetchone()
    return project


@error_catcher
@db_transaction(db)
def create_project(data: dict) -> bool:
    """Create new project in database"""
    with db.cursor() as cursor:
        cursor.execute(
            "INSERT INTO projects (name, description, status) VALUES (%s, %s, %s)",
            (data["name"], data["description"], data["status"])
        )
    return True


@error_catcher
@db_transaction(db)
def update_project(data: dict) -> bool:
    """Update existing project in database"""
    with db.cursor() as cursor:
        cursor.execute(
            f"UPDATE projects SET {', '.join([f'{value} = {data[value]}' for value in data])} WHERE id = %s",
            (data["id"],)
        )
    return True


@error_catcher
@db_transaction(db)
def delete_project(id: int) -> bool:
    """Delete project from database by ID"""
    with db.cursor() as cursor:
        cursor.execute("DELETE FROM projects WHERE id = %s", (id,))
    return True
