require('dotenv').config();
env = process.env

const telegraf = require('telegraf')
const bot = new telegraf.Telegraf(env.APP_TOKEN)

bot.hears('start', ctx => {
    ctx.reply('Bot SAD')
})

bot.startPolling()