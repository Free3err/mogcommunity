// React
import { useState, useEffect } from "react";

// Routing
import { useNavigate, Link } from "react-router-dom";

// Axios
import axios from "axios";

// Styles
import "../../css/sign-up.css";

const SignUp = ({ setLoading }) => {
    useEffect(() => {
        document.title = "MogCommunity | Регистрация";
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = axios
            .post("http://localhost:8000/api/v1/auth/sign-up", formData)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {})
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="sign-up-container">
            <h1>Регистрация</h1>
            <form onSubmit={fetchSignUp}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="default-button submit-button">
                    Зарегистрироваться
                </button>
            </form>
            <div className="sign-in-footer">
                <p>
                    Уже есть аккаунт?{" "}
                    <Link to="/sign-in" className="underline-animation">
                        Войдите
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
