import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    axios.get('/api/user/isLoggedIn')
      .then(res => {
        setUsername(res.data.username);
      })
      .catch(() => {
        setUsername(null);
      });
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout');
      setUsername(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className={`navbar ${isOpen ? 'nav-open' : ''}`}>
      <Link to="/" className="navbar-logo">
        Sudoku Master
      </Link>

      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="hamburger-icon"></span>
      </button>

      <div className="nav-menu-wrapper">
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/rules" className="nav-link">Rules</Link>
          </li>
          <li>
             <Link to="/scores" className="nav-link">High Scores</Link>
          </li>
        </ul>

        {/* 0 */}
        <div className="navbar-auth">
          {username ? (
            <div className="navbar-user-info">
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                {username} ▼
              </span>
              <button 
                onClick={handleLogout} 
                className="nav-btn nav-btn-login" 
                style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem', margin: 0 }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/login" className="nav-btn nav-btn-login">
                Log In
              </Link>
              <Link to="/register" className="nav-btn nav-btn-signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;