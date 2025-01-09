from ...database import db
from ...utils import error_catcher, db_transaction


@error_catcher
def get_all_developers() -> list:
    """Get all developers"""
    with db.cursor() as cursor:
        cursor.execute("SELECT * FROM developers")
        developers = cursor.fetchall()
    return developers


@error_catcher
@db_transaction(db)
def create_developer(data: dict) -> None:
    """Create developer"""
    with db.cursor() as cursor:
        cursor.execute(
            "INSERT INTO developers (nickname, age, rank, resources) VALUES (%s, %s, %s, %s)",
            (data["nickname"], data["age"], data["rank"], data["resources"]),
        )


@error_catcher
def get_developer_by_id(id: int) -> dict:
    with db.cursor() as cursor:
        cursor.execute("SELECT * FROM developers WHERE id = %s", (id,))
        developer = cursor.fetchone()
    return developer


@error_catcher
@db_transaction(db)
def update_developer(data: dict) -> None:
    with db.cursor() as cursor:
        cursor.execute(
            f"UPDATE developers SET {', '.join([f'{value} = {data[value]}' for value in data if value != 'id'])} WHERE id = {data['id']}"
        )


@error_catcher
@db_transaction(db)
def delete_developer(id: int) -> None:
    with db.cursor() as cursor:
        cursor.execute("DELETE FROM developers WHERE id = %s", (id,))
