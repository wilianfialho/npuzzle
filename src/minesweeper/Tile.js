import React from 'react'
import {Mine, TileStateEnum} from './Core'
import './Tile.css'

const TILE_COLORS = ['transparent', 'blue', 'green', 'red', 'purple', 'maroon', 'black', 'gray', 'turquoise'];

export default function TileComponent(props) {
  const { tile, row, col, handleOpen, handleMark } = props
  const tileStyle = {
    color: TILE_COLORS[tile.value],
  }

  return (
    <td className='colStyle'>
      <button className={'tileStyle ' + (tile.state === TileStateEnum.OPEN ? 'open' : 'closed')}
              style={tileStyle}
              onClick={() => handleOpen(row, col)}
              onContextMenu={(event) => {
                event.preventDefault()
                handleMark(row, col)
              }}
              >
        { tile.state === TileStateEnum.MARKED && 
                          <img alt={row + ',' + col} 
                               src={require(`./img/mark.gif`)} /> }
        {
          tile.state === TileStateEnum.OPEN && (
            tile instanceof Mine ? 
                          <img alt={row + ',' + col}
                               src={require(`./img/mine.gif`)} /> 
                                 : 
                          <span>{tile.value}</span>
          )
        }
      </button>
    </td>
  )
}