const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ sender, text }) {
  if (!sender || !text)
    return;

  console.log(`sender: ${sender}, text: ${text}`);

  if (!users[sender])
    users[sender] = sender;

  messages.push({
    sender: sender,
    text: text,
  });
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

