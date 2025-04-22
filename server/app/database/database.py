import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..instance.config import DatabaseConfig
from .models import Base

class Database:
    def __init__(self) -> None:
        """Database initialization"""
        self.engine = create_engine(
            f"postgresql://{DatabaseConfig.DATABASE_USER}:{DatabaseConfig.DATABASE_PASSWORD}@"
            f"{DatabaseConfig.DATABASE_HOST}:{DatabaseConfig.DATABASE_PORT}/{DatabaseConfig.DATABASE_NAME}"
        )
        self.SessionLocal = sessionmaker(
            autocommit=False, 
            autoflush=False, 
            bind=self.engine,
        )
        self.init_schema()
        logging.info("Database initialized")

    def init_schema(self) -> None:
        """Create all tables"""
        Base.metadata.create_all(bind=self.engine)

    def get_session(self):
        """Get database session"""
        return self.SessionLocal()

    def commit(self, session) -> None:
        """Commit changes"""
        session.commit()

    def rollback(self, session) -> None:
        """Rollback changes"""
        session.rollback()
