"use client"
import {db} from '@/firestore'
import { collection, query, getDocs } from "firebase/firestore"
import { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToDo from '@/app/(components)/ToDo'
import AddToDo from '@/app/(components)/AddToDo'
import { UpdateAllToDos } from '@/app/Store/ToDoSlice'

const getAllToDos = async ()=>{
  const q = query(collection(db, "todos"))
  const querySnapshot = await getDocs(q);
  console.log('quer',querySnapshot, typeof querySnapshot)
  return querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('doc data1',doc.id);
    console.log('doc data',doc.data());
    return {
      id:doc.id,
      ...doc.data()
    }
  })
}

const List = () =>{
  const AllToDos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [toDos,setToDos] = useState([])
  console.log('ALL TO DOS',AllToDos)

  useEffect(()=>{
    getAllToDos().then((data)=>{
      // setToDos(data)
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