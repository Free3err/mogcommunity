from ...database import db
from ...utils import error_catcher, hash_password, db_transaction
from uuid import UUID


@error_catcher
@db_transaction(db)
def get_user(**kwargs) -> dict:
    """Get user by using kwargs"""
    conditions = []
    values = []

    for key, value in kwargs.items():
        if not value is None:
            conditions.append(f"{key} = %s")
            values.append(value)

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
            "INSERT INTO users (username, email, password_hash, role, user_uuid) VALUES (%s, %s, %s, %s, %s)",
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
def update_user(selector: dict, **kwargs) -> bool:
    """Update existing user in database"""
    if "password_hash" in kwargs:
        kwargs["password_hash"] = hash_password(kwargs["password_hash"])

    set_clause = ", ".join([f"{key} = %s" for key in kwargs])
    params = tuple(kwargs.values())

    where_clauses = []
    where_params = []

    if "id" in selector:
        where_clauses.append("id = %s")
        where_params.append(selector["id"])
    if "uuid" in selector:
        where_clauses.append("user_uuid = %s")
        where_params.append(str(selector["uuid"]))
    if "username" in selector:
        where_clauses.append("username = %s")
        where_params.append(selector["username"])

    if not where_clauses:
        return False

    where_clause = " OR ".join(where_clauses)
    query = f"UPDATE users SET {set_clause} WHERE {where_clause}"

    with db.cursor() as cursor:
        cursor.execute(query, params + tuple(where_params))

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
