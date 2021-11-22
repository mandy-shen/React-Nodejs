function TodoList({todos}) {
    const list = [];
    console.log("todos="+todos);
    for (let i = 0; i < todos.length; i++) {
        list.push(`<li className="todo">todos[i]</li>`);
    }

    return (<ul className="todos">{todos}</ul>);
}

export default TodoList;