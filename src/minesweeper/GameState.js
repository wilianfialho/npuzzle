import React from "react";
import { GameStateEnum } from "./Core";

export default function GameState({ gameState, handleNewGame }) {
  return (
    <div>
      {gameState === GameStateEnum.WON && <h1>You WON!</h1>}
      {gameState === GameStateEnum.LOST && <h1>You LOST!</h1>}
      {gameState !== GameStateEnum.PLAYING && (
        <button onClick={() => handleNewGame()}>New game</button>
      )}
    </div>
  )
}
