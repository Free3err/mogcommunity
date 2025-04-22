from ...utils import DatabaseUtils
from ..models import AuthToken


class AuthTokensHandler:
    @staticmethod
    @DatabaseUtils.db_transaction
    def create(data: dict, session):
        """Create new session"""
        new_session = AuthToken(**data)
        session.add(new_session)
        session.commit()
        return new_session

    @staticmethod
    @DatabaseUtils.db_transaction
    def get_by_token(token: str, session):
        """Get session by token"""
        return session.query(AuthToken).filter(AuthToken.token == token).first()

    @staticmethod
    @DatabaseUtils.db_transaction
    def update(session_id: int, data: dict, session):
        """Update session data"""
        current_session = session.query(AuthToken).filter(AuthToken.id == session_id).first()
        if current_session:
            for key, value in data.items():
                setattr(current_session, key, value)
            session.commit()
            return current_session
        return None

    @staticmethod
    @DatabaseUtils.db_transaction
    def delete(session_id: int, session):
        """Delete session"""
        current_session = session.query(AuthToken).filter(AuthToken.id == session_id).first()
        if current_session:
            session.delete(current_session)
            session.commit()
            return True
        return False
