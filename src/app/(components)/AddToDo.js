"use client"
import { useRef } from "react"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/firestore";

const addToDo = async (data ={})=>{
  const newDoc = await addDoc(collection(db, "todos"), data)
  console.log('new doc',newDoc)
  return newDoc
}

const AddToDo = ()=>{
  const titleRef = useRef("")
  const descriptionRef = useRef("")

  return (
    <div className="border-2 border-grey-500 my-2 p-2">
      <label>
        title
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e)=>titleRef.current=e.target.value}
        />
      </label>
      <label>
        description
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e)=>descriptionRef.current=e.target.value}
        />
      </label>
      <button className="btn btn-blue" onClick={()=>{
        addToDo({
          title: titleRef.current,
          description: descriptionRef.current
        })
      }}>
       finish Add ToDo
      </button>
    </div>
  )
}

export default AddToDo