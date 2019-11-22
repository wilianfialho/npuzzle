import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Minesweeper from './minesweeper/Minesweeper';
import Tasks from './tasks/Tasks';
import {BrowserRouter as Router, 
        Switch, 
        Route, 
        Link} from 'react-router-dom';

const str = 'React'

export default class App extends Component {
  state = {
    characters: [
      {name: 'Iron Man', job: 'superhero'},
      {name: 'John Wick', job: 'serial killer'},
      {name: 'Isaac Asimov', job: 'writer'}
    ]
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/tasks">Tasks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/minesweeper">Minesweeper</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/table">Table</Link>
              </li>
            </ul>
          </nav>
          <div class="container" style={{marginTop: '68px'}}>
          <Switch>
            <Route path="/tasks"> <Tasks /> </Route>
            <Route path="/minesweeper"> <Minesweeper /> </Route>
            <Route path="/table">
              <h1>Characters example</h1>
              <Table className="Table"
               charactersData={this.state.characters}
               handleDelete={this.removeCharacter}
                />
            </Route>
            <Route path="/">
              <h1>Hello {str} world!</h1>
            </Route>
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
  

  //</nav> najprv index, lebo react podava event vzdy ako posledny po vsetkych parametroch
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