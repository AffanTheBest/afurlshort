const axios = require("axios");
const { token } = require("../config");
const validUrl = require("valid-url");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(token);
const fs = require('fs');

<<<<<<< HEAD
const unshort = (url) => {
      const promise = axios.get(url);
      const dataPromise = promise.then((res) => res);
      return dataPromise;
   
=======
const unshort = (message, chatId, username) => {
  const url = message.split(" ").slice(1)[0];
  if (validUrl.isUri(url)) {
    axios
      .get(url)
      .then((res) => {
        const longUrl = res.request.res.responseUrl;
        bot.telegram.sendMessage(
          chatId,
          `Here's the extracted link : \n👉 ${longUrl} \n\n${username ? '@'+username : "" }`,
          {
            reply_markup: {
              inline_keyboard: [[{ text: "Extracted URL", url: longUrl }]],
              force_reply: true,
            },
          }
        );
      })
      .catch((err) => {
        console.log(err)
        const longUrl = err.request._options.href || err.request._currentUrl;
        if (longUrl) {
          bot.telegram.sendMessage(
            chatId,
            `Here's the extracted link : \n👉 ${longUrl} \n\n${username ? '@'+username : "" }`,
            {
              reply_markup: {
                inline_keyboard: [[{ text: "Extracted URL", url: longUrl }]],
                force_reply: true,
              },
            }
          );
        } else {
          ctx.replyWithMarkdown("Link is invalid");
        }
      });
  } else {
    console.log(
      "An error has been occurred , Either the URL you sent is invalid or not a URL."
    );
>>>>>>> parent of 0ce1222 (Now bot will send links by replying to the message.)
  }

module.exports = unshort;
