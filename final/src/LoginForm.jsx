/*
 this file is for frontend loginform render.
 */
import { useState } from "react";
import TodoContext from "./TodoContext";
import {useContext} from "react";

const LoginForm = () => {

    // get onLogin from TodoContext.Provider (Context)
    const { onLogin } = useContext(TodoContext);

    const [user, setUser] = useState('');

    // onChange event to setUser state
    const handleChange = e => {
        setUser(e.target.value); // use 'e.target.value'
    }

    // onClick event trigger onChange event and then call onLogin(user)
    const handleSubmit = e => {
        e.preventDefault(); // prevent default action
        if (user) {
            handleChange(e, onLogin(user));
        }
    }

    return (
        <div className="form-panel">
        <form>
            <label>Username: </label>
            <input type="text" value={user} name="username" onChange={handleChange} />
            <button type="submit" onClick={handleSubmit} >Login</button>
        </form>
        </div>
    )

}

export default LoginForm;