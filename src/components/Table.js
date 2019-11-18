import React, { Component } from 'react'

const TableHeader = () => {
  return (
    <thead style={{fontWeight: 'bold'}}>
      <tr>
        <td scope="col">Name</td>
        <td scope="col">Job</td>
      </tr>
    </thead>
  )
}

const TableBody = () => {
  return (
    <tbody>
      <tr>
        <td>Iron Man</td>
        <td>superhero</td>
      </tr>
      <tr>
        <td>Isaac Asimov</td>
        <td>writer</td>
      </tr>
      <tr>
        <td>John Wick</td>
        <td>serial killer</td>
      </tr>
    </tbody>
  )
}

export default class Table extends Component {
  render() {
    return (
      <div>
        <table className="table">
          <TableHeader />
          <TableBody />
        </table>
      </div>
    )
  }
}