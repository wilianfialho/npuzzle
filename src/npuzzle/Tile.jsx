import React, { Component } from "react";
import "./PuzzleTile.css";

export default function TileComponent(props) {
  const { tile, row, col, handleClick } = props;

  return (
    <td>
      <button
        className="btn btn-outline-primary puzzleTileStyle"
        onClick={() => handleClick(row, col)}
      >
        <span>{tile.value}</span>
      </button>
    </td>
  );
}
