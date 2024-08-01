import React from "react";
import SudokuGrid from "./SudokuGrid";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <SudokuGrid />
    </div>
  );
};

export default App;
