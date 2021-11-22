function TodoList({todos}) {
    console.log("todos="+todos);


    const list = Object.values(todos).map( todo => `
      <li className="todo">
        <input type="checkbox">
        <span>{todo.task}</span>
        <button>Delete</button>
      </li>
    `).join('');



    return (<ul className="todos">456_{list}</ul>);
}

export default TodoList;