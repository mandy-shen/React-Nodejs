import { useState } from 'react';
import './App.css';
import Compare from "./Compare";

import GuessForm from "./GuessForm";
import Message from "./Message";


function App() {
    const [guess, setGuess] = useState('');
    const [isMatch, setIsMatch] = useState(true);
    const [msg, setMsg] = useState('');

    const onGuess = (guess) => {
        const {cnt, isMatch} = Compare({word:'RECAT', guess:guess});

        let msg;
        if (isMatch)
            msg = `${guess} is the secret word!`;
        else if (cnt <= 0)
            msg = `${guess} was not a valid word`;
        else
            msg = `${guess} had ${cnt} letters in common`;

        setIsMatch(isMatch);
        setMsg(msg);
        setGuess('');
    };

    return (
        <div className="app">
            <GuessForm
                guess={guess}
                setGuess={setGuess}
                onGuess={onGuess}>
            </GuessForm>
            <Message
                msg={msg}
                classname={isMatch ? "msg-match" : "msg-error"}>
            </Message>
        </div>
    );
}
export default App;
