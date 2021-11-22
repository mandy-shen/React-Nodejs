import { useState } from "react";

import './App.css';
import LoginForm from "./LoginForm";
import {fetchAddTodo, fetchDeleteTodo, fetchLogin, fetchTodos, fetchUpdateTodo} from "./services";
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

    // fetchSession()
    // .then(results => {
    //     setUsername(results);
    // })
    // .catch(err => {
    //     console.log(err);
    // });

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
