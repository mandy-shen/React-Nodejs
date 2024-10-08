/*
 this file is for frontend Main render.
 file '.jsx' are marked as a file has HTML tags.
 */
import { useEffect, useReducer } from "react";
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

    // dispatch to reducer and store the state
    const [state, dispatch] = useReducer(reducer, initialState);

    // useEffect updates when the component renders.
    // When the page loads, it should check to see if the user is already logged in.
    useEffect(
        () => {

            fetchSession()
            .then(username => {

                fetchTodos()
                .then(todos => {

                    dispatch({
                        type: 'loadTodos',
                        todos: todos,
                        username: username,
                    });
                })
                .catch(err => {
                    console.error(err.error);
                });

            })
            .catch(err => {
                console.error(err.error);
            });

        }, []); // [] effect run one time

    // call login and change state
    const onLogin = (username) => {
        fetchLogin(username)
        .then(todos => {
            dispatch({
                type: 'login',
                username: username,
                todos: todos
            });
        })
        .catch(err => {
            console.error(err.error);
        });
    }

    // call logout and change state
    const onLogout = () => {
        fetchLogout()
        .then(() => {
            dispatch({
                type: 'logout'
            });
        })
        .catch(err => {
            console.error(err.error);
        });
    }

    // call AddTodo and change state
    const onAddTodo = (newTask) => {
        fetchAddTodo(newTask)
        .then((todo) => {
            dispatch({
                type: 'addTodo',
                todo: todo,
            });
        })
        .catch(err => {
            console.error(err.error);
        });
    }

    // call ToggleTodo and change state
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
            console.error(err.error);
        });
    }

    // call DeleteTodo and change state
    const onDeleteTodo = (id) => {
        fetchDeleteTodo(id)
        .then(() => {
            dispatch({
                type: 'deleteTodo',
                id: id,
            });
        })
        .catch(err => {
            console.error(err.error);
        });
    }

    // store above methods in to Context, so that other jsx file could get method from Context
    return (
        <div className="app">
            <TodoContext.Provider value={ {
                onLogin,
                onLogout,
                onAddTodo,
                onToggleTodo,
                onDeleteTodo
            } }>
                {!state.isLoggedIn
                    ? (<LoginForm></LoginForm>)

                    : (<div>
                            <LogoutForm username={state.username}></LogoutForm>
                            <TodoList todos={state.todos}></TodoList>
                            <TodoForm></TodoForm>
                        </div>
                    )}
            </TodoContext.Provider>
        </div>
    );
}

export default App;
