import React, { Component } from 'react'
import Task from './Task'
import TaskDetail from './TaskDetail'
import TaskForm from './TaskForm'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

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
    const { tasks, clickedTask, editedTask } = this.state
    const { history, match } = this.props;
    return (
      <div className="container">
        <h1 className="mb-5">My tasks:</h1>
        <div className="mb-5">
          <ul className="list-group mb-3">
            {tasks.map((t, i) => {
              return <Task key={i} 
                          task={t}
                          showDetail={this.showDetail}
                          editHandler={() => {
                            this.editHandler(t)
                            history.push(`${match.url}/form/${i}`)
                          }}
                          finishHandler={this.finishHandler}/>
            })}
          </ul>
          <button className="btn btn-primary float-right mb-5"
                  onClick={() => {
                    this.showFormHandler()
                    history.push(`${match.url}/form`)
                  }}>
            Add task
          </button>
        </div>
        <Switch>
          <Route path={`${match.url}/task-detail/:id`}>
            <TaskDetail task={clickedTask}
                        deleteHandler={this.deleteHandler} />
          </Route>
          <Route path={`${match.url}/form`}>
            <TaskForm editedTask={editedTask}
                      submitHandler={this.submitHandler}
                      cancelHandler={this.cancelHandler} />
          </Route>
          <Route path={`${match.url}/`}></Route>
        </Switch>
      </div>
    )
  }

  deleteHandler = () => {
    const { clickedTask, tasks } = this.state
    this.setState({
      tasks: tasks.filter((t) => t.id !== clickedTask.id),
      clickedTask: null
    })
  }

  finishHandler = (task) => {
    const { tasks } = this.state
    task.finished = true
    this.setState({
      tasks: tasks
    })
  }

  showDetail = (task) => {
    const { history, match } = this.props
    this.setState({
      clickedTask: task
    })
    history.push(`${match.url}/task-detail/${task.id}`)
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

      this.setState({
        tasks: [...tasks, task],
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

export default withRouter(Tasks)