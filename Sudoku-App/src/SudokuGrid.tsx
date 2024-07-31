// // src/components/SudokuGrid.tsx
// import React from "react";
// import styles from "./SudokuGrid.module.css";
// import { SudokuGrid as SudokuGridType } from "./types";

// interface SudokuGridProps {
//   grid: SudokuGridType;
//   onCellChange: (row: number, col: number, value: number) => void;
// }

// const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, onCellChange }) => {
//   return (
//     <div className={styles.grid}>
//       {grid.map((row, rowIndex) => (
//         <div key={rowIndex} className={styles.row}>
//           {row.map((cell, colIndex) => (
//             <div key={colIndex} className={styles.cell}>
//               <input
//                 className={styles.input}
//                 type="number"
//                 min="1"
//                 max="9"
//                 value={cell || ""}
//                 onChange={(e) =>
//                   onCellChange(rowIndex, colIndex, Number(e.target.value))
//                 }
//               />
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SudokuGrid;
