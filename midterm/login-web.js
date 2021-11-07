const loginWeb = {
  loginPage: function(errMsg) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Login</title>
        </head>
        <body>
          <div class="app">
            <div class="form-panel">
                ${loginWeb.getForm(errMsg)}
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getForm: function(errMsg) {
    return `
    <form action="/login" method="POST">
      <label for="username">User Name:</label> 
      <input type="text" id="username" name="username">
      <input type="submit" value="Submit">
    </form>
    <div class="error-panel">${errMsg==='' ? '': 'Error Message: '+errMsg}</div>`;
  },
};
module.exports = loginWeb;
