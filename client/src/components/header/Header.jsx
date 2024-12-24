import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './style.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className={`header-container ${isMenuOpen ? 'hidden' : ''}`}>
                <Link to="/" className="logo">MogCommunity</Link>
                <button className="menu-button" onClick={toggleMenu}>
                    ☰
                </button>
            </header>
            <Sidebar isOpen={isMenuOpen} onClose={toggleMenu} />
        </>
    );
};

export default Header;
