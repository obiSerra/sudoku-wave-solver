function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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

class SudokuBoard {
  constructor(board = emptyBoard) {
    this.board = board;
  }

  cols() {
    return this.board.map((_, i) => this.board.map(row => row[i]));
  }

  rows() {
    return this.board;
  }

  squares() {
    const squares = [];
    const board = this.board;
    for (let i = 0; i < 9; i++) {
      const square = [];
      for (let j = 0; j < 9; j++) {
        const row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        const col = (i % 3) * 3 + (j % 3);
        square.push(board[row][col]);
      }
      squares.push(square);
    }

    return squares;
  }

  cellRow(cell) {
    return this.board[cell[0]];
  }

  cellCol(cell) {
    return this.cols()[cell[1]];
  }

  cellSquare(cell) {
    const indx = Math.floor(cell[0] / 3) * 3 + Math.floor(cell[1] / 3);
    return this.squares()[indx];
  }

  print() {
    console.log("=========================================");
    this.rows().forEach((row, i) => {
      const r = row.map((cell, j) => {
        const out = cell ? cell : " ";
        return out + (j % 3 === 2 ? " ||" : " |");
      });
      console.log("|| " + r.join(" "));
      if (i == 8) {
      } else if (i % 3 === 2) {
        console.log("||===|===|===||===|===|===||===|===|===||");
      } else {
        console.log("||---|---|---||---|---|---||---|---|---||");
      }
    });
    console.log("=========================================");
  }

  _isValid(arr) {
    return arr
      .map(a => {
        const vals = a.filter(b => b !== null);
        return (
          Array.from(new Set(vals)).length == vals.length &&
          vals
            .map(b => {
              return b < 10;
            })
            .every(b => b)
        );
      })
      .every(b => b);
  }

  isBoardValid() {
    return this._isValid(this.rows()) && this._isValid(this.cols()) && this._isValid(this.squares());
  }

  missingNumbers() {
    const missing = [];
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      for (let j = 0; j < row.length; j++) {
        const val = row[j];
        if (!val) {
          missing.push([i, j]);
        }
      }
    }
    return missing;
  }
}

const listPossibleValues = (board, cell) => {
  const row = board.cellRow(cell);
  const col = board.cellCol(cell);
  const square = board.cellSquare(cell);
  const all = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let missing = all
    .filter(a => !row.includes(a))
    .filter(a => !col.includes(a))
    .filter(a => !square.includes(a));
  return missing;
};

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
  SudokuBoard,
};
