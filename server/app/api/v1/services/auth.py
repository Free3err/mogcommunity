import uuid
from datetime import datetime, timedelta
from typing import Optional, Tuple

from ....database.handlers import AuthTokensHandler
from ....services import Security


class AuthService:
    """Class that manage authentication and authorization users"""
    
    SESSION_DURATION = timedelta(minutes=15)
    REFRESH_TOKEN_DURATION = timedelta(days=30)
    
    @staticmethod
    def create_session(user_id: int) -> Tuple[str, str]:
        """Create new session and refresh token for user"""
        session_token = str(uuid.uuid4())
        refresh_token = str(uuid.uuid4())
        
        AuthTokensHandler.create({
            "user_id": user_id,
            "token": session_token,
            "refresh_tokens": [refresh_token],
            "created_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + AuthService.SESSION_DURATION
        })
        
        return session_token, refresh_token
    
    @staticmethod
    def is_valid_session(session_token: str, refresh_token: str) -> bool:
        """Check if session and refresh token are valid"""
        session = AuthTokensHandler.get_by_token(session_token)
        if not session:
            return False
            
        if datetime.now() > session.expires_at:
            return False
            
        if refresh_token not in session.refresh_tokens:
            return False
            
        return True
    
    @staticmethod
    def update_refresh_token(session_token: str) -> Optional[str]:
        """Generate new refresh token and invalidate old ones"""
        session = AuthTokensHandler.get_by_token(session_token)
        if not session:
            return None
            
        new_refresh_token = str(uuid.uuid4())
        AuthTokensHandler.update(session.id, {
            "refresh_tokens": [new_refresh_token],
            "expires_at": datetime.now() + AuthService.SESSION_DURATION
        })
        
        return new_refresh_token
    
    @staticmethod
    def invalidate_session(session_token: str) -> bool:
        """Invalidate session and all its refresh tokens"""
        session = AuthTokensHandler.get_by_token(session_token)
        if not session:
            return False
            
        AuthTokensHandler.delete(session.id)
        return True
