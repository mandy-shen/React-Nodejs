import { useState } from "react";

const TodoForm = ({onAddTodo}) => {

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