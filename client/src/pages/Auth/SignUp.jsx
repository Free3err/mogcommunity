// React
import { useState, useEffect } from "react";

// Routing
import { Link, Navigate } from "react-router-dom";

// HTTP Client
import axios from "axios";

// Styles
import "../../css/sign-up.css";

const SignUp = ({isAuthenticated}) => {
    useEffect(() => {
        document.title = "MogCommunity | Регистрация";
    }, []);

    const [formData, setFormData] = useState({
        username: "",
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
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/auth/sign_up`,
                formData,
                {
                    withCredentials: true,
                }
            );
            if (response.data.ok) {
                window.location.href = "/me";
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(
                    "Пользователь с таким никнеймом или почтой уже существует!"
                );
            } else {
                alert("Что-то пошло не так.")
            }
        }
    };
    
    return isAuthenticated ? (
        <Navigate to="/me" replace />
    ) : (
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
