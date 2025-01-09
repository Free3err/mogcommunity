// Routing
import { Link } from "react-router-dom";

// Styles
import "./style.css";

const Sidebar = ({ isAuthenticated, isOpen, onClose }) => {
    return (
        <nav className={`side-menu ${isOpen ? "open" : ""}`}>
            <button className="close-button" onClick={onClose}>
                ✕
            </button>
            <ul className="menu-list">
                <li className="menu-item">
                    {isAuthenticated ? (
                        <Link
                            to="/me"
                            className="underline-animation"
                            onClick={onClose}
                        >
                            Мой аккаунт
                        </Link>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="underline-animation"
                            onClick={onClose}
                        >
                            Войти в аккаунт
                        </Link>
                    )}
                </li>
                <li className="menu-item">
                    <Link
                        to="/projects"
                        className="underline-animation"
                        onClick={onClose}
                    >
                        Проекты
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/developers"
                        className="underline-animation"
                        onClick={onClose}
                    >
                        Разработчики
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/about"
                        className="underline-animation"
                        onClick={onClose}
                    >
                        О нас
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <p className="sidebar-footer-text">
                    Developed & designed by Free3err
                </p>
            </div>
        </nav>
    );
};

export default Sidebar;
