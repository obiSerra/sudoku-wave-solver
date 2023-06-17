const { solve } = require("./src/index.js");
const fs = require("fs/promises");

(async () => {
  //   const games = JSON.parse(await fs.readFile("./data/sudoku_samples.json", "utf8"));

  const games = [[
      [8, null, null, null, null, null, null, null, null],
      [null, null, 3, 6, null, null, null, null, null],
      [null, 7, null, null, 9, null, 2, null, null],
      [null, 5, null, null, null, 7, null, null, null],
      [null, null, null, null, 4, 5, 7, null, null],
      [null, null, null, 1, null, null, null, 3, null],
      [null, null, 1, null, null, null, null, 6, 8],
      [null, null, 8, 5, null, null, null, 1, null],
      [null, 9, null, null, null, null, 4, null, null],
    ]];

//   const games = [
//     [
//       [1, 9, 4, null, 6, 5, 2, 3, null],
//       [7, 3, 5, 4, 1, 2, 9, 6, 8],
//       [8, 6, 2, 3, 9, 7, 1, 4, 5],
//       [9, 2, 1, 7, 4, 8, 3, 5, 6],
//       [6, 7, 8, 5, 3, 1, 4, 2, 9],
//       [4, 5, 3, 9, 2, 6, 8, 7, 1],
//       [3, 8, 9, 6, 5, 4, 7, 1, 2],
//       [2, 4, 6, 1, 7, 9, 5, 8, 3],
//       [5, 1, 7, 2, 8, 3, 6, 9, 4],
//     ],
//   ];

  for (const game of games) {
    solve(game);

    console.log("\n\n=========================================\n\n");
  }
})();
