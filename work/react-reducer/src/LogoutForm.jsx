import TodoContext from "./TodoContext";
import {useContext} from "react";

const LogoutForm = ({username}) => {
    const { onLogout } = useContext(TodoContext);

    return (
        <div className="logout">
            <form>
                <span>Login Username: {username}</span><br/>
                <button type="submit" onClick={() => onLogout()} >Logout</button>
            </form>
        </div>
    )

}

export default LogoutForm;