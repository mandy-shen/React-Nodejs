import { useState, useEffect } from "react";

import './App.css';
import LoginForm from "./LoginForm";
import {fetchLogin, fetchSession, fetchTodos} from "./services";
import TodoList from "./TodoList";

function App() {
    const [todos, setTodos] = useState({});
    const [username, setUsername] = useState('');
    const onLogin = (username) => {
        fetchLogin(username)
        .then(results => {
            console.log(results);
            setTodos(results);
        });
    }


    //
    // fetchSession()
    // .then(results => {
    //     setUser(results);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    //
    // useEffect(() => {
    //     fetchTodos()
    //     .then( results => {
    //         setTodos(results);
    //     })
    //     .catch( err => {
    //         console.log(err);
    //     });
    // }, [setUser]
    // );





    return (
        <div className="app">
            <LoginForm
                username={username}
                setUsername={setUsername}
                onLogin={onLogin}>
            </LoginForm>
            <div className="content">
                <TodoList todos={todos}>
                </TodoList>
            </div>
            123
        </div>
    );
}

export default App;
