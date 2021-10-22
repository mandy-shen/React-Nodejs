const loginWeb = {
  loginPage: function() {
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
                ${loginWeb.getForm()}
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getForm: function() {
    return `
    <form action="/login" method="POST">
      <label for="username">User Name:</label> 
      <input type="text" id="username" name="username">
      <input type="submit" value="Submit">
    </form>`;
  }
};
module.exports = loginWeb;
