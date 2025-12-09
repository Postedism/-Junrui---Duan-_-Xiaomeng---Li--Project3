import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';
import Navbar from '../components/Navbar.jsx';
import Board from '../components/Board.jsx';
import axios from 'axios';

function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { state, loadGame, deleteGame } = useSudokuState();
  const dispatch = useSudokuDispatch();
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 1. 获取游戏数据
    if (gameId) loadGame(gameId);

    // 2. 获取当前用户信息
    axios.get('/api/user/isLoggedIn')
      .then(res => setCurrentUser(res.data.username))
      .catch(() => setCurrentUser(null));
  }, [gameId]);

  const onNumberClick = (num) => {
    if (state.selectedCell) {
      dispatch({
        type: 'UPDATE_CELL_VALUE',
        payload: { row: state.selectedCell.row, col: state.selectedCell.col, value: num }
      });
    }
  };

  // 🆕 处理重置游戏
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the board? Your progress will be lost.")) {
      dispatch({ type: 'RESET_GAME' });
    }
  };

  // 处理删除游戏
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to DELETE this game? This cannot be undone.")) {
      try {
        await deleteGame(gameId);
        alert("Game deleted.");
        navigate('/'); // 删完回首页
      } catch (e) {
        alert("Failed to delete game.");
      }
    }
  };

  if (state.isLoading) return <div className="page-container">Loading Game...</div>;
  if (!state.initialBoard || state.initialBoard.length === 0) return <div className="page-container">Game not found or loading...</div>;

  // 判断是否是创建者
  const isCreator = currentUser && state.creator === currentUser;

  return (
    <div className="app-container">
      <Navbar />
      <div className="game-page">
        <div className="game-header">
            <div>
              <h2>{state.title} <small>({state.gameMode})</small></h2>
              <p style={{fontSize: '0.9rem', color: '#666'}}>Created by: {state.creator}</p>
            </div>
            {state.isWon && <div className="congratulations-message">🎉 You Won! 🎉</div>}
        </div>

        <div className="game-container">
          <div className="board-area">
            <Board 
              boardData={state.currentBoardState} 
              initialBoard={state.initialBoard} 
            />
          </div>

          <div className="controls-area">
             <div className="number-pad" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button key={num} onClick={() => onNumberClick(num)}>
                    {num}
                  </button>
                ))}
                <button onClick={() => onNumberClick(0)}>Clear</button>
             </div>
             
             <div className="button-group">
                <button 
                    className="button-hint" 
                    onClick={() => dispatch({ type: 'FIND_HINT' })}
                    disabled={state.isWon}
                >
                    Get Hint
                </button>

                {/* 🆕 Reset 按钮 */}
                <button 
                    className="button-secondary"
                    onClick={handleReset}
                    style={{ marginTop: '10px', width: '100%', backgroundColor: '#6c757d', color: 'white' }}
                >
                    Reset Board
                </button>
             </div>

             {/* 🗑️ DELETE 按钮: 只有创建者可见 */}
             {isCreator && (
               <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                 <button 
                   onClick={handleDelete}
                   style={{ 
                     width: '100%', 
                     backgroundColor: '#c62828', 
                     color: 'white',
                     border: 'none'
                   }}
                 >
                   DELETE GAME
                 </button>
                 <p style={{fontSize: '0.8rem', color: '#888', marginTop: '5px'}}>
                   (High scores will be updated)
                 </p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;