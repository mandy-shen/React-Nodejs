import TodoContext from "./TodoContext";
import {useContext} from "react";

function TodoList({todos}) {
    const { onToggleTodo, onDeleteTodo } = useContext(TodoContext);

    const list = Object.values(todos).map( todo => (
      <li className="todo" key={todo.id}>
          <input type="checkbox"
                 className="todo__toggle"
                 checked={todo.done}
                 onChange={() => onToggleTodo(todo.id, todo.task, !todo.done)}/>
          <span className={`${todo.done ? 'todo__text--complete': ''}`}>{todo.task}</span>
          <button className="todo__delete"
                  onClick={() => onDeleteTodo(todo.id)}>&#10060;</button>
      </li>
    ));

    return (<ul className="todos">{list}</ul>);
}

export default TodoList;