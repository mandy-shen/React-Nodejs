

function TodoList({todos, onUpdateTodo, onDeleteTodo}) {

    const list = Object.values(todos).map( todo => (
      <li className="todo" key={todo.id}>
          <input type="checkbox"
                 className="todo__toggle"
                 checked={todo.done}
                 onChange={() => onUpdateTodo(todo.id, todo.task, !todo.done)}/>
          <span>{todo.task}</span>
          <button className="todo__delete"
                  onClick={() => onDeleteTodo(todo.id)}>&#10060;</button>
      </li>
    ));

    return (<ul className="todos">{list}</ul>);
}

export default TodoList;