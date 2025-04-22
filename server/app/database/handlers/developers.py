from typing import List

from ..models import Developer
from ...utils import DatabaseUtils


class DevelopersHandler:
    @staticmethod
    @DatabaseUtils.db_transaction
    def get_all(session) -> List[Developer]:
        """Get all developers"""
        return session.query(Developer).all()

    @staticmethod
    @DatabaseUtils.db_transaction
    def get(dev_id: int, session) -> Developer | None:
        """Get developer by ID from database"""
        return session.query(Developer).filter(Developer.id == dev_id).first()

    @staticmethod
    @DatabaseUtils.db_transaction
    def update(dev_id: id, attrs: dict, session) -> Developer | None:
        """Update developer data in database"""
        dev = session.query(Developer).get(dev_id).first()
        if not dev:
            return None

        for key, value in attrs.items():
            setattr(dev, key, value)

        session.add(dev)
        session.commit()
        session.refresh(dev)
        return dev
