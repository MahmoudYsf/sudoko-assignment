// // src/App.tsx
// import React, { useState } from "react";
// import SudokuGrid from "./SudokuGrid";
// import { SudokuGrid as SudokuGridType } from "./types";

// const initialGrid: SudokuGridType = Array.from({ length: 9 }, () =>
//   Array(9).fill(0)
// );

// const App: React.FC = () => {
//   const [grid, setGrid] = useState<SudokuGridType>(initialGrid);

//   const handleCellChange = (row: number, col: number, value: number) => {
//     const newGrid = grid.map((r, rowIndex) =>
//       r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
//     );
//     setGrid(newGrid);
//   };

//   return (
//     <div>
//       <h1>Sudoku Grid</h1>
//       <SudokuGrid grid={grid} onCellChange={handleCellChange} />
//     </div>
//   );
// };

// export default App;

const App = () => {
  return (
    <>
      <div>
        <h3>hi mahmoud</h3>
      </div>
    </>
  );
};
export default App;
