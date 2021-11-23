module.exports = {
    mainMenu: [
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard:
                [
                    [
                        { text: "Meus projetos", callback_data: "SCREEN1" },
                        { text: "GITHUB", url: "https://www.github.com/matheus-96/" },
                        { text: "Currículo", callback_data: "SCREEN2" },
                    ]
                ]
            }
        },

        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard:
                    [
                        [
                            { text: "text-to-speech", callback_data: "talk" },
                            { text: "hiragana-search", callback_data: "hiragana" },
                            { text: "WIP", callback_data: "wip" },
                        ],
                        [
                            { text: "Voltar", callback_data: `SCREEN0` }
                        ]
                    ]
            }
        },
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard:
                    [
                        [
                            { text: "null", callback_data: "NULL" },
                            { text: "null", callback_data: "NULL" },
                            { text: "null", callback_data: "NULL" },
                        ],
                        [
                            { text: "Voltar", callback_data: `SCREEN0` }
                        ]
                    ]
            }
        }
    ]

}