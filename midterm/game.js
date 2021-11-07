const words = require("./words");
const games = {};

function newGame(username) {
    const game = {
        username: username,
        word: pickWord(words),
        prevMsgs: [],
        turns: 0
    };
    games[username] = game;
    console.log(`[INFO][newGame] username: ${username}, secretWord: ${game.word}`);
    return game;
}

function takeTurn(username, guess) {
    if(!guess)
        return;

    const game = games[username] || newGame(username);

    game.turns++;

    if(exactMatch(game.word, guess)) {
        game.prevMsgs.push(`CORRECT!  You won in ${game.turns} turns!`);
        return;
    }

    const match = compare(game.word, guess);
    game.prevMsgs.push(`<b>${username}</b> => guess: <b>${guess}</b>; match: <b>${match}/${game.word.length}</b> letters`);
}

function exactMatch(word, guess) {
    return word.toUpperCase() === guess.toUpperCase(); // Case-insensitive compare
}

function pickWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function compare(word, guess) {
    if (!word || !guess)
        return 0;

    const newWord = word.toLowerCase();
    const newGuess = guess.toLowerCase();

    const arr = new Array(256);
    arr.fill(0);

    for (const i in newWord) {
        const code = newWord.charCodeAt(i);
        arr[code]++;
    }

    let cnt = 0;
    for (const i in newGuess) {
        const code = newGuess.charCodeAt(i);
        if (arr[code] > 0) {
            cnt++;
            arr[code]--;
        }
    }

    return cnt;
}

const game = {
    games,
    newGame,
    takeTurn,
};

module.exports = game;