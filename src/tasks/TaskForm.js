import React, { Component } from 'react'

export default class TaskForm extends Component {
  constructor(props) {
    super(props)
    const editedTask = props.editedTask

    if(editedTask === null) {
      this.initialState = { id: -1, text: '', descr: '', finished: false}
    } else {
      this.initialState = editedTask
    }

    this.state = this.initialState
  }

  

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.editedTask && nextProps.editedTask.id !== prevState.id) {
      prevState = nextProps.editedTask
    }
    return prevState
  }

  render() {
    const { text, descr, finished } = this.state
    const { cancelHandler } = this.props
    return (
      <div className="mb-5">
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
          <div className="form-check mb-3">
            <input className="form-check-input"
                   type="checkbox" 
                   id="finished"
                   name="finished"
                   checked={finished}
                   onChange={this.handleChange}/>
            <label className="form-check-label" htmlFor="finished">Finished</label>
          </div>
          <button className="btn btn-primary mr-2"
                  type="button"
                  onClick={this.handleSubmit}>
                    Submit
          </button>
          <button className="btn btn-secondary mr-2"
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
    const { name, value, checked, type } = event.target
    const valueToChange = type === 'checkbox' ? checked : value
    this.setState({
      [name]: valueToChange,
    })
  } 

  handleSubmit = () => {
    this.props.submitHandler(this.state)
    this.setState(this.initialState)
  }

  resetHandler = () => {
    this.setState(this.initialState)
  }
}
