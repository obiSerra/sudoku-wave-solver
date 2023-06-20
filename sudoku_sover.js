const { solve, SudokuBoard } = require("./src/index.js");
const fs = require("fs/promises");

(async () => {
  const games = [
    [
      [null, 9, 4, null, 6, 2, null, null, null],
      [2, null, 3, null, null, null, 8, null, 6],
      [5, null, 6, 7, null, 1, null, 9, null],
      [6, null, null, 1, null, null, null, 2, 7],
      [null, null, 1, 4, null, 3, null, null, null],
      [9, null, null, null, 5, null, 3, 8, null],
      [null, 7, 2, null, null, 8, null, 1, null],
      [3, 5, null, null, null, 7, 9, null, 2],
      [null, null, null, 3, null, null, null, 5, null],
    ],

    // [
    //   [8, null, null, null, null, null, null, null, null],
    //   [null, null, 3, 6, null, null, null, null, null],
    //   [null, 7, null, null, 9, null, 2, null, null],
    //   [null, 5, null, null, null, 7, null, null, null],
    //   [null, null, null, null, 4, 5, 7, null, null],
    //   [null, null, null, 1, null, null, null, 3, null],
    //   [null, null, 1, null, null, null, null, 6, 8],
    //   [null, null, 8, 5, null, null, null, 1, null],
    //   [null, 9, null, null, null, null, 4, null, null],
    // ],
  ];

  for (const game of games) {
    const board = new SudokuBoard(game);

    board.print();
    const solved = solve(game);
    const solvedBoard = new SudokuBoard(solved);
    solvedBoard.print();
    console.log("\n\n=========================================\n\n");
  }
})();
