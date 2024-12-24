// Routing
import { Link } from "react-router-dom";

// Styles
import "./style.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Contacts section */}
                <nav className="footer-section">
                    <h3 className="footer-title">Контакты</h3>
                    <ul className="footer-list">
                        <li>
                            <a
                                href="https://t.me/mogcommunity"
                                className="underline-animation"
                            >
                                Telegram
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://vk.com"
                                className="underline-animation"
                            >
                                VK
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:contact@mogcommunity.ru"
                                className="underline-animation"
                            >
                                Email
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Navigation section */}
                <nav className="footer-section">
                    <h3 className="footer-title">Навигация</h3>
                    <ul className="footer-list">
                        <li>
                            <Link to="/" className="underline-animation">
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/projects"
                                className="underline-animation"
                            >
                                Проекты
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/developers"
                                className="underline-animation"
                            >
                                Разработчики
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="underline-animation">
                                О нас
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Sign in section */}
                <nav className="footer-section">
                    <h3 className="footer-title">Вход</h3>
                    <ul className="footer-list">
                        <li>
                            <Link to="/sign-in" className="underline-animation">
                                Войти
                            </Link>
                        </li>
                        <li>
                            <Link to="/sign-up" className="underline-animation">
                                Зарегистрироваться
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="footer-bottom">
                <p className="copyright">© 2024 MogCommunity. MIT License.</p>
            </div>
        </footer>
    );
};

export default Footer;
