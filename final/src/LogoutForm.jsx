import TodoContext from "./TodoContext";
import {useContext} from "react";

const LogoutForm = ({username}) => {
    const { onLogout } = useContext(TodoContext);

    const name = Object.values(username);

    return (
        <div className="logout">
            <form>
                <span>Login Username: {name}</span><br/>
                <button type="submit" onClick={() => onLogout()} >Logout</button>
            </form>
        </div>
    )

}

export default LogoutForm;