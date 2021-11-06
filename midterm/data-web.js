const dataWeb = {
  dataPage: function(data) {
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
                <a href="http://localhost:3000/logout">Logout</a>
            </div><br/>
            <div class="display-panel">
                ${dataWeb.getWord(data.obj)}
            </div>
            <div class="form-panel">
                ${dataWeb.getForm(data.obj)}
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getWord: function(obj) {
    if (obj.username && obj.word)
      return `<span>${obj.username}: ${obj.word}</span>`;

    return `<span>${obj.username}: (No data)</span>`;
  },

  getForm: function(obj) {
    return `
    <form action="/changeWord" method="POST">
      <label for="word">Stored Word:</label> 
      <input type="text" id="word" name="word" value="${obj.word}">
      <input type="submit" value="Submit">
    </form>`;
  },
};
module.exports = dataWeb;
