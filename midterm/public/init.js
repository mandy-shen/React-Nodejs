"use strict";

(function () {

    const login = document.querySelector('#login');
    const guess = document.querySelector('#guess');
    const baseForm =  login || guess;

    if (baseForm) {
        const inputEl = baseForm.querySelector('input');
        const buttonEl = baseForm.querySelector('button');

        buttonEl.disabled = !inputEl.value.trim();

        inputEl.addEventListener('input', () => {
            buttonEl.disabled = !inputEl.value.trim();
        });


        buttonEl.addEventListener('click', (e) => {
            const input = inputEl.value.trim();
            inputEl.value = input;

            const isValid = (login) ? isValidName(input) : isValidGuess(input);

            if (!isValid) {
                e.preventDefault();

                const error = document.querySelector('.error-panel');
                error.innerHTML = 'Error: invalid input = '+input;
            }
        });

    }

    function isValidGuess(guess) {
        let validWords = "";

        for (const li of document.querySelectorAll('#validWords>ul>li'))
            validWords += "," + li.textContent;

        return validWords.includes(guess);
    }

    function isValidName(name) {
        const letterRegex = /^[\w]+$/;
        const numberRegex = /^[\d]+$/;

        return !(!name || name === 'dog' || name.match(numberRegex) || !name.match(letterRegex));
    }

})();


