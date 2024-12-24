// React
import { useState } from 'react';

// Routing
import { Link } from 'react-router-dom';

// Components
import Sidebar from '../sidebar/Sidebar';

// Icons
import DataObjectIcon from '@mui/icons-material/DataObject';

// Styles
import './style.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className={`header-container ${isMenuOpen ? 'hidden' : ''}`}>
                <Link to="/" className="logo"><p>MogCommunity</p> <DataObjectIcon className="logo-icon" /></Link>
                <button className="menu-button" onClick={toggleMenu}>
                    ☰
                </button>
            </header>
            <Sidebar isOpen={isMenuOpen} onClose={toggleMenu} />
        </>
    );
};

export default Header;
