import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ScorePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取所有游戏列表
    axios.get('/api/sudoku')
      .then(res => {
        // 1. 过滤掉没人完成的游戏 (completedBy 为空)
        const playedGames = res.data.filter(g => g.completedBy && g.completedBy.length > 0);
        
        // 2. 按完成人数降序排序 (Most popular first)
        playedGames.sort((a, b) => b.completedBy.length - a.completedBy.length);
        
        setGames(playedGames);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching scores:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="page-container scores-page">
        <h2>High Scores (Popular Games)</h2>
        
        {loading ? (
          <p>Loading scores...</p>
        ) : games.length === 0 ? (
          <p>No games have been completed yet. Be the first!</p>
        ) : (
          <table className="scores-table">
            <thead>
              <tr>
                <th>Game Name</th>
                <th>Difficulty</th>
                <th>Created By</th>
                <th>Completions</th>
                <th>Last Completed</th>
              </tr>
            </thead>
            <tbody>
              {games.map(game => (
                <tr key={game._id}>
                  <td>{game.title}</td>
                  <td style={{ textTransform: 'capitalize' }}>{game.difficulty}</td>
                  <td>{game.creator}</td>
                  <td style={{ fontWeight: 'bold', color: '#27ae60' }}>
                    {game.completedBy.length} Players
                  </td>
                  <td>
                    {/* 显示最后一位完成者的名字 */}
                    {game.completedBy[game.completedBy.length - 1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ScorePage;