import React, { Component } from 'react'
import Table from './Table'

export class Characters extends Component {
  state = {
    characters: []
  }

  getDerivedStateFromProps(nextProps, prevState) {
    console.log('state => props')
    console.log(nextProps)
    console.log(prevState)
  }

  componentDidMount() {
    console.log('UPDATING')
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data) => {
        this.setState( {
          characters: data.map(e => {
            return {
              id: e.id,
              name: e.name,
              job: e.company.bs
            }
          })})
          console.log(data)
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>Characters example</h1>
        <Table className="Table"
          charactersData={this.state.characters}
          handleDelete={this.removeCharacter}
          />
      </div>
    )
  }
  
  removeCharacter = (index) => {
    const { characters } = this.state
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }
}

export default Characters
