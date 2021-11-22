function GuessForm({guess, setGuess, onGuess}) {
    return (<form>
        <label>
            <span>Please input a 5-letter word: </span>
            <input value={guess}
                   onInput={(e) => setGuess(e.target.value)}/>
        </label>
        <button type="button"
                onClick={() => onGuess(guess)}>Guess</button>
    </form>
    );
}
export default GuessForm;