import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container w-full">
                <div className="nav-brand">
                    <Link to="/">
                        <span className="brand-icon">🏥</span>
                        <span className="brand-text">Disease Predictor</span>
                    </Link>
                </div>

                <button
                    className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-links flex ${isMenuOpen ? 'active' : 'hidden md:flex'}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        <span className="nav-icon">🏠</span>
                        Home
                    </Link>
                    <Link to="/predict" onClick={() => setIsMenuOpen(false)}>
                        <span className="nav-icon">🔍</span>
                        Predict
                    </Link>
                    <Link to="/nearby-doctors" onClick={() => setIsMenuOpen(false)}>
                        <span className="nav-icon">👨‍⚕️</span>
                        Find Doctors
                    </Link>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
