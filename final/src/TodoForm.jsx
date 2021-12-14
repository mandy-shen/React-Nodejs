/*
 this file is for frontend create a new task todoform render.
 */
import { useState } from "react";
import TodoContext from "./TodoContext";
import {useContext} from "react";

const TodoForm = () => {
    // get onAddTodo from TodoContext.Provider (Context)
    const { onAddTodo } = useContext(TodoContext);

    const [task, setTask] = useState('');

    // onChange event to setTask state
    const handleChange = e => {
        setTask(e.target.value);  // use 'e.target.value'
    }

    // onClick event trigger onChange event and then call onAddTodo(task)
    const handleSubmit = e => {
        e.preventDefault();
        if (task) {
            handleChange(e, onAddTodo(task));
        }
    }

    return (
        <form className="form-panel">
            <label>New Task: </label>
            <input type="text" value={task} onChange={handleChange}/>
            <button type="submit" onClick={handleSubmit}>Add</button>
        </form>
    )

}

export default TodoForm;