export const checkValidMove = (grid: number[][], row: number, col: number, value: number): boolean => {
  if (value === 0) return true;
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && grid[row][i] === value) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && grid[i][col] === value) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if ((i !== row || j !== col) && grid[i][j] === value) return false;
    }
  }

  return true;
};

export const checkWin = (grid: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0 || !checkValidMove(grid, row, col, grid[row][col])) return false;
    }
  }
  return true;
};

export const generateConfetti = () => {
  
};
