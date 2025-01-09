import bcrypt

def hash_password(password: str) -> str:
    """Get hashed password"""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def check_password(password_hash: str, password: str) -> bool:
    """Checking password"""
    return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
