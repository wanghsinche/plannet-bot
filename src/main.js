const TelegramBot = require('node-telegram-bot-api');
const { login } = require('./login')
const { postMsg } = require('./post')
// replace the value below with the Telegram token you receive from @BotFather
const token = '1144867428:AAGSpB8TQLvaLf3ZuFr9bLa3Zr7IrSveEhw';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/post (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  postMsg(resp, (t)=>bot.sendMessage(chatId, t))
});

bot.onText(/\/login$/, (msg) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const chatId = msg.chat.id;
  
    // send back the matched "whatever" to the chat
    login((msg)=>bot.sendMessage(chatId, msg))
  });
  

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'use /login to login or use /post xxx to post msg');
});
