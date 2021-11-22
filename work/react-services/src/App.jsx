import {useEffect, useState} from "react";

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

    const [user, setUser] = useState('');
    const [todos, setTodos] = useState({});

    const checkLogin = () => {
        fetchSession()
        .then(username => {
            setUser(username || '');
        })
        .catch(err => {
            console.error(err);
        });
    }

    const checkTodos = () => {
        fetchTodos()
        .then(todos => {
            setTodos(todos || '');
        })
        .catch(err => {
            console.error(err);
        });
    }

    useEffect(
        () => console.log('effect!!!'),
        [checkLogin, checkTodos]
    );



    const onLogin = (username) => {
        fetchLogin(username)
        .then(results => {
            setTodos(results);
            setUser(username);
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onLogout = () => {
        fetchLogout()
        .then(() => {
            setTodos('');
            setUser('');
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onAddTodo = (newTask) => {
        fetchAddTodo(newTask)
        .then(() => {
            checkTodos();
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onUpdateTodo = (id, task, done) => {

        const updateTodo = {
            id: id,
            task: task,
            done: done,
        }

        fetchUpdateTodo(id, updateTodo)
        .then(() => {
            checkTodos();
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onDeleteTodo = (id) => {
        fetchDeleteTodo(id)
        .then(() => {
            checkTodos();
        })
        .catch(err => {
            console.error(err);
        });
    }


    return (
        <div className="app">
            {!user
                ? (<LoginForm onLogin={onLogin}></LoginForm>)

                : (<div className="content">
                    <LogoutForm onLogout={onLogout}></LogoutForm>
                    <TodoList todos={todos}
                              onUpdateTodo={onUpdateTodo}
                              onDeleteTodo={onDeleteTodo}></TodoList>
                    <TodoForm onAddTodo={onAddTodo}></TodoForm>
                </div>
            )}
        </div>
    );
}

export default App;
