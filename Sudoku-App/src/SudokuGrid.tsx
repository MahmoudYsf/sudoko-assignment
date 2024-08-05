import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import styles from "./SudokuGrid.module.css";
import {
  checkValidMove,
  checkWin,
  evaluateGameStatus,
  saveGameState,
  restartGame,
} from "./GameRules";

// Type definition for the Sudoku grid, a 2D array of numbers
type Grid = number[][];

// Initial Sudoku grid setup
const initialGrid: Grid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// Main SudokuGrid component
const SudokuGrid: React.FC = () => {
  // State hooks for grid, selected cell, mistakes, game over status, and confetti display
  const [grid, setGrid] = useState<Grid>(() => {
    // Initialize grid from localStorage or use initialGrid if no saved state
    const savedGrid = localStorage.getItem("sudokuGrid");
    return savedGrid ? JSON.parse(savedGrid) : initialGrid;
  });

  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );

  const [mistakes, setMistakes] = useState(() => {
    // Initialize mistakes from localStorage or default to 0
    const savedMistakes = localStorage.getItem("sudokuMistakes");
    return savedMistakes ? parseInt(savedMistakes) : 0;
  });

  const [gameOver, setGameOver] = useState(() => {
    // Initialize gameOver status from localStorage or default to false
    const savedGameOver = localStorage.getItem("sudokuGameOver");
    return savedGameOver ? JSON.parse(savedGameOver) : false;
  });

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Evaluate the game status and save the current game state whenever grid, mistakes, or gameOver change
    console.log("Calling Evaluate game status from useEffect");
    evaluateGameStatus(mistakes, setGameOver);
    saveGameState(grid, mistakes, gameOver);
  }, [grid, mistakes]);

  // Function to handle changes in cell values
  const handleChange = (row: number, col: number, value: string) => {
    // Return early if the game is over
    if (gameOver) return;

    // Validate and update the grid with the new value
    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
      const newGrid = [...grid];
      newGrid[row][col] = value === "" ? 0 : parseInt(value);
      setGrid(newGrid);

      // Check if the move is valid; if not, increment mistakes count
      if (value !== "") {
        const isValidMove = checkValidMove(newGrid, row, col, parseInt(value));
        if (!isValidMove) {
          setMistakes((prev) => prev + 1);
        }
      }

      // Check if the game is won and trigger confetti if so
      if (checkWin(newGrid)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);

        // Hide confetti after 6 seconds
      }
    }
  };

  // Function to handle cell click events
  const handleCellClick = (row: number, col: number) => {
    // Allow cell selection only if the game is not over and the cell is initially empty
    if (!gameOver && initialGrid[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  };

  // Function to handle game restart
  const handleRestart = () => {
    // Restart the game with the initial grid and reset state
    restartGame(
      initialGrid,
      setGrid,
      setMistakes,
      setSelectedCell,
      setGameOver
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Render the Sudoku grid */}
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            // Determine if a cell is editable or has errors
            const isEditable = initialGrid[rowIndex][colIndex] === 0;
            const isIncorrect =
              isEditable &&
              cell !== 0 &&
              !checkValidMove(grid, rowIndex, colIndex, cell);

            // Determine cell styling based on its state
            const cellClass = `${styles.input} ${
              isEditable
                ? isIncorrect
                  ? styles.incorrect
                  : styles.editable
                : styles.prefilled
            } ${
              selectedCell &&
              selectedCell[0] === rowIndex &&
              selectedCell[1] === colIndex
                ? styles.selected
                : ""
            }`;

            // Determine cell border styling based on row and column index
            const borderClass = `${styles.cell} ${
              (colIndex + 1) % 3 === 0 && colIndex !== 8
                ? styles.thickBorderRight
                : ""
            } ${
              (rowIndex + 1) % 3 === 0 && rowIndex !== 8
                ? styles.thickBorderBottom
                : ""
            }`;

            return (
              <div key={`${rowIndex}-${colIndex}`} className={borderClass}>
                <input
                  type="text"
                  value={cell !== 0 ? cell.toString() : ""}
                  onChange={(e) =>
                    handleChange(rowIndex, colIndex, e.target.value)
                  }
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  readOnly={!isEditable || gameOver} // Make input readonly if not editable or game is over
                  className={cellClass} // Apply cell styling
                />
              </div>
            );
          })
        )}
      </div>
      <div className={styles.mistakes}>Mistakes: {mistakes}</div>
      {gameOver && (
        <div className={styles.gameOverMessage}>
          You can't proceed with the game. Please restart the game.
        </div>
      )}
      <button className={styles.restartButton} onClick={handleRestart}>
        Restart
      </button>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={10000}
          gravity={0.1}
          colors={[
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
          ]}
        />
      )}
    </div>
  );
};

export default SudokuGrid;
