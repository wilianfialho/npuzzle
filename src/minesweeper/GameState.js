import React from "react";
import { GameStateEnum } from "./Core";

export default function GameState({ gameState, handleNewGame }) {
  let title = null
  switch(gameState) {
    case GameStateEnum.WON: title = <h1>You WON!</h1>; break;
    case GameStateEnum.LOST: title = <h1>You WON!</h1>; break;
    case GameStateEnum.PLAYING: break;
    default: break;
  }
  if(title)
    return (<div>
      {title}
      <button onClick={() => handleNewGame()}>New game</button>
    </div>)
  else return null
}
