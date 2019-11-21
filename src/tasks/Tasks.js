import React, { Component } from 'react'

export class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        {id: 0, text: "Prva uloha", descr: "urob to a to", finished: false},
        {id: 1, text: "Druha uloha", descr: "urob aj tamto", finished: false},
        {id: 2, text: "Tretia uloha", descr: "vyber jahodku z chladnicky", finished: false},
        {id: 3, text: "Stvrta uloha", descr: "zjedz jahodku", finished: false},
        {id: 4, text: "Piata uloha", descr: "zjedza aj druhu jahodku", finished: false},
      ],
      clickedTask: null,
      editedTask: null,
      lastTaskIndex: 4,
      showForm: false,
    }
  }

  render() {
    const { tasks } = this.state
    return (
      <div className="container">
        <h1>My tasks:</h1>
        <div className="mb-5">
          <ul className="list-group mb-3">
            {tasks.map((t, i) => {
              return <Task key={i} 
                          task={t}
                          showDetail={this.showDetail}
                          editHandler={this.editHandler}/>
            })}
          </ul>
          <button className="btn btn-primary float-right"
                  onClick={() => this.showFormHandler()}>
            Add task
          </button>
        </div>
        { this.displayTaskDetail() }
        { this.displayTaskForm() }
      </div>
    )
  }

  displayTaskDetail() {
    const { clickedTask } = this.state
    if(clickedTask) {
      return <TaskDetail task={clickedTask}
                         deleteHandler={this.deleteHandler} />
    } else return null
  }

  displayTaskForm() {
    return this.state.showForm ? 
          <TaskForm editedTask={this.state.editedTask}
                    submitHandler={this.submitHandler}
                    cancelHandler={this.cancelHandler} /> : 
          null
  }

  deleteHandler = () => {
    const { clickedTask, tasks } = this.state
    this.setState({
      tasks: tasks.filter((t) => t.id !== clickedTask.id),
      clickedTask: null
    })
  }

  showDetail = (task) => {
    this.setState({
      clickedTask: task
    })
  }

  editHandler = (task) => {
    this.setState({
      showForm: true,
      editedTask: task,
    })
  }

  submitHandler = (task) => {
    const { tasks, lastTaskIndex, editedTask } = this.state
    console.log(task)
    
    if(editedTask) {
      const editedTask = tasks.find(t => t.id === task.id)
      editedTask.text = task.text
      editedTask.descr = task.descr
      
      this.setState({
        tasks: tasks,
        editedTask: null
      })
    } else {
      task.id = lastTaskIndex + 1
      task.finished = false

      tasks.push(task)
      this.setState({
        tasks: tasks,
        lastTaskIndex: lastTaskIndex + 1,
      })
    }
    this.setState({showForm: false})
  }

  cancelHandler = () => {
    this.setState({
      showForm: false
    })
  }

  showFormHandler = () => {
    this.setState({
      showForm: true,
      clickedTask: null
    })
  }
}

export default Tasks

function Task(props) {
  const { task, showDetail, editHandler } = props
  
  return (
    <li onClick={() => showDetail(task)} 
        className="list-group-item">
          <div className="d-flex flex-row">
            <div className="flex-fill">
              {task.id+1}. {task.text}
            </div> 
            <button className="btn btn-secondary"
                    onClick={(event) => {
                      event.stopPropagation()
                      editHandler(task)
                    }}>Edit</button>
          </div>
    </li>
  )
}

function TaskDetail(props) {
  const { task, deleteHandler } = props
  return (
    <div className="card mt-5" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">{task.text}</h5>
        <p className="card-text">{task.descr}</p>
        <button className="btn btn-primary"
                onClick={() => deleteHandler()}>
          Delete</button>
      </div>
    </div>
  )
}

class TaskForm extends Component {
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
