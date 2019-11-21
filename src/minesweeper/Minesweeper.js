import React, { Component } from 'react'
import FieldComponent from './Field'
import { Field } from './Core'
import GameState from './GameState'

export default class Minesweeper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      field: new Field(10, 10, 10)
    }
  }

  render() {
    const { field } = this.state
    return (
      <div>
        <GameState gameState={field.gameState}
                   handleNewGame={this.handleNewGame} />
        <FieldComponent field={field}
                        handleOpen={this.handleOpen}
                        handleMark={this.handleMark}/>
      </div>
    )
  }

  handleOpen = (row, col) => {
    const { field } = this.state
    field.openTile(row, col)
    this.setState({ field: field })
  }

  handleMark = (row, col) => {
    const { field } = this.state
    field.markTile(row, col)
    this.setState({ field: field })
  }

  handleNewGame = () => {
    this.setState({ field: new Field(10, 10, 10) })
  }
}
