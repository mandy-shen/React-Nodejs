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
const dataWeb = require('./data-web');
const game = require('./game');
const sessions = {};

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];

  if(!sid || !username) {
    res.clearCookie('sid');
    res.send(loginWeb.loginPage(!sid ? '' : 'invalid session'));
    return;
  }

  if (!game.games[username])
    game.newGame(username);

  res.send(dataWeb.dataPage(game.games[username]));
});

app.post('/login', (req, res) => {
  const username = req.body.username.trim();
  const letterRegex = /^[\w]+$/;
  const numberRegex = /^[\d]+$/;

  if (!username || username === 'dog' || username.match(numberRegex) || !username.match(letterRegex)) {
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

  game.newGame(username);
  res.redirect('/');
});

app.post('/guess', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];

  const guess = req.body.guessWord;
  game.takeTurn(username, guess);
  res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
