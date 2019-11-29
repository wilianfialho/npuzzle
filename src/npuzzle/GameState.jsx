import React, { Component } from "react";
import { GameStateEnum } from "./Core";

export default function GameState({ gameState, handleNewGame, handleRating }) {
  let title = null;

  switch (gameState) {
    case GameStateEnum.WON:
      title = <h1>You WON!</h1>;
      break;
    case GameStateEnum.PLAYING:
      break;
    default:
      break;
  }
  if (title)
    return (
      <div>
        {title}
        <br></br>
        <button
          className="btn btn-outline-success"
          onClick={() => handleNewGame(this.props.rows, this.props.cols)}
        >
          New game
        </button>
        <br></br>
        <br></br>
        <button
          className="btn btn-outline-warning"
          onClick={() => handleRating()}
        >
          Rate game
        </button>
      </div>
    );
  else return null;
}
