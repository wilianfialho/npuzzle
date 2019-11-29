import React, { Component } from "react";
import TileComponent from "./Tile";
import "./nPuzzleField.css";

export default function FieldComponent(props) {
  const f = props.field;
  const rows = f.field.map((row, r) => {
    const tiles = row.map((tile, c) => (
      <TileComponent
        key={"c" + (r + 1) * (c + 1)}
        row={r}
        col={c}
        tile={tile}
        handleClick={props.handleClick}
      />
    ));
    return <tr key={"r" + r}>{tiles}</tr>;
  });
  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
}
