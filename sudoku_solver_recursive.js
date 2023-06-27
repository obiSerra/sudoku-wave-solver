const { solveRecursive, SudokuBoard } = require("./src/index.js");
const fs = require("fs/promises");

(async () => {
  const games = [
    [
      [8, null, null, null, null, null, null, null, null],
      [null, null, 3, 6, null, null, null, null, null],
      [null, 7, null, null, 9, null, 2, null, null],
      [null, 5, null, null, null, 7, null, null, null],
      [null, null, null, null, 4, 5, 7, null, null],
      [null, null, null, 1, null, null, null, 3, null],
      [null, null, 1, null, null, null, null, 6, 8],
      [null, null, 8, 5, null, null, null, 1, null],
      [null, 9, null, null, null, null, 4, null, null],
    ],
  ];

  for (const game of games) {
    const board = new SudokuBoard(game);

    board.print();
    const time = Date.now();
    const solved = solveRecursive(game);
    console.log("Solved in " + (Date.now() - time) + "ms");
    const solvedBoard = new SudokuBoard(solved);
    solvedBoard.print();
  }
})();
