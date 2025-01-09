// React
import {useState, useEffect} from "react";

// Routing
import {Link, Navigate} from "react-router-dom";

// HTTP Client
import axios from "axios";

// Styles
import "../../css/sign-in.css";

const SignIn = ({isAuthenticated}) => {
    useEffect(() => {
        document.title = "MogCommunity | Вход";
    }, []);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/v1/auth/sign_in`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response.data.ok) {
                window.location.href = "/me";
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Неправильный никнейм или пароль.")
            } else {
                alert("Что-то пошло не так.")
            }
        }
    };
    return isAuthenticated ? (
        <Navigate to="/me" replace/>
    ) : (
        <div className="sign-in-container">
            <h1>С возвращением!</h1>
            <form onSubmit={fetchSignIn}>
                <div className="form-group">
                    <label htmlFor="username">Никнейм:</label>
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
                    Войти
                </button>
            </form>
            <div className="sign-in-footer">
                <p>
                    Еще нет аккаунта?{" "}
                    <Link to="/sign-up" className="underline-animation">
                        Зарегистрируйтесь
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
