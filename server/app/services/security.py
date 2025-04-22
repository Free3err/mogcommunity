import bcrypt


class Security:
    """Class that including static methods and properties to keep
        to safe users' data and performance of backend system

        !No touching real data in db or other sources in the first way!
        """
    class Password:
        """Class that include static methods to manage users' passwords"""

        @staticmethod
        def check(password: str) -> bool:
            return bcrypt.checkpw(password.encode('utf-8'), bcrypt.gensalt())

        @staticmethod
        def encrypt(password: str) -> str:
            return str(bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()))
