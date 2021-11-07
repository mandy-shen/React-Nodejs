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
          <main id="app">
            <div class="top-panel">
                ${dataWeb.getLogoutBtn()}
                ${dataWeb.getNewGameBtn()}
            </div>
            <div class="form-panel">
                ${dataWeb.getGuessForm()}
            </div>
            <div class="display-panel">
                <div>Count: ${game.turns}</div>
                <div>Lastest Message: ${game.prevMsgs[0] || ''}</div>
                
                <div>Past Guessed Words (${game.prevMsgs.length}):
                    <ul>${dataWeb.getHistory(game.prevMsgs)}</ul>
                </div>
                <div id="validWords">Valid Words (${game.validWords.length}):
                    <ul>${dataWeb.getValidWords(game.validWords)}</ul>
                </div>
            </div>
          </main>
          <script src="init.js"></script>
        </body>
      </html>
  `;
  },

  getHistory: function(msgs) {
    return msgs.map((msg) => `<li>${msg}</li>`).join('');
  },

  getValidWords: function(words) {
    return words.map((word) => `<li>${word}</li>`).join('');
  },

  getGuessForm: function() {
    return `
    <form action="/guess" method="POST" id="guess">
      <label for="guessWord">Guess Word:</label> 
      <input type="text" name="guessWord">
      <button type="submit" form="guess">Submit</button>
    </form>
    <div class="error-panel"></div>`;
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
