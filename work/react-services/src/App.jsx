import { useState } from "react";

import './App.css';

import {
    fetchLogin,
    fetchLogout,
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
    const [todos, setTodos] = useState({});

    const onLogin = (username) => {
        fetchLogin(username)
        .then(results => {
            console.log(results);
            setTodos(results);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onLogout = () => {
        fetchLogout()
        .then(results => {
            console.log(results);

        })
        .catch(err => {
            console.log(err);
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
            }).catch();
        })
        .catch(err => {
            console.log(err);
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
                }).catch();
        })
        .catch(err => {
            console.log(err);
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
                }).catch();
        })
        .catch(err => {
            console.log(err);
        });
    }


    return (
        <div className="app">
            <LoginForm onLogin={onLogin}></LoginForm>
            <LogoutForm onLogout={onLogout}></LogoutForm>
            <div className="content">
                <TodoList todos={todos}
                          onUpdateTodo={onUpdateTodo}
                          onDeleteTodo={onDeleteTodo}></TodoList>
                <TodoForm onAddTodo={onAddTodo}></TodoForm>
            </div>
        </div>
    );
}

export default App;
