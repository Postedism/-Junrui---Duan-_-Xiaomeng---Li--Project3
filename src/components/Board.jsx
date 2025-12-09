import React from 'react';
import Cell from './Cell.jsx'; 

function Board({ boardData, initialBoard }) {
  if (!boardData || !initialBoard || boardData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.2rem' }}>
        Loading Board...
      </div>
    );
  }

  const size = boardData.length;
  const subgridHeight = size === 6 ? 2 : 3;
  const subgridWidth = 3; 

  return (
    <div className={`sudoku-board size-${size}`}>
      {boardData.map((rowArr, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {rowArr.map((value, colIndex) => {
            
            const isInitial = initialBoard[rowIndex] && initialBoard[rowIndex][colIndex] !== 0;
            
            const isRightBorder = (colIndex + 1) % subgridWidth === 0 
                                  && (colIndex + 1) !== size;
                                  
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