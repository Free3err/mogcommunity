import { Link } from 'react-router-dom';
import './style.css';

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={onClose}>✕</button>
            <ul className="menu-list">
                <li className="menu-item">
                    <Link to="/" className="menu-link" onClick={onClose}>Главная</Link>
                </li>
                <li className="menu-item">
                    <Link to="/projects" className="menu-link" onClick={onClose}>Проекты</Link>
                </li>
                <li className="menu-item">
                    <Link to="/contacts" className="menu-link" onClick={onClose}>Контакты</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;