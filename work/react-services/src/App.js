import { useState, useEffect } from "react";

import './App.css';
import LoginForm from "./LoginForm";
import {fetchLogin} from "./services";

function App() {

    const [username, setUsername] = useState('');
    const onLogin = (username) => {
        fetchLogin(username);
    }


    return (
        <div className="app">
            <LoginForm
                username={username}
                setUsername={setUsername}
                onLogin={onLogin}>
            </LoginForm>
            <div className="content">

            </div>
            123
        </div>
    );
}

export default App;
