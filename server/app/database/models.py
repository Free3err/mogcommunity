from datetime import datetime
from uuid import UUID
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, ARRAY, JSON
from sqlalchemy.dialects.postgresql import UUID as PgUUID
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(Text, unique=True, nullable=False)
    username = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(Integer, nullable=False)
    user_uuid = Column(PgUUID, unique=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    developer = relationship("Developer", back_populates="user", uselist=False)

class Role(Base):
    __tablename__ = 'roles'
    
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)

class Developer(Base):
    __tablename__ = 'developers'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    nickname = Column(String(255), nullable=False)
    age = Column(Integer)
    rank = Column(String(255))
    resources = Column(ARRAY(JSON))
    
    user = relationship("User", back_populates="developer")

class Project(Base):
    __tablename__ = 'projects'
    
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    type = Column(Text, nullable=False)
    tags = Column(ARRAY(Text))
    action = Column(JSON)

class Session(Base):
    __tablename__ = 'sessions'
    
    id = Column(Integer, primary_key=True)
    session_id = Column(String(32), unique=True, nullable=False)
    user_uuid = Column(PgUUID, ForeignKey('users.user_uuid', onupdate='CASCADE', ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    
    user = relationship("User", back_populates="sessions") 

class Idea(Base):
    __tablename__ = 'ideas'

    id = Column(Integer, primary_key=True)
    title = Column(String(256), nullable=False)
    text = Column(Text(2048), nullable=False)
    comments = Column(ARRAY(Integer))

class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    by_user = Column(Integer, nullable=False)
    text = Column(String(512), nullable=False)
