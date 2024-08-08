// GameRules.ts

/**
 * Checks if placing a value in a specific cell is a valid move.
 * @param grid - The current state of the Sudoku grid.
 * @param row - The row index of the cell.
 * @param col - The column index of the cell.
 * @param value - The value to be placed in the cell.
 * @returns true if the move is valid, otherwise false.
 */

export const checkValidMove = (grid: number[][], row: number, col: number, value: number): boolean => {
  if (value === 0) return true; // Empty cell is always valid.

  // Check if the value already exists in the same row.
  for (let i = 0; i < 9; i++) {
    if (i !== col && grid[row][i] === value) return false;
  }

  // Check if the value already exists in the same column.
  for (let i = 0; i < 9; i++) {
    if (i !== row && grid[i][col] === value) return false;
  }

  // Check if the value already exists in the same 3x3 box.
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if ((i !== row || j !== col) && grid[i][j] === value) return false;
    }
  }

  return true;
};

/**
 * Checks if the Sudoku grid is in a winning state (i.e., all cells are correctly filled).
 * @param grid - The current state of the Sudoku grid.
 * @returns true if the grid is solved, otherwise false.
 */

export const checkWin = (grid: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // A cell that is empty or an invalid number indicates the game is not yet won.
      if (grid[row][col] === 0 || !checkValidMove(grid, row, col, grid[row][col])) return false;
    }
  }
  return true;
};

/**
 * Evaluates the game status based on the number of mistakes.
 * @param mistakes - The current number of mistakes made by the player.
 * @param setGameOver - State updater function to set the game over status.
 */

export const evaluateGameStatus = (mistakes: number, setGameOver: React.Dispatch<React.SetStateAction<boolean>>) => {
  // If mistakes exceed or equal to 3, the game is over.
  if (mistakes >= 3) {
    setGameOver(true);
    alert("Oops you have lost")
  }
};

/**
 * Saves the current game state to localStorage.
 * @param grid - The current state of the Sudoku grid.
 * @param mistakes - The current number of mistakes made by the player.
 * @param gameOver - Boolean indicating if the game is over.
 */

export const saveGameState = (
  grid: number[][],
  mistakes: number,
  gameOver: boolean
) => {
  localStorage.setItem("sudokuGrid", JSON.stringify(grid));
  localStorage.setItem("sudokuMistakes", mistakes.toString());
  localStorage.setItem("sudokuGameOver", JSON.stringify(gameOver));
};

/**
 * Resets the game to its initial state and clears localStorage.
 * @param initialGrid - The initial state of the Sudoku grid to reset to.
 * @param setGrid - State updater function to set the grid state.
 * @param setMistakes - State updater function to reset the mistakes count.
 * @param setSelectedCell - State updater function to clear the selected cell.
 * @param setGameOver - State updater function to set the game over status to false.
 */

export const restartGame = (
  initialGrid: number[][],  // Initial grid state to reset to.
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>,
  setMistakes: React.Dispatch<React.SetStateAction<number>>,
  setSelectedCell: React.Dispatch<React.SetStateAction<[number, number] | null>>,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Reset the grid to the initial state.
  setGrid(initialGrid.map((row) => [...row]));
  // Reset the number of mistakes.
  setMistakes(0);
  // Clear the selected cell.
  setSelectedCell(null);
  // Set the game over status to false.
  setGameOver(false);
  // Remove saved game state from localStorage.
  localStorage.removeItem("sudokuGrid");
  localStorage.removeItem("sudokuMistakes");
  localStorage.removeItem("sudokuGameOver");
};