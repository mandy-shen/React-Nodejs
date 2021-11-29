import { useEffect, useReducer, useState } from "react";
import { reducer, initialState } from './reducer';
import TodoContext from './TodoContext';

import './App.css';

import {
    fetchLogin,
    fetchLogout,
    fetchSession,
    fetchAddTodo,
    fetchUpdateTodo,
    fetchDeleteTodo,
    fetchTodos,
} from "./services";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const onLogin = (username) => {
        fetchLogin(username)
        .then(todos => {
            dispatch({
                type: 'login',
                username: username,
            });
            dispatch({
                type: 'loadTodos',
                todos: todos,
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onLogout = () => {
        fetchLogout()
        .then(() => {
            dispatch({
                type: 'logout'
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onAddTodo = (newTask) => {
        fetchAddTodo(newTask)
        .then((todo) => {
            dispatch({
                type: 'addTodo',
                todo: todo,
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onToggleTodo = (id, task, done) => {
        const updateTodo = {
            id: id,
            task: task,
            done: done,
        }

        fetchUpdateTodo(id, updateTodo)
        .then(() => {
            dispatch({
                type: 'toggleTodo',
                id: id,
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onDeleteTodo = (id) => {
        fetchDeleteTodo(id)
        .then(() => {
            dispatch({
                type: 'deleteTodo',
                id: id,
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    return (
        <div className="app">
            <TodoContext.Provider value={ {
                onLogin,
                onLogout,
                onAddTodo,
                onToggleTodo,
                onDeleteTodo
            } }>
                {!state.username
                    ? (<LoginForm></LoginForm>)

                    : (<div className="content">
                            <LogoutForm></LogoutForm>
                            <TodoList todos={state.todos}></TodoList>
                            <TodoForm></TodoForm>
                        </div>
                    )}
            </TodoContext.Provider>
        </div>
    );
}

export default App;
