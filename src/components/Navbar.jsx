import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import npoLogo from './npo_radio2_logo.svg';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src={npoLogo} alt="NPO Radio 2" className="npo-logo" />
      </Link>
      <nav className="nav">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          Home
        </Link>
        
      
        <Link to="/lijst" className={`nav-link ${isActive('/lijst') ? 'active' : ''}`}>
          De Lijst
        </Link>

      
        <Link 
          to="/artiesten" 
          className={`nav-link ${isActive('/artiesten') || location.pathname.startsWith('/artist/') ? 'active' : ''}`}
        >
          Artiesten
        </Link>

        <Link to="/statistics" className={`nav-link ${location.pathname.startsWith('/statistics') ? 'active' : ''}`}>
          Statistieken
        </Link>
        
        <Link to="/faq" className={`nav-link ${isActive('/faq') ? 'active' : ''}`}>
          FAQ
        </Link>
        
        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
          Contact
        </Link>
        
        <Link to="/account" className={`nav-link ${isActive('/account') ? 'active' : ''}`}>
          👤
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;