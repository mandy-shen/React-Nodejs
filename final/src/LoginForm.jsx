import { useState } from "react";
import TodoContext from "./TodoContext";
import {useContext} from "react";

const LoginForm = () => {
    const { onLogin } = useContext(TodoContext);

    const [user, setUser] = useState('');

    const handleChange = e => {
        setUser(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (user) {
            handleChange(e, onLogin(user));
        }
    }

    return (
        <div className="login">
        <form>
            <label>Username: </label>
            <input type="text" value={user} name="username" onChange={handleChange} />
            <button type="submit" onClick={handleSubmit} >Login</button>
        </form>
        </div>
    )

}

export default LoginForm;