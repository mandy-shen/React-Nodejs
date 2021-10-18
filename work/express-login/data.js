const users = {

};

const obj = {

};

function getUserWord(username) {
  if (!username)
    return;

  if (!users[username])
    users[username] = "";

  obj.username = username;
  obj.word = users[username];
}

const data = {
  users,
  obj,
  getUserWord,
};

module.exports = data;

