"use client"
import { useRef, useState } from "react"
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from "@/firestore";
import { addToDo } from "@/app/Store/ToDoSlice"
import { useDispatch } from 'react-redux'

const AddToDo = ()=>{
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()

  const addToDoToList = async (data ={})=>{
    try{
      const newAdded = await addDoc(collection(db, "todos"), data)
      if(!newAdded.id){
        console.error('error doc not added',newAdded)
        return
      }
      const newDoc = await getDoc(doc(db, "todos", newAdded.id))
      setDescription("")
      setTitle("")
      dispatch(addToDo({
        id:newDoc.id,
        ...newDoc.data()
      }))
      return newDoc
    }catch(err){
      console.log('error on add to do',err)
    }
  }
  

  return (
    <div className="border-2 border-grey-500 my-2 p-2">
      <form onSubmit={(e)=>{
          e.preventDefault()
          addToDoToList({
            title: title,
            description: description
          })
        }}>
        <label>
          title
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </label>
        <label>
          description
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </label>
        <button className="btn btn-blue">
        finish Add ToDo
        </button>
      </form>
    </div>
  )
}

export default AddToDo