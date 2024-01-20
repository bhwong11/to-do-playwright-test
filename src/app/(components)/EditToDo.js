"use client"
import { useRef } from "react"
import { doc, updateDoc,setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "@/firestore";

const editToDo = async (id,data ={})=>{
  const toDoRef = doc(db, "todos", id)
  await updateDoc(toDoRef, data)
  const newDoc = await getDoc(toDoRef)
  console.log('new doc',newDoc.data())
  return newDoc
}

const deleteToDo = async (id)=>{
  const toDoRef = doc(db, "todos", id)
  await deleteDoc(toDoRef)
}

const EditToDo = ({id, title, description})=>{
  const titleRef = useRef(title)
  const descriptionRef = useRef(description)

  return (
    <div className="border-2 border-grey-500 my-2 p-2">
      <label>
        title
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e)=>titleRef.current=e.target.value}
          defaultValue={title}
        />
      </label>
      <label>
        description
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e)=>descriptionRef.current=e.target.value}
          defaultValue={description}
        />
      </label>
      <button className="btn btn-blue" onClick={()=>{
        editToDo(id,{
          title: titleRef.current,
          description: descriptionRef.current
        })
      }}>
       finish Edit ToDo
      </button>
      <button className="btn btn-red" onClick={()=>{
        deleteToDo(id)
      }}>
       delete ToDo
      </button>
    </div>
  )
}

export default EditToDo