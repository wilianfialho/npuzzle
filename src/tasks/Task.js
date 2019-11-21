import React from 'react'

export default function Task(props) {
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