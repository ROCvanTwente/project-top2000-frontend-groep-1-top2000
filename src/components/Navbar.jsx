import { useState } from 'react'; // Stap 1: Import useState
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import npoLogo from './npo_radio2_logo.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Stap 2: State voor menu
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <img src={npoLogo} alt="NPO Radio 2" className="npo-logo" />
      </Link>

      {/* Stap 3: Hamburger Icoon */}
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Stap 4: Navigatie menu met conditional class */}
      <nav className={`nav ${isOpen ? 'active' : ''}`}>
        <Link 
          to="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Home
        </Link>
        
        <Link 
          to="/lijst" 
          className={`nav-link ${isActive('/lijst') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          De Lijst
        </Link>

        <Link 
          to="/artiesten" 
          className={`nav-link ${isActive('/artiesten') || location.pathname.startsWith('/artist/') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Artiesten
        </Link>

        <Link 
          to="/statistics" 
          className={`nav-link ${location.pathname.startsWith('/statistics') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Statistieken
        </Link>
        
        <Link 
          to="/faq" 
          className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          FAQ
        </Link>
        
        <Link 
          to="/contact" 
          className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Contact
        </Link>
        
        <Link 
          to="/account" 
          className={`nav-link ${isActive('/account') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          👤
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;