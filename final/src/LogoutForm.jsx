/*
 this file is for frontend logoutform render.
 */
import TodoContext from "./TodoContext";
import {useContext} from "react";

const LogoutForm = ({username}) => {
    // get onLogout from TodoContext.Provider (Context)
    const { onLogout } = useContext(TodoContext);

    // every parameter are objects, transfer object to specific type
    const name = Object.values(username);

    return (
        <div className="form-panel">
            <form>
                <button type="submit" onClick={() => onLogout()} >Logout</button>
                <span> Login User: {name}</span>
            </form>
        </div>
    )

}

export default LogoutForm;