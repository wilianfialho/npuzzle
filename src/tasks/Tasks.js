import React, { Component } from 'react'
import Task from './Task'
import TaskDetail from './TaskDetail'
import TaskForm from './TaskForm'

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