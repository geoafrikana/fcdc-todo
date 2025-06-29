import {useContext, useState} from 'react';
import {TodoContext} from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function TodoComponent({todo}) {
  const {todos, setTodos} = useContext(TodoContext);

  const deleteTodo = () => {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);
  }
  

  const editTodo = () => {
      const newTask = prompt("Edit task:", todo.task);
      const newDueDate = prompt("Edit due date:", todo.due);
      if (newTask && newDueDate) {
        todo.task = newTask;
        todo.due = newDueDate;
        setTodos([...todos]);
      
    }
  }

  return (
    
      <div className={`todo-item td-bg-${todo.priority}`} >
      <div className="todo-text">
      {todo.task} <br /> {todo.due}
      </div>

      <div className="todo-buttons">
      <FontAwesomeIcon
         className="edit-icon todo-modification-icon" 
         onClick={editTodo} icon={faPenToSquare} />
        
        <FontAwesomeIcon 
        onClick={deleteTodo} 
        className="todo-modification-icon delete-icon"
        icon={faTrash} />

      
    </div>
    </div>

     
      
  )
}

export default TodoComponent