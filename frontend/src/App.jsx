import { createContext, useEffect, useState } from 'react'
import './App.css'
import Todos from './components/Todos.jsx'
import AddTodo from './components/AddTodo.jsx'
import Signup from './components/Signup.jsx'

export const TodoContext = createContext()
function App() {
  const [todos, setTodos] = useState([]) 

  useEffect(()=>{
    let token = localStorage.getItem('token')
    
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:8000/todos?token=${token}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log(data)
        setTodos(data)
      } catch (error) {
        setTodos([])
        console.error('Error fetching todos:', error)
      }
    }

    fetchTodos()
  },[])


  return (
    <TodoContext.Provider value={{todos, setTodos}}>
     <div id="tasks-main">
         { todos.length > 0 ?<>
         <h2>My Todos</h2>
        <Todos />
        <AddTodo />
        </>
        : <Signup />}
        </div> 
    </TodoContext.Provider>
      
  )
}

export default App
