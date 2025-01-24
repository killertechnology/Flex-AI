import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="nav-left">
                
                <Link to="/" className="logo">
                <img src='images/gis.webp' width="90px" />
                </Link>
                <div className="greenLine"></div>
            </div>
            <div className="nav-middle">
            <button
                className={`hamburger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                >
                    
                    <div />
                    <div />
                    <div />
                </button>
            </div>
            <div className="nav-right">
                <div
                ref={menuRef}
                className={`nav-links ${menuOpen ? "active" : ""}`}
                >
                    <div className="menu">
                        <div><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></div>&nbsp;
                        <div><Link to="/services" onClick={() => setMenuOpen(false)}>Solutions</Link></div>&nbsp;
                        <div><Link to="/about" onClick={() => setMenuOpen(false)}>About&nbsp;Us</Link></div>&nbsp;
                        <div><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact&nbsp;Us</Link></div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
};
///<div><Link to="/careers" onClick={() => setMenuOpen(false)}>Careers</Link></div>&nbsp;
                        
export default Navbar;
