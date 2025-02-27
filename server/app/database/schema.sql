CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role INTEGER NOT NULL,
    uuid UUID UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS developers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    age INTEGER,
    rank VARCHAR(255),
    resources JSONB[]
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    tags TEXT[],
    action JSONB
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(32) UNIQUE NOT NULL,
    user_uuid UUID REFERENCES users(uuid),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_uuid ON sessions(user_uuid);

ALTER TABLE sessions 
DROP CONSTRAINT IF EXISTS sessions_user_uuid_fkey,
ADD CONSTRAINT sessions_user_uuid_fkey 
    FOREIGN KEY (user_uuid) 
    REFERENCES users(uuid)
    ON UPDATE CASCADE
    ON DELETE CASCADE;