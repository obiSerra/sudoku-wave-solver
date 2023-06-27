const { sample, SudokuBoard, listPossibleValues } = require("./SudokuBoard.js");

const emptyBoard = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

const solveWave = (board, invalid = {}, calls = []) => {
  const missing = board.missingNumbers();
  if (missing.length === 0) return true;

  const possibleValues = [];
  for (const miss of missing) {
    const values = listPossibleValues(board, miss);
    const cell = [miss, values.filter(a => !invalid[JSON.stringify(board.board) + `_${miss.join("-")}`]?.includes(a))];
    possibleValues.push(cell);
  }

  // sort the missing numbers by the number of possible values
  possibleValues.sort((a, b) => a[1].length - b[1].length);

  const possibility = possibleValues[0];
  const [cell, available] = possibility;

  if (available.length === 0) {
    if (calls.length === 0) {
      debugger;
    }
    const [lastCell, lastValue] = calls.pop();
    board.board[lastCell[0]][lastCell[1]] = null;
    const hash = JSON.stringify(board.board) + `_${lastCell.join("-")}`;
    invalid[hash] = invalid[hash] || [];
    invalid[hash].push(lastValue);

    return solveWave(board, invalid, calls);
  }

  // Select a random value from the available values
  const value = sample(available);
  board.board[cell[0]][cell[1]] = value;
  calls.push([cell, value]);

  return solveWave(board, invalid, calls);
};

const solveWaveIterative = board => {
  const stack = [board.board];
  const invalid = {};
  const calls = [];

  do {
    const boardConfig = stack.pop();
    board.board = boardConfig;
    const missing = board.missingNumbers();
    if (missing.length === 0) {
      return board;
    }

    const possibleValues = [];
    for (const miss of missing) {
      const values = listPossibleValues(board, miss);
      const cell = [
        miss,
        values.filter(a => !invalid[JSON.stringify(board.board) + `_${miss.join("-")}`]?.includes(a)),
      ];
      possibleValues.push(cell);
    }

    // sort the missing numbers by the number of possible values
    possibleValues.sort((a, b) => a[1].length - b[1].length);

    const possibility = possibleValues[0];
    const [cell, available] = possibility;

    if (available.length === 0) {
      const [lastCell, lastValue] = calls.pop();
      board.board[lastCell[0]][lastCell[1]] = null;
      const hash = JSON.stringify(board.board) + `_${lastCell.join("-")}`;
      invalid[hash] = invalid[hash] || [];
      invalid[hash].push(lastValue);

      stack.push(board.board);
    } else {
      // Select a random value from the available values
      const value = sample(available);
      board.board[cell[0]][cell[1]] = value;
      calls.push([cell, value]);
      stack.push(board.board);
    }
  } while (stack.length > 0);

  return board;
};

module.exports = {
  solve: boardJson => {
    const board = new SudokuBoard(boardJson);
    if (!board.isBoardValid()) {
      throw new Error("The board is not valid");
    }
    const solvedBoard = solveWaveIterative(board);
    return solvedBoard.board;
  },
  solveRecursive: boardJson => {
    const board = new SudokuBoard(boardJson);
    if (!board.isBoardValid()) {
      throw new Error("The board is not valid");
    }
    const solvedBoard = solveWave(board);
    return solvedBoard.board;
  },
  SudokuBoard,
};
