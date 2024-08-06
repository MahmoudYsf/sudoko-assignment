// GameRules.ts

export const checkValidMove = (grid: number[][], row: number, col: number, value: number): boolean => {
  if (value === 0) return true;

  for (let i = 0; i < 9; i++) {
    if (i !== col && grid[row][i] === value) return false;
  }

  for (let i = 0; i < 9; i++) {
    if (i !== row && grid[i][col] === value) return false;
  }

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

export const evaluateGameStatus = (mistakes: number, setGameOver: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (mistakes >= 3) {
    setGameOver(true);
    alert("Game Over! You've made too many mistakes.");
  }
};

export const saveGameState = (
  grid: number[][],
  initialGrid: number[][],
  mistakes: number,
  gameOver: boolean
) => {
  localStorage.setItem("sudokuGrid", JSON.stringify(grid));
  localStorage.setItem("sudokuInitialGrid", JSON.stringify(initialGrid));
  localStorage.setItem("sudokuMistakes", mistakes.toString());
  localStorage.setItem("sudokuGameOver", JSON.stringify(gameOver));
};

export const restartGame = (
  newGrid: number[][],
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>,
  setMistakes: React.Dispatch<React.SetStateAction<number>>,
  setSelectedCell: React.Dispatch<React.SetStateAction<[number, number] | null>>,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setGrid(newGrid.map((row) => [...row]));
  setMistakes(0);
  setSelectedCell(null);
  setGameOver(false);
  localStorage.removeItem("sudokuGrid");
  localStorage.removeItem("sudokuInitialGrid");
  localStorage.removeItem("sudokuMistakes");
  localStorage.removeItem("sudokuGameOver");
};