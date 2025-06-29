import {useContext} from 'react';
import TodoComponent from './TodoComponent';
import {TodoContext} from '../App';
import { ReactSortable } from "react-sortablejs";

function Todos() {
  const {todos, setTodos} = useContext(TodoContext);



  return (
      <ReactSortable list={todos} setList={setTodos}>
        {todos.map(todo => (
            <div key={todo.id}>
            <TodoComponent todo={todo} /> </div>            
        
        ))}
      </ReactSortable>
      
  )
}

export default Todos