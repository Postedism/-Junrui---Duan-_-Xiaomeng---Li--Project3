import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SudokuProvider } from './contexts/SudokuContext.jsx';
import './index.css';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import GamePage from './pages/GamePage.jsx';
import ScorePage from './pages/ScorePage.jsx';

import Navbar from './components/Navbar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/game/:gameId", 
    element: <GamePage />,
  },
  {
    path: "/scores",
    element: <ScorePage />,
  },
  {
    // Rules 页面配置
    path: "/rules",
    element: (
      <div className="app-container">
        <Navbar /> 
        
        <div className="page-container" style={{maxWidth: '800px', margin: '2rem auto', padding: '0 2rem'}}>
          <h1>Sudoku Rules</h1>
          <ul style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
            <li>Each row must contain the numbers 1-9 exactly once.</li>
            <li>Each column must contain the numbers 1-9 exactly once.</li>
            <li>Each 3x3 subgrid must contain the numbers 1-9 exactly once.</li>
            <li><strong>Easy Mode:</strong> Uses a 6x6 grid with numbers 1-6.</li>
          </ul>
          <br />
          <div className="credits-section">
            {/* Name */}
            <p>Developed by: <strong>Junrui Duan & Xiaomeng Li</strong></p>
            {/* Link */}
            <p>
              Email: <a href="Postedism@outlook.com">Postedism@outlook.com</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SudokuProvider>
      <RouterProvider router={router} />
    </SudokuProvider>
  </React.StrictMode>
);