import React, { Component } from 'react'

export default class TaskForm extends Component {
  constructor(props) {
    super(props)
    const editedTask = props.editedTask

    if(editedTask === null) {
      this.initialState = { text: '', descr: ''}
    } else {
      this.initialState = editedTask      
    }

    this.state = this.initialState
  }

  render() {
    const { text, descr } = this.state
    const { submitHandler, cancelHandler } = this.props
    return (
      <div>
        {this.getFormTitle()}
        <form>
          <div className="form-group">
            <label>Task text:</label>
            <input className="form-control"
                   type="text"
                   name="text"
                   value={text}
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input className="form-control"
                   type="text"
                   name="descr"
                   value={descr}
                   onChange={this.handleChange}/>
          </div>
          <button className="btn btn-primary"
                  type="button"
                  onClick={() => submitHandler(this.state)}>
                    Submit
          </button>
          <button className="btn btn-secondary"
                  type="button"
                  onClick={() => this.resetHandler()}>
                    Reset
          </button>
          <button className="btn btn-secondary"
                  type="button"
                  onClick={() => cancelHandler()}>
                    Cancel
          </button>
        </form>
      </div>
    )
  }

  getFormTitle() {
    return <h1>{this.props.editedTask ? 'Edit' : 'Add'} task</h1>
  }

  handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  } 

  resetHandler = () => {
    this.setState(this.initialState)
  }
}
