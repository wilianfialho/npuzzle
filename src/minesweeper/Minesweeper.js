import React, { Component } from 'react'
import FieldComponent from './Field'
import { Field } from './Core'

export default class Minesweeper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      field: new Field(10, 10, 10)
    }
  }

  render() {
    return (
      <div>
        <FieldComponent field={this.state.field}
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
}
