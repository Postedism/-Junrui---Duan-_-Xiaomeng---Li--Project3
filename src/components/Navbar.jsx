import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // 移动端菜单开关
  const navigate = useNavigate();
  const location = useLocation(); // 监听路由变化

  // 检查登录状态
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

        {/* 修复部分：认证按钮区域 */}
        <div className="navbar-auth">
          {username ? (
            // 登录状态：稍微美化一下，模拟图片里的“用户信息块”
            <div className="navbar-user-info">
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>
                {username} ▼
              </span>
              <button 
                onClick={handleLogout} 
                className="nav-btn nav-btn-login" // 复用 Login 的边框样式，保持一致
                style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem', margin: 0 }}
              >
                Logout
              </button>
            </div>
          ) : (
            // 未登录状态：完全匹配图片，显示为两个按钮
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