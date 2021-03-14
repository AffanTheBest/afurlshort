const fetchUrl = require('fetch').fetchUrl;
const validator = require('validator');

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const key = process.env.API_KEY;
bot.start((ctx) => ctx.reply('Welcome!, Send an url to get shorten!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('text', (ctx) => {
    if(validator.isURL(ctx.message.text)){
        fetchUrl(`http://cutt.ly/api/api.php?key=${key}&short=${ctx.message.text}` , (err , res , body) => {
        var realData = JSON.parse(body);
        ctx.reply(realData.url.shortLink);
    })}else{
        ctx.reply('Please send a valid URL !');
    }
})

bot.hears('hello' , (ctx) => ctx.reply(ctx.message.text))
bot.on('text', (ctx) => ctx.reply(`Hello ${ctx.state.role}`))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
