const words = require("./words");
const dataWeb = {
  dataPage: function(game) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Data</title>
        </head>
        <body>
          <div class="app">
            <div class="top-panel">
                ${dataWeb.getLogoutBtn()}
            </div>
            <div class="form-panel">
                ${dataWeb.getNewGameBtn()}
                ${dataWeb.getGuessForm()}
            </div>
            <div class="display-panel">
                <ul>${dataWeb.getHistory(game)}</ul>
                <ul>${dataWeb.getPossibleWords(words)}</ul>
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getHistory: function(game) {
    return game.prevMsgs.map((msg, index) => {
      return `<li>${msg}</li>`;
    }).join('');
  },

  getPossibleWords: function(words) {
    return words.map((word, index) => {
      return `<li>${word}</li>`;
    }).join('');
  },

  getGuessForm: function() {
    return `
    <form action="/guess" method="POST">
      <label for="guessWord">Guess Word:</label> 
      <input type="text" id="guessWord" name="guessWord" value="">
      <input type="submit" value="Submit">
    </form>`;
  },

  getNewGameBtn: function() {
    return `
    <form action="/new-game" method="POST">
      <input type="submit" value="New Game">
    </form>`;
  },

  getLogoutBtn: function() {
    return `
    <form action="/logout" method="POST">
      <input type="submit" value="Logout">
    </form>`;
  },
};
module.exports = dataWeb;
