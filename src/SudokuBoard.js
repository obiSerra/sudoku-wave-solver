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

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}
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

module.exports = {
  SudokuBoard,
  listPossibleValues,
  sample,
};
