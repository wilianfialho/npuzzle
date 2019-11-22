import React from 'react'

export default function TaskDetail(props) {
  const { task, deleteHandler } = props
  return (
    <div className="card mt-5" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">{task ? task.text : ''}</h5>
        <p className="card-text">{task ? task.descr : ''}</p>
        <button className="btn btn-primary"
                onClick={() => deleteHandler()}>
          Delete</button>
      </div>
    </div>
  )
}