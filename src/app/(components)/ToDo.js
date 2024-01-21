"use client"
import EditToDo from "./EditToDo"
import { useSelector } from "react-redux"
import { useState } from "react"

const ToDo = ({id})=>{
  const {title, description} = useSelector(state=>state.toDos.find(toDo=>toDo.id===id))
  const [showEdit,setShowEdit]= useState(false)

  return (
    <div className="border-2 border-grey-500 my-2 p-2">
      <div>{title}</div>
      <p>{description}</p>
      <button className="link" onClick={()=>setShowEdit(prev=>!prev)}>
        {showEdit?"hide edit":"show edit"}
      </button>
      {showEdit && <EditToDo id={id} title={title} description={description}/>}
    </div>
  )
}

export default ToDo