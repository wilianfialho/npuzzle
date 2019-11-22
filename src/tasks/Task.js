import React from 'react'

export default function Task(props) {
  const { task, showDetail, editHandler, finishHandler } = props
  
  return (
    <li onClick={() => showDetail(task)} 
        className={'list-group-item ' + (task.finished ? 'list-group-item-success' : '')}>
          <div className="d-flex flex-row">
            <div className="flex-fill">
              {task.id+1}. {task.text}
            </div> 
            {displayFinishButton(task, finishHandler)}
            <button className="btn btn-secondary"
                    onClick={(event) => {
                      event.stopPropagation()
                      editHandler(task)
                    }}>Edit</button>
          </div>
    </li>
  )
}

function displayFinishButton(task, finishHandler) {
  if(!task.finished) return (
  <button className="btn btn-primary mr-2"
                    onClick={(event) => {
                      event.stopPropagation()
                      finishHandler(task)
                    }}>Finish</button>
  )
  return null
}