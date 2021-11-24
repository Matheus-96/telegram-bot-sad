const axios = require('axios');
const { decode } = require('html-entities/lib/index')

const mainMenuKeyboards = require('../keyboards/main-menu-kb');
let lang = ""      // Idioma selecionado no text-to-speech
let isQuiz = false // Se o usuário está realizando quiz
let quizIndex = 0  // Qual indice de mensagem para o quiz
let quizObj  // Objeto que recebera o quiz da API
let SELECTOR = '0' // Seletor de 'tela'

function SetSelector(value) {
    SELECTOR = value
}

function GetSelector() { return SELECTOR }

function SetLang(value) {
    lang = value
}

function GetLang() {
    return lang
}

function SetIsQuiz(value) {
    isQuiz = value
}

function GetIsQuiz() { return isQuiz }

const GetAudio = async (text) => {
    text = text.replaceAll(" ", '+')
    let res = await axios.post("https://ttsmp3.com/makemp3_new.php",
        `msg=${text}&lang=${lang}`
    )

    lang = ""
    return res

}

const Text_to_speech = async ctx => {
    res = await GetAudio(ctx.update.message.text)
    // let audio = await axios.get(res.data.URL)
    await ctx.reply("Aqui está seu audio 🔊")
    await ctx.replyWithAudio({ url: res.data.URL })
    SELECTOR = '1'
    await ctx.reply(`Bem legal não é? Para executar essa função estou fazendo uma requisição para um site externo >> https://ttsmp3.com/\n\nEnvio sua mensagem para o site > o site gera o áudio > e eu te devolvo como mensagem de voz!`, { disable_web_page_preview: true })
    await ctx.replyWithSticker('CAACAgIAAxkBAAICxmGc9bdfNZaTKV8RUwqx_zC7INfyAAILDgACSRERSi7KEua-0ZkoIgQ')
    await ShowKeyboard(ctx, "Fico muito feliz que você tenha se interessado em meus projetos!!!")
}

const GetQuiz = async () => {
    quizIndex = 0
    return await axios.get('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy')
}

const EvaluateQuiz = async (ctx) => {
    if (ctx.update.message.text == quizObj.data.results[quizIndex].correct_answer) await ctx.replyWithHTML("ACERTOU!!!")
    quizIndex++
    UserQuiz(ctx)
}

const UserQuiz = async (ctx) => {
    if (!isQuiz) quizObj = await GetQuiz() //Chamando a API caso ainda nao tenha sido preenchido o objeto

    isQuiz = true

    let answerArray = quizObj.data.results[quizIndex].incorrect_answers
    let insertPosition = Math.round(Math.random() * (answerArray.length - 0) + 0); // Gerando numero aleatório para inserir a resposta correta no array de respostas
    answerArray.splice(insertPosition, 0, quizObj.data.results[quizIndex].correct_answer) // Inserindo resposta correta em posição aleatoria no array de respostas

    let keyboard = {
        reply_markup: {
            keyboard: [
                [
                ]
            ]
        }
    }
    for (let index = 0; index < answerArray.length; index++) {
        keyboard.reply_markup.keyboard[[0]].push({ 'text': decode(answerArray[index]) })
    }
    ctx.replyWithHTML(`
    <b>Pergunta ${quizIndex}/5</b>

    ${(decode(quizObj.data.results[quizIndex].question))}`, keyboard)
}

const ShowKeyboard = async (ctx, customMessage) => {
    if (SELECTOR == 0) {
        SetIsQuiz = false
        quizIndex = 0
        lang = ""
        quizObj = ""
    }
    try {
        ctx.editMessageText(customMessage || mainMenuKeyboards.mainMenu[SELECTOR][0],
            mainMenuKeyboards.mainMenu[SELECTOR][1]
        );
    } catch (e) {
        ctx.replyWithHTML(customMessage || mainMenuKeyboards.mainMenu[SELECTOR][0],
            mainMenuKeyboards.mainMenu[SELECTOR][1]
        );
    }
}

module.exports = { GetAudio, SetLang, GetLang, Text_to_speech, ShowKeyboard, SetSelector, GetSelector, GetQuiz, GetIsQuiz, UserQuiz, EvaluateQuiz, SetIsQuiz }