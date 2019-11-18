import React, { Component } from 'react'
import { Clue, TileStateEnum, Mine } from '../minesweeper/Core';
import { TileComponent }  from '../minesweeper/Tile'

const TableHeader = () => {
  return (
    <thead style={{fontWeight: 'bold'}}>
      <tr>
        <td scope="col">Name</td>
        <td scope="col">Job</td>
        <td scope="col">Action</td>
      </tr>
    </thead>
  )
}

// const TableBody = (props) => {
// const { charData, handleDelete } = props

const TableBody = ({ charData, handleDelete }) => {
  const rows = charData.map((character, index) => 
    <tr key={index}>
      <td>{character.name}</td>
      <td>{character.job}</td>
      <td>
        <button className='btn btn-secondary'
                onClick={() => handleDelete(index)}>
          Delete
        </button>
      </td>
    </tr>
  );
  const tile1 = new Clue(4)
  const tile2 = new Clue(4, TileStateEnum.CLOSED)
  const mine = new Mine()
  return (
    <tbody>
      {rows}
      <tr>
        <TileComponent tile={tile1}/>
        <TileComponent tile={tile2}/>
        <TileComponent tile={mine}/>
      </tr>
    </tbody>
  )
}

export default class Table extends Component {
  render() {
    const { charactersData, handleDelete } = this.props

    return (
      <div>
        <table className="table">
          <TableHeader />
          <TableBody charData={charactersData}
                     handleDelete={handleDelete}/>
        </table>
      </div>
    )
  }
}