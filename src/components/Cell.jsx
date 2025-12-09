import React from 'react';
import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';

function Cell({ value, row, col, isInitial, isRightBorder, isBottomBorder }) {
  const { state } = useSudokuState();
  const dispatch = useSudokuDispatch();


  const { selectedCell, hintCell, solutionBoard } = state;


  const isSelected = selectedCell && selectedCell.row === row && selectedCell.col === col;

  const isHinted = hintCell && hintCell.row === row && hintCell.col === col;

  const isIncorrect = 
    !isInitial && 
    value !== 0 && 
    solutionBoard && 
    solutionBoard.length > 0 && 
    solutionBoard[row][col] !== value;


  let className = 'sudoku-cell';
  if (isInitial) className += ' cell-initial';
  if (isSelected) className += ' cell-selected';
  if (isHinted) className += ' cell-hinted';
  if (isIncorrect) className += ' cell-incorrect';
  if (isRightBorder) className += ' border-right-heavy';
  if (isBottomBorder) className += ' border-bottom-heavy';


  const handleClick = () => {
    dispatch({
      type: 'SELECT_CELL',
      payload: { row, col }
    });
  };

  return (
    <div className={className} onClick={handleClick}>
      {/* 0  */}
      {value !== 0 ? value : ''}
    </div>
  );
}

export default Cell;