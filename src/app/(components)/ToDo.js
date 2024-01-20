"use client"
import EditToDo from "./EditToDo"

const ToDo = ({id, title, description})=>{
  return (
    <div className="border-2 border-grey-500 my-2 p-2">
      <div>{title}</div>
      <p>{description}</p>
      <EditToDo id={id} title={title} description={description}/>
    </div>
  )
}

export default ToDo