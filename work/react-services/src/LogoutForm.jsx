const LogoutForm = ({onLogout}) => {

    return (
        <div className="logout">
            <form>
                <button type="submit" onClick={() => onLogout()} >Logout</button>
            </form>
        </div>
    )

}

export default LogoutForm;