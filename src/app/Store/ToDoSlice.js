import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    UpdateAllToDos(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { todoAdded, UpdateAllToDos } = todosSlice.actions
export default todosSlice.reducer