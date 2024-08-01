import React, { useState, useEffect } from "react";
import styles from "./SudokuGrid.module.css";
import { checkValidMove, checkWin, generateConfetti } from "./GameRules";

const initialGrid = [
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

const SudokuGrid: React.FC = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (mistakes >= 3) {
      setGameOver(true);
    }
  }, [mistakes]);

  const handleChange = (row: number, col: number, value: string) => {
    if (gameOver) return;

    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
      const newGrid = [...grid];
      newGrid[row][col] = value === "" ? 0 : parseInt(value);
      setGrid(newGrid);

      if (value !== "") {
        const isValidMove = checkValidMove(newGrid, row, col, parseInt(value));
        if (!isValidMove) {
          setMistakes((prev) => prev + 1);
        }
      }

      if (checkWin(newGrid)) {
        alert("You win!");
        generateConfetti();
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (!gameOver && initialGrid[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  };

  const handleRestart = () => {
    setGrid(initialGrid.map((row) => [...row]));
    setMistakes(0);
    setSelectedCell(null);
    setGameOver(false);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default SudokuGrid;
