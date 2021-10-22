const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sessions = {};
const loginWeb = require('./login-web');
const data = require('./data');
const dataWeb = require('./data-web');

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];

  if(!sid || !username) {
    res.clearCookie('sid');
    res.send(loginWeb.loginPage());
    return;
  }

  data.getUserWord(username);
  res.send(dataWeb.dataPage(data));
});

app.post('/login', (req, res) => {
  const username = req.body.username.trim();
  const letterRegex = /^[\w]+$/;
  const numberRegex = /^[\d]+$/;
  if (!username || username === 'dog' || username.match(numberRegex) || !username.match(letterRegex)) {
    res.status(401)
        .send('This is a bad input. Please go back to <a href="http://localhost:3000/">home page</a>.');
    return;
  }

  const sid = uuidv4();
  res.cookie('sid', sid);
  sessions[sid] = username;

  res.redirect('/');
});

app.get('/logout', (req, res) => {
  delete sessions[req.cookies.sid];
  res.clearCookie('sid');
  res.redirect('/');
});

app.post('/changeWord', (req, res) => {
  const newWord = req.body.word.trim();
  const sid = req.cookies.sid;
  const username = sessions[sid];

  const originalWord = data.users[username];
  data.users[username] = newWord;

  if (originalWord)
    console.log(`[INFO][ChangeWord] username: ${username}, original_word: ${originalWord}, new_word: ${newWord}`);

  res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
