/*
 this file is for frontend React useReducer.
 store the common variables to change each methods' states.
 file '.js' are marked as a file only has js code.
 */
export const initialState = {
    isLoaded: false,
    isLoggedIn: false,
    username: '',
    todos: {},
};

export function reducer( state, action ) {
    switch(action.type) {
        case 'loadTodos':
            return {
                ...state,
                isLoaded: true,
                todos: action.todos,
                isLoggedIn: true,
                username: action.username,
            };
        case 'logout':
            return { ...state, isLoaded: false, isLoggedIn: false, username: '', todos: {} };
        case 'login':
            return { ...state, isLoggedIn: true, username: action.username, todos: action.todos };
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