import React from 'react'
import TileComponent from './Tile'
import './Field.css'

export default function FieldComponent(props) {
  const f = props.field
  const rows = f.field.map((row, r) => {
    const tiles = row.map((tile, c) =>
      <TileComponent key={'c'+((r+1)*(c+1))} 
                        row={r} 
                        col={c} 
                        tile={tile}
                        handleOpen={props.handleOpen}
                        handleMark={props.handleMark}/>
    )
    return <tr key={'r'+r}>{tiles}</tr>
  })
  return <table><tbody>{rows}</tbody></table>
}
