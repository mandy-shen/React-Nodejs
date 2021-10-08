const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      Object.values(chat.messages).map( message => `
      <li>
        <div class="message">
          <span class="message-sender">${message.sender}: </span>
          <span class="message-text">${message.text}</span>
        </div>
      </li>
      `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    return `<div class="form-panel">
    <form action="/chat" method="POST">
      <label for="username" class="message-sender">Mandy</label> 
      <input type="hidden" id="username" name="username" value="Mandy">

      <label for="text">sends text:</label><br>
      <input type="text" id="text" name="text"/>

      <input type="submit" value="Submit">
    </form>
    </div>`;
  }
};
module.exports = chatWeb;
