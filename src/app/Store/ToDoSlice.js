import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'toDos',
  initialState: [],
  reducers: {
    addToDo:(state, action)=> {
      state.push({
        ...action.payload
      })
    },
    updateToDo:(state, action)=>  {
      return state.map(toDo=>(
        toDo.id === action.payload.id?({
          ...toDo,
          ...action.payload
        }):toDo
      ))
    },
    deleteToDo:(state, action)=>  {
      return state.filter(toDo=>(
        toDo.id !== action.payload.id
      ))
    },
    UpdateAllToDos:(_, action)=> {
      return action.payload
    }
  }
})

export const { addToDo, UpdateAllToDos, updateToDo, deleteToDo } = todosSlice.actions
export default todosSlice.reducer