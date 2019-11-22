import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const TableHeader = () => {
  return (
    <thead style={{fontWeight: 'bold'}}>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Job</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
  )
}

// const TableBody = (props) => {
// const { charData, handleDelete } = props

const TableBody = ({ charData, handleDelete }) => {
  const rows = charData.map((character, index) => 
      <tr key={index}>
        <td><Link to={'/character/character-detail/' + character.name}>{character.name}</Link></td>
        <td>{character.job}</td>
        <td>
          <button className='btn btn-secondary'
                  onClick={() => handleDelete(index)}>
            Delete
          </button>
        </td>
      </tr>
  );
  return (
    <tbody>
      {rows}
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