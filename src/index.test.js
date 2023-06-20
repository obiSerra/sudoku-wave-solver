const { solve } = require("./index.js");

const hardSudoku = [
  [
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
    [
      [7, 9, 4, 8, 6, 2, 1, 3, 5],
      [2, 1, 3, 9, 4, 5, 8, 7, 6],
      [5, 8, 6, 7, 3, 1, 2, 9, 4],
      [6, 3, 5, 1, 8, 9, 4, 2, 7],
      [8, 2, 1, 4, 7, 3, 5, 6, 9],
      [9, 4, 7, 2, 5, 6, 3, 8, 1],
      [4, 7, 2, 5, 9, 8, 6, 1, 3],
      [3, 5, 8, 6, 1, 7, 9, 4, 2],
      [1, 6, 9, 3, 2, 4, 7, 5, 8],
    ],
  ],
  [
    [
      [null, 7, null, 2, null, null, 5, null, 3],
      [null, 8, 5, null, null, null, 9, 4, null],
      [null, null, null, null, 6, 9, 7, null, null],
      [8, 5, 6, null, null, null, null, 1, 4],
      [null, null, null, 3, null, null, null, null, null],
      [2, 1, null, 8, null, 4, null, null, null],
      [null, null, 9, 4, null, 7, null, null, null],
      [3, 6, null, 9, null, 1, null, 5, 8],
      [1, null, null, null, 3, null, 2, null, 9],
    ],
    [
      [9, 7, 1, 2, 4, 8, 5, 6, 3],
      [6, 8, 5, 1, 7, 3, 9, 4, 2],
      [4, 3, 2, 5, 6, 9, 7, 8, 1],
      [8, 5, 6, 7, 9, 2, 3, 1, 4],
      [7, 9, 4, 3, 1, 6, 8, 2, 5],
      [2, 1, 3, 8, 5, 4, 6, 9, 7],
      [5, 2, 9, 4, 8, 7, 1, 3, 6],
      [3, 6, 7, 9, 2, 1, 4, 5, 8],
      [1, 4, 8, 6, 3, 5, 2, 7, 9],
    ],
  ],
  [
    [
      [null, 4, 2, 8, null, null, null, 7, null],
      [null, null, null, null, null, null, 3, 8, 6],
      [null, 3, null, null, null, 9, 1, null, null],
      [7, 5, null, null, null, 1, null, 9, null],
      [null, null, 9, null, 8, null, 2, null, null],
      [null, null, 1, null, 6, 5, null, null, 7],
      [2, 8, null, null, 7, 3, null, null, 5],
      [null, null, 7, 2, 1, 4, null, null, 3],
      [null, null, 6, null, null, null, null, null, 4],
    ],
    [
      [1, 4, 2, 8, 3, 6, 5, 7, 9],
      [9, 7, 5, 1, 4, 2, 3, 8, 6],
      [6, 3, 8, 7, 5, 9, 1, 4, 2],
      [7, 5, 3, 4, 2, 1, 6, 9, 8],
      [4, 6, 9, 3, 8, 7, 2, 5, 1],
      [8, 2, 1, 9, 6, 5, 4, 3, 7],
      [2, 8, 4, 6, 7, 3, 9, 1, 5],
      [5, 9, 7, 2, 1, 4, 8, 6, 3],
      [3, 1, 6, 5, 9, 8, 7, 2, 4],
    ],
  ],
];
describe("solve", () => {
  it("should return the solved sudoku simple", () => {
    const expected_solution = [
      [1, 9, 4, 8, 6, 5, 2, 3, 7],
      [7, 3, 5, 4, 1, 2, 9, 6, 8],
      [8, 6, 2, 3, 9, 7, 1, 4, 5],
      [9, 2, 1, 7, 4, 8, 3, 5, 6],
      [6, 7, 8, 5, 3, 1, 4, 2, 9],
      [4, 5, 3, 9, 2, 6, 8, 7, 1],
      [3, 8, 9, 6, 5, 4, 7, 1, 2],
      [2, 4, 6, 1, 7, 9, 5, 8, 3],
      [5, 1, 7, 2, 8, 3, 6, 9, 4],
    ];
    const sudoku = [
      [1, 9, 4, 8, 6, 5, 2, 3, null],
      [7, 3, 5, 4, 1, 2, 9, 6, 8],
      [8, 6, 2, 3, 9, 7, 1, 4, 5],
      [9, 2, 1, 7, 4, 8, 3, 5, 6],
      [6, 7, 8, 5, 3, 1, 4, 2, 9],
      [4, 5, 3, 9, 2, 6, 8, 7, 1],
      [3, 8, 9, 6, 5, 4, 7, 1, 2],
      [2, 4, 6, 1, 7, 9, 5, 8, 3],
      [5, 1, 7, 2, 8, 3, 6, 9, 4],
    ];

    const solution = solve(sudoku);
    expect(solution).toEqual(expected_solution);
  });

  it.each([...hardSudoku])("should solve hard sudoku", (sudoku, solution) => {
    expect(solve(sudoku)).toEqual(solution);
  });

  it("should return the solved sudoku invalid", () => {
    const invalidSudoku = [
      [1, 9, 4, 8, 6, 5, 2, 3, 8],
      [7, 3, 5, 4, 1, 2, 9, 6, 8],
      [8, 6, 2, 3, 9, 7, 1, 4, 5],
      [9, 2, 1, 7, 4, 8, 3, 5, 6],
      [6, 7, 8, 5, 3, 1, 4, 2, 9],
      [4, 5, 3, 9, 2, 6, 8, 7, 1],
      [3, 8, 9, 6, 5, 4, 7, 1, 2],
      [2, 4, 6, 1, 7, 9, 5, 8, 3],
      [5, 1, 7, 2, 8, 3, 6, 9, 4],
    ];
    try {
      solve(invalidSudoku);
    } catch (e) {
      expect(e.message).toEqual("The board is not valid");
    }
    expect.assertions(1);
  });
});
