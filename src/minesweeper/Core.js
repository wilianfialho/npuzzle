// ----- MODEL --------
export const TileStateEnum = { OPEN: 1, CLOSED: 2, MARKED: 3 };
export const GameStateEnum = { PLAYING: 1, WON: 2, LOST: 3 };
export class Tile { constructor(state = TileStateEnum.OPEN) { this.state = state; }}
export class Mine extends Tile {}
export class Clue extends Tile { constructor(value, state) { super(state); this.value = value; }}
// ----- END MODEL ----------