import TodoContext from "./TodoContext";
import {useContext} from "react";

const LogoutForm = () => {
    const { onLogout } = useContext(TodoContext);

    return (
        <div className="logout">
            <form>
                <button type="submit" onClick={() => onLogout()} >Logout</button>
            </form>
        </div>
    )

}

export default LogoutForm;