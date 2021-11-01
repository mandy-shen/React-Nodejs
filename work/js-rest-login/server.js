"use strict";

const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let people = {};
let sessions = {};

app.get('/api/v1/session', express.json(), (req, res) => {
    if (!sessions[req.cookies.sid]) {
        res.status(401).json({ error: `cookie not set`});
    } else {
        const username = sessions[req.cookies.sid];
        res.json(people[username]);
    }
});


app.post('/api/v1/session', express.json(), (req, res) => {
    const username = req.body.username;
    const letterRegex = /^[\w]+$/;
    const numberRegex = /^[\d]+$/;

    if (!username || username === 'dog' || username.match(numberRegex) || !username.match(letterRegex)) {
        res.status(400).json({ error: `${username} is invalid`});
    } else if (people[username]) {
        res.status(409).json({ error: `duplicate: ${username}`});
    } else {
        const sid = uuidv4();
        res.cookie('sid', sid);
        sessions[sid] = username;

        people[username] = {username: username, islogin: true};
        res.json(people[username]);
    }
});

app.delete('/api/v1/session', express.json(), (req, res) => {
    const username = sessions[req.cookies.sid];
    delete people[username];
    delete sessions[req.cookies.sid];
    res.clearCookie('sid');
    res.json();
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));