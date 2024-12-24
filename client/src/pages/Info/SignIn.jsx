// React
import { useState, useEffect } from 'react';

// Routing
import { useNavigate, Link } from 'react-router-dom';

// HTTP Client
import axios from 'axios';

// Styles
import '../../css/sign-in.css';

const SignIn = ({setLoading}) => {
    useEffect(() => {
        document.title = "MogCommunity | Вход";
    }, []);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchSignIn = (e) => {
        e.preventDefault();
        setLoading(true);
        const response = axios.post('http://localhost:8000/api/v1/auth/sign-in', formData)
            .then((response) => {
                console.log(response);
                navigate('/');
            })
            .catch((error) => {
            })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
            <div className="sign-in-container">
                <h1>С возвращением!</h1>
                <form onSubmit={fetchSignIn}>
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
                        Войти
                    </button>
                </form>
                <div className="sign-in-footer">
                    <p>Еще нет аккаунта? <Link to="/sign-up" className="underline-animation">Зарегистрируйтесь</Link></p>
                </div>
            </div>
    );
};

export default SignIn;
