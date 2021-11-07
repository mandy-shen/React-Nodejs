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
          <main id="app">
            <div class="form-panel">
                ${loginWeb.getForm(errMsg)}
            </div>
          </main>
          <script src="init.js"></script>  
        </body>
      </html>
  `;
  },

  getForm: function(errMsg) {
    return `
    <form action="/login" method="POST" id="login">
      <label for="username">User Name:</label> 
      <input type="text" id="username" name="username">
      <button type="submit" form="login">Submit</button>
    </form>
    <div class="error-panel">${errMsg==='' ? '': 'Error: '+errMsg}</div>`;
  },
};
module.exports = loginWeb;
