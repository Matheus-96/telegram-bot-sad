require('dotenv').config();
env = process.env

const telegraf = require('telegraf')
const bot = new telegraf.Telegraf(env.APP_TOKEN)

//
const metodos = require('./resources/metodos')


bot.action('quiz', (ctx) => {
    metodos.SetIsQuiz(false)
    metodos.UserQuiz(ctx)
})

/**
 * ##############################
 *  COMANDOS PARA text-to-speech
 * ##############################
 */

bot.action('talk', ctx => {
    ctx.editMessageText("<b>text-to-speech</b>\n\nNesta mini aplicação você pode digitar um texto no idioma selecionado e eu leio o que você me falou!\n\nSelecione um idioma:", {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard:
                [
                    [
                        { text: 'Português', callback_data: "PT" },
                        { text: 'Japonês', callback_data: "JP" },
                    ],
                    [
                        { text: "Voltar", callback_data: `SCREEN1` }
                    ]
                ]
        }
    }
    )
})

bot.action('PT', ctx => {
    metodos.SetLang("Vitoria")
    ctx.deleteMessage()
    ctx.replyWithHTML("<b>text-to-speech</b>\n\nIdioma selecionado: <b>PORTUGUÊS</b>. \n Pode digitar agora um texto para eu falar!")
})

bot.action('JP', ctx => {
    metodos.SetLang("Takumi")
    ctx.deleteMessage()
    ctx.replyWithHTML("<b>text-to-speech</b>\n\nIdioma selecionado: <b>JAPONÊS</b>. \n Pode digitar agora um texto para eu falar!")
})

/**
 * ##############################
 *  FIM text-to-speech
 * ##############################
 */


bot.action(/SCREEN(\d+)/, (ctx, next) => {
    metodos.SetSelector(ctx.match[1])
    metodos.ShowKeyboard(ctx)
})

bot.command('start', ctx => {
    metodos.SetSelector("0")
    metodos.ShowKeyboard(ctx)
})

bot.command('sing', async ctx => {
    await ctx.replyWithAudio({ url: "https://cdn.jsdelivr.net/gh/Matheus-96/telegram-bot-sad@main/resources/gatoTheme.mp3", filename: "Gato theme" })
    await ctx.reply("🎶 They call me gato \nI have metal joints 🎵")
    await ctx.reply("Beat me up 🎶\n🎵 And earn 15 silver points!")
})

bot.on('text', (ctx, next) => {
    if (metodos.GetLang()) 
        metodos.Text_to_speech(ctx)
    
    if (metodos.GetIsQuiz()) 
        metodos.EvaluateQuiz(ctx)
    
    next()

})

bot.launch()
