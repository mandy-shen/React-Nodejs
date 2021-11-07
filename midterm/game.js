const words = require("./words");
const games = {};

function newGame(username) {
    if (!username)
        return;

    const game = {
        username: username,
        validWords: words,
        word: pickWord(words),
        prevMsgs: [],
        cnt: 0,
        isFinished: false,
    };

    games[username] = game;

    console.log(`[INFO][newGame] username: ${username}, secretWord: ${game.word}`);

    return game;
}

function takeTurn(username, guess) {
    if (!username || !guess)
        return;

    const game = games[username] || newGame(username);

    if (game.isFinished)
        return;

    game.cnt++;

    if (exactMatch(game.word, guess)) {
        game.isFinished = true;
        game.prevMsgs.unshift(`CORRECT! Won in ${game.cnt} turns! secretWord: ${game.word}`);
        return;
    }

    const index = game.validWords.indexOf(guess);
    if (index > -1) {
        game.validWords.splice(index, 1);
    }

    const match = compare(game.word, guess);
    game.prevMsgs.unshift(`<b>${guess}</b>, matched: <b>${match}/${game.word.length}</b> letters, turn: ${game.cnt}`);
}

function exactMatch(word, guess) {
    return word.toUpperCase() === guess.toUpperCase();
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