from typing import Callable

def error_catcher(func: Callable):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print(f"[ОШИБКА] {func.__name__}: {str(e)}")
            return None

    return wrapper
