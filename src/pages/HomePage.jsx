import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSudokuState } from '../contexts/SudokuContext';
import Navbar from '../components/Navbar.jsx'; 

function HomePage() {
  const navigate = useNavigate();
  const { createGame, state } = useSudokuState(); 

  const handleCreateGame = async (difficulty) => {
    try {
      const gameId = await createGame(difficulty);

      navigate(`/game/${gameId}`);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        alert("Failed to create game. " + error.message);
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar /> {/* Navbar */}
      
      <div className="home-header">
        <h1>Sudoku Online</h1>
        <p>Play, Compete, and Solve!</p>
      </div>

      <div className="home-actions">
        {state.isLoading ? (
          <p>Creating Game...</p>
        ) : (
          <>
            <button 
              className="home-button button-primary"
              onClick={() => handleCreateGame('easy')}
            >
              Create Easy Game
            </button>
            <button 
              className="home-button button-primary"
              onClick={() => handleCreateGame('normal')}
            >
              Create Normal Game
            </button>
          </>
        )}
      </div>

      {state.error && <div style={{color: 'red', textAlign:'center', marginTop: '20px'}}>{state.error}</div>}
      
      {/* game lists */}
    </div>
  );
}

export default HomePage;