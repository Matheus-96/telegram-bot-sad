/**
 * MODELO DE preenchimento
 * [ //OBJETO PRINCIPAL
 * 
 *  [ "Texto a ser apresentado", { objeto de inline keyboard } ], // Objeto individual
 *  [ "Texto a ser apresentado", { objeto de inline keyboard } ], // Objeto individual
 *  [ "Texto a ser apresentado", { objeto de inline keyboard } ], // Objeto individual
 * 
 * ]
 */


module.exports = {
    mainMenu: [
        [
            "<b>Seja bem vindo!</b>\n\nMeu nome é Gato-san 🤖\n\nEscolha uma opção abaixo e me conheça um pouco mais!",
            { // ## -- SCREEN 1 -- ##
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

            }
        ],
        [
            "Oh, vejo que se interessou em algumas de minhas mini-aventuras programando! Veja abaixo algumas delas:\n",
            { // ## -- SCREEN 2 -- ##
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard:
                        [
                            [
                                { text: "text-to-speech", callback_data: "talk" },
                                { text: "hiragana-search", callback_data: "hiragana" },
                                { text: "Quiz", callback_data: "quiz" },
                            ],
                            [
                                { text: "Voltar", callback_data: `SCREEN0` }
                            ]
                        ]
                }
            }
        ],
        [
            "Ainda nao fiz nada aqui 😛",
            { // ## -- SCREEN 3 -- ##
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
        ],
        [
            "Ops, ainda nao fiz nada aqui 😛",
            { // ## -- SCREEN 4 -- ##
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

    ]
}