"use strict";

const express = require('express');
const app = express();
const PORT = 3000;
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const loginWeb = require('./login-web');
const homeWeb = require('./home-web');
const game = require('./game');
const sessions = {};

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];

  if (!sid || !username) {
    res.clearCookie('sid');
    res.send(loginWeb.loginPage(!sid ? '' : 'invalid session'));
    return;
  }

  if (!game.games[username])
    game.newGame(username);

  res.send(homeWeb.homePage(game.games[username], ''));
});

app.post('/login', (req, res) => {
  const username = req.body.username.trim();

  const letterRegex = /^[\w]+$/;
  const numberRegex = /^[\d]+$/;

  if (!username || username === 'dog' || username.match(numberRegex) || !username.match(letterRegex)) {
    res.send(loginWeb.loginPage('invalid input=' + username));
    return;
  }

  const sid = uuidv4();
  res.cookie('sid', sid);
  sessions[sid] = username;

  res.redirect('/');
});

app.post('/logout', (req, res) => {
  delete sessions[req.cookies.sid];
  res.clearCookie('sid');

  res.redirect('/');
});

app.post('/new-game', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];

  if (!sid || !username) {
    res.redirect('/');
    return;
  }

  delete game.games[username];
  res.redirect('/');
});

app.post('/guess', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];

  if (!sid || !username) {
    res.redirect('/');
    return;
  }

  const guess = req.body.guessWd.trim();
  const currGame = game.games[username];

  if (!currGame.validWords.includes(guess)) {
    res.send(homeWeb.homePage(currGame, 'invalid input=' + guess));
    return;
  }

  game.guessWord(username, guess);
  res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
