This is a fully functional Sudoku web application that allows users to set the difficulty level according to their preference. When you click on any number in the grid, it will highlight all identical numbers, making it easier to check if the number is found in the same row, column, or block.

Features:
Difficulty Levels: Easy, Medium, and Hard difficulties, each containing 3 grids.
Highlight Identical Numbers: Clicking on a number highlights all the same numbers in the grid.
Confetti Animation: Confetti animation when the user wins.
Mistake Handling: Up to 3 mistakes allowed before the game ends.
Editable Incorrect Inputs: Incorrect inputs are shown in red and are editable.

Prerequisites:
Node.js: Download and install from [.](https://nodejs.org/en/download/package-manager)

Technologies Used:
React: 18.3.1
TypeScript: 5.5.4
Node.js: 20.15.1
npm: 10.7.0
React-Confetti: For confetti animations on win

Running the application:
npm install react-confetti
npm install
npm run dev (this must give you a local host link that you can paste into the browser)

Additional Notes
Ensure you are inside the project directory (cd Sudoku-App) before running the development server.
This application uses TypeScript with React for better type safety and development experience.
