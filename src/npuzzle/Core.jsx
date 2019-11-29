export const GameStateEnum = { PLAYING: 1, WON: 2 };

export class Tile {
  constructor(value) {
    this.value = value;
  }
}

export class Field {
  constructor(rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.field = [];
    this.gameState = GameStateEnum.PLAYING;
    this.generate();
    this.shuffle(10);
  }

  generate() {
    this.field = [];
    this.gameState = GameStateEnum.PLAYING;

    for (let row = 0; row < this.rowCount; row++) {
      this.field.push([]);
      this.field[row].length = this.colCount;
    }

    let tileNumber = 1;

    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        if (!this.field[row][col]) {
          this.field[row][col] = new Tile(tileNumber);
          tileNumber++;
        }
      }
    }

    this.field[this.rowCount - 1][this.colCount - 1] = new Tile(undefined);
  }

  shuffle = swapCount => {
    for (let i = 0; i < swapCount; i++) {
      let randomRow1 = Math.floor(Math.random() * this.rowCount);
      let randomCol1 = Math.floor(Math.random() * this.colCount);
      let randomTileValue1 = this.field[randomRow1][randomCol1].value;

      let randomRow2 = Math.floor(Math.random() * this.rowCount);
      let randomCol2 = Math.floor(Math.random() * this.colCount);

      this.field[randomRow1][randomCol1].value = this.field[randomRow2][
        randomCol2
      ].value;

      this.field[randomRow2][randomCol2].value = randomTileValue1;
    }
  };

  // todo: odstranit checkovanie diagonal
  clickTile(row, col) {
    if (this.gameState !== GameStateEnum.PLAYING) return;
    console.log("Item clicked", row, col);

    let { actRow, actCol } = 0;
    for (let r = -1; r <= 1; r++) {
      actRow = row + r;
      if (actRow >= 0 && actRow < this.rowCount) {
        for (let c = -1; c <= 1; c++) {
          if (r === 0) {
            actCol = col + c;
          } else {
            actCol = col;
          }
          if (actCol >= 0 && actCol < this.colCount) {
            if (this.field[actRow][actCol].value === undefined) {
              this.field[actRow][actCol].value = this.field[row][col].value;
              this.field[row][col].value = undefined;
            }
          }
        }
      }
    }

    if (this.isGameWon()) {
      this.gameState = GameStateEnum.WON;
    }
  }

  isGameWon = () => {
    let tileNumber = 1;

    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        if (this.field[row][col] && this.field[row][col].value !== undefined) {
          if (this.field[row][col].value - tileNumber !== 0) {
            return false;
          }
        }
        tileNumber++;
      }
    }
    return true;
  };
}
