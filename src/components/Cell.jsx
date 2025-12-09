import React from 'react';
import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';

function Cell({ value, row, col, isInitial, isRightBorder, isBottomBorder }) {
  const { state } = useSudokuState();
  const dispatch = useSudokuDispatch();

  // 从 Context 中解构需要的状态
  const { selectedCell, hintCell, solutionBoard } = state;

  // 1. 判断是否被用户选中
  const isSelected = selectedCell && selectedCell.row === row && selectedCell.col === col;

  // 2. 判断是否是"提示"高亮格
  const isHinted = hintCell && hintCell.row === row && hintCell.col === col;

  // 3. 判断是否填错 (逻辑：不是初始格 + 有值 + 值不等于答案)
  // 加上安全检查，防止 solutionBoard 为空时报错
  const isIncorrect = 
    !isInitial && 
    value !== 0 && 
    solutionBoard && 
    solutionBoard.length > 0 && 
    solutionBoard[row][col] !== value;

  // 组合 CSS 类名 (对应 index.css)
  let className = 'sudoku-cell';
  if (isInitial) className += ' cell-initial';
  if (isSelected) className += ' cell-selected';
  if (isHinted) className += ' cell-hinted';
  if (isIncorrect) className += ' cell-incorrect';
  if (isRightBorder) className += ' border-right-heavy';
  if (isBottomBorder) className += ' border-bottom-heavy';

  // 点击事件
  const handleClick = () => {
    dispatch({
      type: 'SELECT_CELL',
      payload: { row, col }
    });
  };

  return (
    <div className={className} onClick={handleClick}>
      {/* 0 不显示，显示为空白 */}
      {value !== 0 ? value : ''}
    </div>
  );
}

export default Cell;