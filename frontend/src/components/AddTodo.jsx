import {useContext} from 'react';
import {TodoContext} from '../App';

function AddTodo() {
    const {setTodos} = useContext(TodoContext);

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const task = form.querySelector('input[type="text"]').value;
        const dueDate = form.querySelector('input[type="date"]').value;
        const taskPriority = form.querySelector('select[id="priority"]').value;
        console.log(taskPriority);
        if (task && dueDate) {
            setTodos(prevTodos => [
                ...prevTodos,
                { id: prevTodos.length + 1,
                    task, due: dueDate,
                "priority": taskPriority }
            ]);
        } else {
            alert('Please fill in both fields.');
        }
    }

  return (
    <>
    <h3>Add New Todo</h3>
      <form id="add-task" onSubmit={handleSubmit}>
        <label htmlFor="task">Todo Title</label>
        <input type="text" placeholder="Add new task" />
        <label htmlFor="due-date">Due Date</label>
        <input type="date" />
        <label htmlFor="priority">Todo Priority</label>
        <select name="priority" id="priority">
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
        </select>
        <input type="submit" value="Add Task" />
      </form>
    </>
      
  )
}

export default AddTodo