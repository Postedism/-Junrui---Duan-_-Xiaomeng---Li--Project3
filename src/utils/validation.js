/**
 * @param {number[][]} board 
 * @param {number} row 
 * @param {number} col 
 * @param {number} value 
 * @returns {boolean} 
 */
export function isMoveInvalid(board, row, col, value) {
  if (value === 0) return false;
  
  const size = board.length;

  for (let c = 0; c < size; c++) {
    if (c !== col && board[row][c] === value) {
      return true; 
    }
  }


  for (let r = 0; r < size; r++) {
    if (r !== row && board[r][col] === value) {
      return true; 
    }
  }


  const subgridHeight = size === 6 ? 2 : 3;
  const subgridWidth = 3; 

  const startRow = Math.floor(row / subgridHeight) * subgridHeight;
  const startCol = Math.floor(col / subgridWidth) * subgridWidth;

  for (let r = startRow; r < startRow + subgridHeight; r++) {
    for (let c = startCol; c < startCol + subgridWidth; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) {
        return true; 
      }
    }
  }

  return false;
}

/**
 * Hint 
 * @param {number[][]} board 
 * @returns {object | null} - 返回 { row, col, value } 或 null
 */
export function findNakedSingle(board) {
  const size = board.length;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {

      if (board[r][c] === 0) {
        
        const candidates = [];
        for (let val = 1; val <= size; val++) {
          if (!isMoveInvalid(board, r, c, val)) {
            candidates.push(val);
          }
        }

        if (candidates.length === 1) {
          return {
            row: r,
            col: c,
            value: candidates[0], 
          };
        }
      }
    }
  }

  return null;
}