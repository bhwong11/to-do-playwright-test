"use client"
import {db} from '@/firestore'
import { collection, query, getDocs } from "firebase/firestore"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToDo from '@/app/(components)/ToDo'
import AddToDo from '@/app/(components)/AddToDo'
import { UpdateAllToDos } from '@/app/Store/ToDoSlice'

const getAllToDos = async ()=>{
  const q = query(collection(db, "todos"))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return {
      id:doc.id,
      ...doc.data()
    }
  })
}

const List = () =>{
  const AllToDos = useSelector(state => state.toDos)
  const dispatch = useDispatch()

  useEffect(()=>{
    getAllToDos().then((data)=>{
      dispatch(UpdateAllToDos(data))
    })
  },[])
  return (
    <div>
      to do list
      {AllToDos.map((toDo)=>(
        <ToDo title={toDo.title} description={toDo.description} id={toDo.id}/>
      ))}
      <AddToDo/>
    </div>
  )
}

export default List