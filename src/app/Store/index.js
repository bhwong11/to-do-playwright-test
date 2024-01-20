import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '@/app/Store/ToDoSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
})