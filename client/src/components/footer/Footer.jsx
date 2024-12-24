import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">Контакты</h3>
                    <ul className="footer-list">
                        <li>
                            <a href="https://discord.gg" className="footer-link">Discord</a>
                        </li>
                        <li>
                            <a href="https://vk.com" className="footer-link">VK</a>
                        </li>
                        <li>
                            <a href="mailto:contact@mogcommunity.ru" className="footer-link">Email</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Навигация</h3>
                    <ul className="footer-list">
                        <li>
                            <Link to="/" className="footer-link">Главная</Link>
                        </li>
                        <li>
                            <Link to="/projects" className="footer-link">Проекты</Link>
                        </li>
                        <li>
                            <Link to="/contacts" className="footer-link">Контакты</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="copyright">© 2024 MogCommunity. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
