"use client"
import { useRef } from "react"
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firestore"
import { updateToDo, deleteToDo } from "@/app/Store/ToDoSlice"
import { useSelector, useDispatch } from 'react-redux'

const EditToDo = ({id})=>{
  const {title, description} = useSelector(state=>state.toDos.find(toDo=>toDo.id===id))
  const titleRef = useRef(title)
  const descriptionRef = useRef(description)
  const dispatch = useDispatch()

  const editToDo = async (id,data ={})=>{
    try{
      const toDoRef = doc(db, "todos", id)
      await updateDoc(toDoRef, data)
      const newDoc = await getDoc(toDoRef)
      console.log('new doc',newDoc.data(), newDoc.id)
      dispatch(updateToDo({
        id:newDoc.id,
        ...newDoc.data()
      }))
      return newDoc
    }catch(err){
      console.log('error on add to do',err)
    }
  }
  
  const deleteToDoFromList = async (id)=>{
    try{
      const toDoRef = doc(db, "todos", id)
      await deleteDoc(toDoRef)
      dispatch(deleteToDo({
        id
      }))
    }catch(err){
      console.log('error on add to do',err)
    }
  }

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
        deleteToDoFromList(id)
      }}>
       delete ToDo
      </button>
    </div>
  )
}

export default EditToDo