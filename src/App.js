import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Minesweeper from './minesweeper/Minesweeper';

const appStyle = {marginTop: '70px'}
const str = 'React'

export default class App extends Component {
  state = {
    characters: [
      {name: 'Iron Man', job: 'superhero'},
      {name: 'John Wick', job: 'serial killer'},
      {name: 'Isaac Asimov', job: 'writer'}
    ],
    rowCount: 10,
    columnCount: 10,
    mineCount: 10
  }

  render() {
    return (
      <div className="App" style={appStyle}>
        <h1>Minesweeper</h1>
        <Minesweeper />
        <h1>Hello {str} World!</h1>
        {/* <button className="btn btn-primary"
                onClick={this.removeCharacter}>Stlac ma</button> */}
        {/* <Table className="Table"
               charactersData={this.state.characters}
               handleDelete={this.removeCharacter}
                /> */}
      </div>
    )
  }

  // najprv index, lebo react podava event vzdy ako posledny po vsetkych parametroch
  // removeCharacter = (index, event) => {
  
  removeCharacter = (index) => {
    const { characters } = this.state
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }
}