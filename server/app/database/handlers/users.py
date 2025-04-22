from datetime import datetime
from typing import List

from ..models import User
from ...utils import DatabaseUtils


class UsersHandler:
    @staticmethod
    @DatabaseUtils.db_transaction
    def get_all(session) -> List[User]:
        """Get all users from database"""
        return session.query(User).all()

    @staticmethod
    @DatabaseUtils.db_transaction
    def get(session, user_id: int | None = None, username: str | None = None, email: str | None = None) -> User | None:
        """Get user by ID from database"""
        if user_id:
            return session.query(User).filter(User.id == user_id).first()
        elif username:
            return session.query(User).filter(User.username == username).first()
        elif email:
            return session.query(User).filter(User.email == email).first()
        return None

    @staticmethod
    @DatabaseUtils.db_transaction
    def update(user_id: int, attrs: dict, session) -> User | None:
        """Update user data in database"""
        user = session.query(User).filter(User.id == user_id).first()
        if not user:
            return None

        for key, value in attrs.items():
            setattr(user, key, value)

        session.add(user)
        session.commit()
        session.refresh(user)
        return user

    @staticmethod
    @DatabaseUtils.db_transaction
    def create(attrs: dict, session) -> User | None:
        """Create new user in database"""
        user = User(**attrs)
        session.add(user)
        session.commit()

        return user

    @staticmethod
    @DatabaseUtils.db_transaction
    def does_exist(data: dict, session) -> bool:
        """Checking on existence of user in database"""
        for key, value in data.items():
            user = session.query(User).filter(getattr(User, key) == value).first()
            if user:
                return True

        return False