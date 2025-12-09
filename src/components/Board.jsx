import React from 'react';
import Cell from './Cell.jsx'; // 显式加上后缀，最安全

function Board({ boardData, initialBoard }) {
  // 安全检查：如果数据还没加载，显示 Loading
  if (!boardData || !initialBoard || boardData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.2rem' }}>
        Loading Board...
      </div>
    );
  }

  const size = boardData.length;
  // 适配 6x6 和 9x9 的宫格边界
  const subgridHeight = size === 6 ? 2 : 3;
  const subgridWidth = 3; 

  return (
    <div className={`sudoku-board size-${size}`}>
      {boardData.map((rowArr, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {rowArr.map((value, colIndex) => {
            
            // 检查是否是初始题目数字
            const isInitial = initialBoard[rowIndex] && initialBoard[rowIndex][colIndex] !== 0;
            
            // 计算宫格右边框
            const isRightBorder = (colIndex + 1) % subgridWidth === 0 
                                  && (colIndex + 1) !== size;
                                  
            // 计算宫格下边框
            const isBottomBorder = (rowIndex + 1) % subgridHeight === 0 
                                   && (rowIndex + 1) !== size;
            
            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={value}
                row={rowIndex}
                col={colIndex}
                isInitial={isInitial}
                isRightBorder={isRightBorder}
                isBottomBorder={isBottomBorder}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;