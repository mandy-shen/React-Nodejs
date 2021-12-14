/*
 this file is for frontend create a new task todoform render.
 */
import { useState } from "react";
import TodoContext from "./TodoContext";
import {useContext} from "react";

const TodoForm = () => {
    const { onAddTodo } = useContext(TodoContext);

    const [task, setTask] = useState('');

    const handleChange = e => {
        setTask(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (task) {
            handleChange(e, onAddTodo(task));
        }
    }

    return (
        <form>
            <label>New Task: </label>
            <input className="to-add" type="text" value={task} onChange={handleChange}/>
            <button className="add" type="submit" onClick={handleSubmit}>Add</button>
        </form>
    )

}

export default TodoForm;