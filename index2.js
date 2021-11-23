require('dotenv').config();
env = process.env

const telegraf = require('telegraf')
const axios = require('axios');
const bot = new telegraf.Telegraf(env.APP_TOKEN)

//Variaveis de controle
// const gatoTheme = require('./resources/gatoTheme.mp3')
const mainMenuKeyboards = require('./keyboards/main-menu-kb');
let SELECTOR = '0'
let lang = ""

const GetAudio = async (text) => {
    text = text.replaceAll(" ", '+')
    let res = await axios.post("https://ttsmp3.com/makemp3_new.php",
        `msg=${text}&lang=${lang}`
    )

    lang = ""
    return res

}
const ShowKeyboard = async (ctx, customMessage) => {
    switch (SELECTOR) {
        case '0':
            try {
                ctx.editMessageText(customMessage || "<b>Seja bem vindo!</b>\n\nMeu nome é bot-san 🤖\n\nEscolha uma opção abaixo e me conheça um pouco mais!",
                    mainMenuKeyboards.mainMenu[0]
                );
            } catch (e) {
                ctx.replyWithHTML(customMessage || "<b>Seja bem vindo!</b>\n\nMeu nome é bot-san 🤖\n\nEscolha uma opção abaixo e me conheça um pouco mais!",
                    mainMenuKeyboards.mainMenu[0]
                );
            }

            //PARA NAO MOSTRAR MAIS ESSA MESMA MENSAGEM
            SELECTOR = -1
            break;
        case '1':
            try {
                ctx.editMessageText(customMessage || "Oh, vejo que se interessou em algumas de minhas mini-aventuras programando! Veja abaixo algumas delas:\n",
                    mainMenuKeyboards.mainMenu[1]
                );
            } catch (e) {
                ctx.replyWithHTML(customMessage || "Oh, vejo que se interessou em algumas de minhas mini-aventuras programando! Veja abaixo algumas delas:\n",
                    mainMenuKeyboards.mainMenu[1]
                );
            }
            break;
        case '2':
            ctx.editMessageText(customMessage || "Ops, ainda nao fiz nada aqui 😛",
                mainMenuKeyboards.mainMenu[2]
            );
            break;


    }
}

/**
 * ##############################
 *  COMANDOS PARA text-to-speech
 * ##############################
 */

bot.on('text', async (ctx, next) => {
    if (lang) {
        res = await GetAudio(ctx.update.message.text)
        let audio = await axios.get(res.data.URL)
        await ctx.reply("Aqui está seu audio 🔊")
        await ctx.replyWithAudio({ url: res.data.URL })
        SELECTOR = '1'
        await ctx.reply(`Bem legal não é? Para executar essa função estou fazendo uma requisição para um site externo >> https://ttsmp3.com/\n\nEnvio sua mensagem para o site > o site gera o áudio > e eu te devolvo como mensagem de voz!`, {disable_web_page_preview: true})
        await ctx.replyWithSticker('CAACAgIAAxkBAAICxmGc9bdfNZaTKV8RUwqx_zC7INfyAAILDgACSRERSi7KEua-0ZkoIgQ')
        await ShowKeyboard(ctx, "Fico muito feliz que você tenha se interessado em meus projetos!!!")



    }
    next()
})

bot.action('talk', ctx => {
    ctx.deleteMessage()
    ctx.replyWithHTML("<b>text-to-speech</b>\n\nNesta mini aplicação você pode digitar um texto no idioma selecionado e eu leio o que você me falou!\n\nSelecione um idioma:", {
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
    lang = "Vitoria"
    ctx.deleteMessage()
    ctx.replyWithHTML("<b>text-to-speech</b>\n\nIdioma selecionado: <b>PORTUGUÊS</b>. \n Pode digitar agora um texto para eu falar!")
})

bot.action('JP', ctx => {
    lang = "Takumi"
    ctx.deleteMessage()
    ctx.replyWithHTML("<b>text-to-speech</b>\n\nIdioma selecionado: <b>JAPONÊS</b>. \n Pode digitar agora um texto para eu falar!")
})

/**
 * ##############################
 *  FIM text-to-speech
 * ##############################
 */

bot.action(/SCREEN(\d+)/, (ctx, next) => {
    SELECTOR = ctx.match[1]
    console.log(SELECTOR)
    ShowKeyboard(ctx)
})

bot.command('start', ctx => {
    SELECTOR = '0'
    ctx.deleteMessage()
    ShowKeyboard(ctx)
})

bot.command('sing', ctx => {
    ctx.replyWithAudio(gatoTheme)
    ctx.reply("Oh Gonzalez, i'm very strong. Beat me and i'll give you silver points")
})

bot.startPolling()
