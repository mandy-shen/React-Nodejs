function TodoList({todos}) {
    console.log("todos="+todos);


    const list = Object.values(todos).map( todo => (
      <li className="todo">{todo.task}</li>
    ));



    return (<ul className="todos">{list}</ul>);
}

export default TodoList;