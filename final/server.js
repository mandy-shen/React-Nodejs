/*
 this file is for backend server's REST APIs.
 start from ./api/ in order to distinguish frontend url path.
 */
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// store data
const todos = require('./todos');
const sessions = require('./sessions');
const users = require('./users');

// cookie library
app.use(cookieParser());
// To serve static files such as images, CSS files, and JavaScript files
app.use(express.static('./build'));
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// get username from session to verify login
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    // 401 Unauthorized
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

// post session to login, reject username dog to login
app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!username) {
    // 400 Bad Request
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username === 'dog') {
    // 403 Forbidden
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, todos.makeTodoList());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getTodos());
});

// delete session for logout
app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

// get all todos to list
app.get('/api/todos', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getTodos());
});

// create todos
app.post('/api/todos', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { task } = req.body;
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  const todoList = users.getUserData(username);
  const id = todoList.addTodo(task);
  res.json(todoList.getTodo(id));
});

// get a specific id of a todoTask
app.get('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  if(!todoList.contains(id)) {
    // 404 not found
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(todoList.getTodo(id));
});

// update a specific id of a todoTask
app.put('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  const { task, done=false } = req.body;
  // Full Replacement required for a PUT
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { task, done });
  res.json(todoList.getTodo(id));
});

// patch a specific id of a todoTask
app.patch('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { task, done } = req.body;
  const todoList = users.getUserData(username);
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { task, done });
  res.json(todoList.getTodo(id));
});

// delete a specific id of a todoTask
app.delete('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const todoList = users.getUserData(username);
  const exists = todoList.contains(id);
  if(exists) {
    todoList.deleteTodo(id);
  }
  res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

