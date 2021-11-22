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

    const trigger1 = user === '';

    useEffect(() => console.log('effect!!!'), [trigger1]);

    if (user) {
        fetchSession()
        .then(results => {
            console.log(results);
            setUser(results);
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onLogin = (username) => {
        fetchLogin(username)
        .then(results => {
            console.log(results);
            setTodos(results);
            setUser(username);
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onLogout = () => {
        fetchLogout()
        .then(results => {
            console.log(results);
            setUser('');
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onAddTodo = (newTask) => {
        fetchAddTodo(newTask)
        .then(results => {
            console.log(results);

            fetchTodos()
            .then(todos =>{
                console.log("res_todos="+ todos);
                setTodos(todos);
            })
            .catch(err => {
                console.error(err);
            });;
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onUpdateTodo = (id, task, done) => {

        console.log("id="+id+",task="+task+",done="+done);

        const todo = {
            id: id,
            task: task,
            done: done,
        }

        fetchUpdateTodo(id, todo)
        .then(results => {
            console.log(results);

            fetchTodos()
            .then(todos =>{
                console.log("res_todos="+ todos);
                setTodos(todos);
            })
            .catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    const onDeleteTodo = (id) => {
        fetchDeleteTodo(id)
        .then(results => {
            console.log(results);

            fetchTodos()
            .then(todos =>{
                console.log("res_todos="+ todos);
                setTodos(todos);
            })
            .catch(err => {
                console.error(err);
            });
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
