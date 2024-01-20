"use client"
import {db} from '@/firestore'
import { collection, query, where, getDocs } from "firebase/firestore"
import { useEffect,useState } from 'react'
import ToDo from '@/app/(components)/ToDo'
import AddToDo from '../(components)/AddToDo'

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
  const [toDos,setToDos] = useState([])
  useEffect(()=>{
    getAllToDos().then((data)=>{
      setToDos(data)
    })
  },[])
  return (
    <div>
      to do list
      {JSON.stringify(toDos)}
      {toDos.map((toDo)=>(
        <ToDo title={toDo.title} description={toDo.description} id={toDo.id}/>
      ))}
      <AddToDo/>
    </div>
  )
}

export default List