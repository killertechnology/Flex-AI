
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div>
                <div className="flex-logo"><Link to="/">Flex-AI</Link>  </div> 
                <div></div>
            </div>
                <div id='navburger' className='navburger'>
                    <div className="hamburger" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={`nav-links ${isOpen ? 'active' : ''} hamburgerbar`}>
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/services2">Services</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </div>
        </nav>
    );
}

export default Navbar;
