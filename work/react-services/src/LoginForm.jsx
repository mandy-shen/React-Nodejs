function LoginForm({username, setUsername, onLogin}) {
    return (
        <div className="login">
            <form action="#">
                <label>
                    <span>Username:</span>
                    <input value={username}
                           onInput={(e) => setUsername(e.target.value)}
                           className="login__username"/>
                </label>
                <button type="button"
                        onClick={() => onLogin(username)}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;