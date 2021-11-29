export const initialState = {
    isLoaded: false,
    isLoggedIn: false,
    todos: {},
};

export function reducer( state, action ) {
    switch(action.type) {
        case 'loadTodos':
            return {
                ...state,
                isLoaded: true,
                todos: action.todos,
            };
        case 'logout':
            return { ...state, isLoaded: false, isLoggedIn: false, username: '', todos: {} };
        case 'login':
            return { ...state, isLoggedIn: true, username: action.username };
        case 'addTodo':
            return {
                ...state,
                todos: {
                    ...state.todos,
                    ...{[action.todo.id]: action.todo},
                },
            };
        case 'deleteTodo':
            const newTodo = {...state.todos};
            delete newTodo[action.id];
            return {
                ...state,
                todos: {
                    ...newTodo,
                },
            };
        case 'toggleTodo':
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.id]: {
                        ...state.todos[action.id],
                        done: !state.todos[action.id].done,
                    }
                },
            };
        default:
            return state;
    }
}