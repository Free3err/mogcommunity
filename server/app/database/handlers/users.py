from ...database import db
from ...utils import error_catcher, hash_password, db_transaction
from uuid import UUID


@error_catcher
@db_transaction(db)
def get_user(username: str | None = None, email: str | None = None, user_uuid: UUID | None = None) -> dict:
    """Get user by username, email or uuid"""
    conditions = []
    values = []
    
    if user_uuid:
        conditions.append("uuid = %s")
        values.append(str(user_uuid))
    if username:
        conditions.append("username = %s")
        values.append(username)
    if email:
        conditions.append("email = %s")
        values.append(email)
        
    query = f"SELECT * FROM users WHERE {' AND '.join(conditions)}"
    with db.cursor() as cursor:
        cursor.execute(query, tuple(values))
        data = cursor.fetchone()
    
    return data


@error_catcher
@db_transaction(db)
def create_user(**data: dict) -> dict:
    """Create new user in database"""
    password_hash = hash_password(data["password"])
    with db.cursor() as cursor:
        cursor.execute(
            "INSERT INTO users (username, email, password_hash, role, uuid) VALUES (%s, %s, %s, %s, %s)",
            (
                data["username"],
                data["email"],
                password_hash,
                data["role"],
                str(data["uuid"]),
            ),
        )
        cursor.execute("SELECT id FROM users WHERE username = %s", (data["username"],))
        user_id = cursor.fetchone()["id"]
    return user_id


@error_catcher
@db_transaction(db)
def update_user(**data: dict) -> bool:
    """Update existing user in database"""
    if data.get("password_hash", None):
        data["password_hash"] = hash_password(data["password_hash"])

    with db.cursor() as cursor:
        cursor.execute(
            f"UPDATE users SET {', '.join([f'{value} = {data[value]}' for value in data if value != 'id'])} WHERE id = %s",
            (data["id"]),
        )
    return True


@error_catcher
def is_user_exist(username: str, email: str | None = None) -> bool:
    """Check if user exist in database"""
    query = "SELECT COUNT(*) as count FROM users WHERE username = %s"
    params = [username]

    if email:
        query += " OR email = %s"
        params.append(email)

    with db.cursor() as cursor:
        cursor.execute(query, tuple(params))
        result = cursor.fetchone()

    return result["count"] > 0
