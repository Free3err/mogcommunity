from functools import wraps

def db_transaction(db_instance):
    """
    Декоратор для автоматического управления транзакциями базы данных.
    Принимает экземпляр базы данных в качестве параметра.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                result = func(*args, **kwargs)
                db_instance.commit()
                return result
            except Exception as e:
                db_instance.rollback()
                raise e
        return wrapper
    return decorator