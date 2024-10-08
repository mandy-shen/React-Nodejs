/*
 this file is for storing all user's names.
 */
const users = {};

function getUserData(username) {
  return users[username];
};

function addUserData(username, userData) {
  users[username] = userData;
};

module.exports = {
  getUserData,
  addUserData,
};
