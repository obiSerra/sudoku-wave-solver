const { solve, SudokuBoard } = require("./src/index.js");
const fs = require("fs/promises");

(async () => {
  const game = [
    [8, null, null, null, null, null, null, null, null],
    [null, null, 3, 6, null, null, null, null, null],
    [null, 7, null, null, 9, null, 2, null, null],
    [null, 5, null, null, null, 7, null, null, null],
    [null, null, null, null, 4, 5, 7, null, null],
    [null, null, null, 1, null, null, null, 3, null],
    [null, null, 1, null, null, null, null, 6, 8],
    [null, null, 8, 5, null, null, null, 1, null],
    [null, 9, null, null, null, null, 4, null, null],
  ];

  const runs = 100;

  let timeTotal = 0;

  for (let i = 0; i < runs; i++) {

    const time = Date.now();
    solve(game);

    timeTotal += Date.now() - time;
    console.log(`Solved ${i + 1} in ${Date.now() - time}ms`);
  }

  console.log(`Average time for ${runs} tries: ${timeTotal / runs} ms`);
})();
