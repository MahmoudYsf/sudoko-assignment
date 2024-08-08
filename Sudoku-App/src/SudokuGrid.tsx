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

type Grid = number[][];

const easyGrids: Grid[] = [
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
    [1, 0, 0, 0, 0, 7, 0, 9, 0],
    [0, 3, 0, 0, 2, 0, 0, 0, 8],
    [0, 0, 9, 6, 0, 0, 5, 0, 0],
    [0, 0, 5, 3, 0, 0, 9, 0, 0],
    [0, 1, 0, 0, 8, 0, 0, 0, 2],
    [6, 0, 0, 0, 0, 4, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 4, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 7, 0, 0, 0, 3, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 4, 8, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 3, 0, 5, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 7, 0],
    [7, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
  ],
];

const mediumGrids: Grid[] = [
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
  ],
  [
    [2, 0, 0, 3, 0, 0, 0, 0, 0],
    [8, 0, 4, 0, 6, 2, 0, 0, 3],
    [0, 1, 3, 8, 0, 0, 6, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 0],
    [5, 9, 0, 0, 0, 3, 0, 2, 8],
    [4, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 6, 1, 0, 0, 7, 3, 5, 0],
    [7, 0, 0, 9, 0, 0, 0, 0, 1],
    [0, 3, 0, 0, 0, 1, 0, 0, 0],
  ],
  [
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 7, 4, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 2],
    [0, 8, 0, 0, 4, 0, 0, 1, 0],
    [6, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 7, 8, 0],
    [5, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0],
  ],
];

const hardGrids: Grid[] = [
  [
    [0, 0, 0, 0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [0, 5, 9, 0, 0, 0, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 7, 5, 0],
    [0, 0, 7, 2, 0, 0, 6, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 3, 0, 2, 0, 0, 0, 0],
    [0, 6, 0, 0, 7, 0, 8, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 0],
    [4, 7, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 4, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 5, 0, 0, 9, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 8, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 6, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 6, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 8],
    [0, 0, 7, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
];

const SudokuGrid: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(() => {
    const savedGrid = localStorage.getItem("sudokuGrid");
    return savedGrid ? JSON.parse(savedGrid) : easyGrids[0];
  });

  const [initialGrid, setInitialGrid] = useState<Grid>(() => {
    const savedInitialGrid = localStorage.getItem("sudokuInitialGrid");
    return savedInitialGrid ? JSON.parse(savedInitialGrid) : easyGrids[0];
  });

  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(
    null
  );
  const [mistakes, setMistakes] = useState(() => {
    const savedMistakes = localStorage.getItem("sudokuMistakes");
    return savedMistakes ? parseInt(savedMistakes) : 0;
  });

  const [gameOver, setGameOver] = useState(() => {
    const savedGameOver = localStorage.getItem("sudokuGameOver");
    return savedGameOver ? JSON.parse(savedGameOver) : false;
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [prevGridIndex, setPrevGridIndex] = useState<number | null>(null);
  const [userMadeChanges, setUserMadeChanges] = useState(false);

  useEffect(() => {
    evaluateGameStatus(mistakes, setGameOver);
    saveGameState(grid, mistakes, gameOver);
  }, [grid, mistakes]);

  const handleChange = (row: number, col: number, value: string) => {
    if (gameOver) return;

    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
      const newGrid = [...grid];
      newGrid[row][col] = value === "" ? 0 : parseInt(value);
      setGrid(newGrid);
      setUserMadeChanges(true);

      if (value !== "") {
        const isValidMove = checkValidMove(newGrid, row, col, parseInt(value));
        if (!isValidMove) {
          setMistakes((prev) => prev + 1);
        }
      }

      if (checkWin(newGrid)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (!gameOver) {
      setSelectedCell([row, col]);
      const clickedValue = grid[row][col];
      setHighlightedNumber(clickedValue !== 0 ? clickedValue : null);
    }
  };

  const selectGrid = (difficulty: "easy" | "medium" | "hard") => {
    let grids;
    switch (difficulty) {
      case "easy":
        grids = easyGrids;
        break;
      case "medium":
        grids = mediumGrids;
        break;
      case "hard":
        grids = hardGrids;
        break;
    }
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * grids.length);
    } while (newIndex === prevGridIndex);

    setPrevGridIndex(newIndex);
    return grids[newIndex];
  };

  const handleDifficultyChange = (
    newDifficulty: "easy" | "medium" | "hard"
  ) => {
    if (userMadeChanges) {
      alert("You can't change the difficulty mid-game.");
      return;
    }
    setDifficulty(newDifficulty);
    const newGrid = selectGrid(newDifficulty);
    setInitialGrid(newGrid);
    restartGame(newGrid, setGrid, setMistakes, setSelectedCell, setGameOver);
    setHighlightedNumber(null);
  };

  const handleRestart = () => {
    const newGrid = selectGrid(difficulty); // Use the current difficulty to select a new grid
    setInitialGrid(newGrid);
    restartGame(newGrid, setGrid, setMistakes, setSelectedCell, setGameOver);
    setHighlightedNumber(null);
    setUserMadeChanges(false); // Reset change tracking on restart
  };

  return (
    <div className={styles.container}>
      <label htmlFor="difficulty-select">Select Difficulty:</label>
      <select
        id="difficulty-select"
        value={difficulty}
        onChange={(e) =>
          handleDifficultyChange(e.target.value as "easy" | "medium" | "hard")
        }
        className={styles.difficultySelect}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div className={styles.grid}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isEditable = initialGrid[rowIndex][colIndex] === 0;
            const isIncorrect =
              isEditable &&
              cell !== 0 &&
              !checkValidMove(grid, rowIndex, colIndex, cell);

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
            } ${
              highlightedNumber !== null && cell === highlightedNumber
                ? styles.highlighted
                : ""
            }`;

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
                  readOnly={!isEditable || gameOver}
                  className={cellClass}
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
