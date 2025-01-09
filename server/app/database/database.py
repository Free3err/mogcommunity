import os
import psycopg2
from psycopg2.extras import RealDictCursor

from ..instance.config import AppConfig, DatabaseConfig
from ..utils import error_catcher

class Database:
    @error_catcher
    def __init__(self) -> None:
        """Database initialization"""
        self.db = psycopg2.connect(
            host=DatabaseConfig.DATABASE_HOST,
            port=DatabaseConfig.DATABASE_PORT,
            database=DatabaseConfig.DATABASE_NAME,
            user=DatabaseConfig.DATABASE_USER,
            password=DatabaseConfig.DATABASE_PASSWORD,
            cursor_factory=RealDictCursor
        )
        self.init_schema()
        psycopg2.extras.register_uuid()
            
    @error_catcher
    def init_schema(self) -> None:
        """Load schema"""
        with open(
            os.path.join(AppConfig.BASE_DIR, "database", "schema.sql"), "r"
        ) as file:
            schema = file.read()
        with self.db.cursor() as cursor:
            cursor.execute(schema)
        self.db.commit()
        
    @error_catcher
    def cursor(self) -> RealDictCursor:
        """Get cursor"""
        return self.db.cursor()
    
    @error_catcher
    def commit(self) -> None:
        """Commit changes"""
        self.db.commit()
        
    @error_catcher
    def rollback(self) -> None:
        """Rollback changes"""
        self.db.rollback()
