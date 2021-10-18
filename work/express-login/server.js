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
  const regex = /^[\w\d]+$/;
  if (!username || username === 'dog' || !username.match(regex)) {
    res.status(401).send('this is a bad message');
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
  const word = req.body.word.trim();
  const sid = req.cookies.sid;
  const username = sessions[sid];

  data.users[username] = word;

  res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
