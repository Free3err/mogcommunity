from uuid import uuid4, UUID
from datetime import datetime, timedelta, timezone

from ...database import db
from ...utils import error_catcher, db_transaction

def get_uuid() -> str:
    """Get uuid"""
    return uuid4().hex

@error_catcher
@db_transaction(db)
def create_session(user_uuid: UUID) -> str:
    """Create new session for user"""
    with db.cursor() as cursor:
        session_id = get_uuid()
        expires_at = datetime.now(timezone.utc) + timedelta(days=7)
        
        cursor.execute(
            """
            INSERT INTO sessions (session_id, user_uuid, expires_at)
            VALUES (%s, %s, %s)
            RETURNING session_id
            """,
            (session_id, user_uuid, expires_at)
            )
    return session_id

@error_catcher
def get_session(session_id: str) -> dict | None:
    """Get session by id"""
    with db.cursor() as cursor:
        cursor.execute(
            """
            SELECT * FROM sessions 
            WHERE session_id = %s 
            AND is_active = TRUE 
            AND expires_at > NOW()
            """,
                (session_id,)
            )
        return cursor.fetchone()
    
@error_catcher
@db_transaction(db)
def del_session(session_id: str) -> None:
    """Delete session by id"""
    with db.cursor() as cursor:
        cursor.execute("DELETE FROM sessions WHERE session_id = %s", (session_id,))
