from .resources.developer import DevelopersList, Developer
from .resources.user import UsersList, User
from .resources.project import ProjectsList, Project
from .resources.auth import SignUp, SignIn, Session

__all__ = ['UsersList', 'User', 'DevelopersList', 'Developer', 'ProjectsList', 'Project']

resources = {
    UsersList: "/api/v1/users",
    User: "/api/v1/user/<int:user_id>",
    DevelopersList: "/api/v1/developers",
    Developer: "/api/v1/developer/<int:dev_id>",
    ProjectsList: "/api/v1/projects",
    Project: "/api/v1/project/<int:project_id>",
    SignUp: "/api/v1/sign-up",
    SignIn: "/api/v1/sign-in",
    Session: "/api/v1/session",
}

def register_resources(api):
    for resource, url in resources.items():
        api.add_resource(resource, url)