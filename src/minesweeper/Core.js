// ----- MODEL --------
export const TileStateEnum = { OPEN: 1, CLOSED: 2, MARKED: 3 };
export const GameStateEnum = { PLAYING: 1, WON: 2, LOST: 3 };
export class Tile { constructor(state = TileStateEnum.CLOSED) { this.state = state; }}
export class Mine extends Tile {}
export class Clue extends Tile { constructor(value, state) { super(state); this.value = value; }}
export class Field {
  constructor(rowCount, colCount, mineCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.mineCount = mineCount;
    this.field = [];
    this.gameState = GameStateEnum.PLAYING;
    this.generate();
  }

  generate() {
    this.field = [];
    this.gameState = GameStateEnum.PLAYING;

    for(let row = 0; row < this.rowCount; row++) {
      this.field.push([]);
      this.field[row].length = this.colCount;
    }

    let randomRow, randomCol;
    let counter = 0;

    do {
      randomRow = Math.floor(Math.random() * this.rowCount);
      randomCol = Math.floor(Math.random() * this.colCount);
      
      if(!this.field[randomRow][randomCol]) {
        this.field[randomRow][randomCol] = new Mine();
        counter++;
      }
    } while (counter < this.mineCount);
    
    for(let row = 0; row < this.rowCount; row++) {
      for(let col = 0; col < this.colCount; col++) {
        if(!this.field[row][col]) {
          this.field[row][col] = new Clue(this.countAdjacentMines(row, col));
        }
      }
    }
  }

  countAdjacentMines(row, col) {
    let count = 0, actRow = 0, actCol = 0

    for(let r = -1; r <= 1; r++) {
      actRow = row+r;
      if(actRow >= 0 && actRow < this.rowCount) {
        for(let c = -1; c <= 1; c++) {
          actCol = col+c;
          if(actCol >= 0 && actCol < this.colCount) {
            if(this.field[actRow][actCol] && this.field[actRow][actCol] instanceof Mine) {
              count++;
            }
          }
        }
      }
    }

    return count;
  }

  openTile(row, col) {
    if(this.gameState !== GameStateEnum.PLAYING) return;
    
    if(this.field[row][col] instanceof Mine) {
      this.gameState = GameStateEnum.LOST;
      return;
    }
    
    if(this.field[row][col].state === TileStateEnum.CLOSED) {
      this.openTileRecursive(row, col);
    }

    if(this.isGameWon()) {
      this.gameState = GameStateEnum.WON
    }
  }

  isGameWon() {
    return (this.rowCount * this.colCount) - this.countOpenTiles() === this.mineCount
  }

  openTileRecursive(row, col) {
    const tile = this.field[row][col];
    if(tile.state === TileStateEnum.CLOSED) {
      tile.state = TileStateEnum.OPEN

      if(tile instanceof Clue && tile.value === 0) {
        this.openAdjacentTiles(row, col);
      }
    }
  }

  openAdjacentTiles(row, col) {
    let { actRow, actCol } = 0;
    for(let r = -1; r <= 1; r++) {
      actRow = row+r;
      if(actRow >= 0 && actRow < this.rowCount) {
        for(let c = -1; c <= 1; c++) {
          actCol = col+c;
          if(actCol >= 0 && actCol < this.colCount) {
            this.openTileRecursive(actRow, actCol)
          }
        }
      }
    }
  }

  markTile(row, col) {
    if(this.gameState !== GameStateEnum.PLAYING) return;

    const tile = this.field[row][col];
    if(tile.state === TileStateEnum.MARKED) {
      tile.state = TileStateEnum.CLOSED
    } else if (tile.state === TileStateEnum.CLOSED) {
      tile.state = TileStateEnum.MARKED
    }
  }

  countOpenTiles() {
    return this.field.map(
        (row) => row.filter(
          tile => tile.state === TileStateEnum.OPEN
          ).length
      ).reduce((prev, curr) => prev + curr)
  }

  deepCopyField() {
    return this.field.map(row => [...this.state.field[row]]);
  }
}
// ----- END MODEL ----------