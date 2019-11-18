import React, { Component } from 'react'
import {Mine, TileStateEnum} from './Core'
import './Tile.css'

const TILE_COLORS = ['transparent', 'blue', 'green', 'red', 'purple', 'maroon', 'black', 'gray', 'turquoise'];

export const TileComponent = (props) => {
  const { tile, row, col } = props
  
  const tileStyle = {
    color: TILE_COLORS[tile.value],
  }

  return (
    <td className='colStyle'>
      <button className='tileStyle' style={tileStyle} >
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