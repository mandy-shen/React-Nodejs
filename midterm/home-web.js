const homeWeb = {
  homePage: function(game, errMsg) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="style.css">
          <title>HomePage</title>
        </head>
        <body>
          <main id="app">
            <div class="top-panel">
                ${homeWeb.getLogoutBtn()}
            </div>
            <div class="form-panel">
                ${homeWeb.getGuessForm(game)}
                ${homeWeb.getNewGameBtn()}
                <div class="error-panel">${errMsg==='' ? '': 'Error: '+errMsg}</div>
            </div>
            <div class="display-panel">
                <div>Count: ${game.cnt}</div>
                <div>Lastest Message: ${game.prevMsgs[0] || ''}</div>
                <section>
                    <h3>Past Guessed Words (${game.prevMsgs.length}):</h3>
                    <ul>${homeWeb.getHistory(game.prevMsgs)}</ul>
                </section>
                <section id="validWords">
                    <h3>Valid Words (${game.validWords.length}):</h3>
                    <ul>${homeWeb.getValidWords(game.validWords)}</ul>
                </section>
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

  getGuessForm: function(game) {
    if (game.isFinished)
      return ``;

    return `
    <form action="/guess" method="POST" id="guess">
      <label for="guessWd">Guess Word:</label> 
      <input type="text" name="guessWd" id="guessWd">
      <button type="submit" form="guess">Submit</button>
    </form>
    `;
  },

  getNewGameBtn: function() {
    return `
    <form action="/new-game" method="POST">
      <button type="submit">New Game</button>
    </form>`;
  },

  getLogoutBtn: function() {
    return `
    <form action="/logout" method="POST">
      <button type="submit">Logout</button>
    </form>`;
  },
};
module.exports = homeWeb;
