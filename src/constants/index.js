export const userQuestions = [
    {
        question: 'Qual seu nome?',
        name: 'name',
        full: true
    }, {
        question: 'Digite seu Email',
        name: 'email',
        full: true
    }, {
        question: 'Qual seu telefone?',
        name: 'phone',
        full: true
    },
]

export const userParceiroQuestions = [
    {
        question: 'Razão Social',
        name: 'name',
        full: true
    }, {
        question: 'Email para contato',
        name: 'email',
        full: true
    }, {
        question: 'Telefone da empresa',
        name: 'phone',
        full: true
    },
]

export const treinamentoQuestions = [
    {
        question: 'Qual o nome do treinamento?',
        name: 'nome',
        full: true,
    }, {
        question: 'Escreva as etapas que o treinamento possui, separados por vírgula',
        name: 'etapas',
        full: true,
    },
]

export const trilhaQuestions = [
    {
        question: 'Qual o nome da trilha?',
        name: 'nome',
    }, {
        question: 'Insira o link da ementa da trilha',
        name: 'ementa',
    }, {
        question: 'Escreva uma breve descrição para a trilha',
        name: 'desc',
        multi: true,
        full: true,
    }, {
        question: 'Escreva os módulos que a Trilha possui, separados por vírgula',
        name: 'modulos',
        full: true,
    },
]

export const bancoQuestions = [
    {
        question: 'Através de qual banco deseja receber o pagamento?',
        name: 'banco',
        full: true,
        options: ['Banco do Brasil', 'Caixa Econômica Federal', 'Itaú', 'Bradesco', 'Nubank', 'Inter', 'Santander'],
    },
    {
        question: 'Qual o tipo de conta?',
        name: 'tipo',
        options: ['Corrente', 'Poupança'],
    },
    {
        question: 'Número da agência?',
        name: 'agencia',
    },
    {
        question: 'Número da conta?',
        name: 'conta',
    },
    {
        question: 'Qual sua chave pix?',
        name: 'pix',
    },
]

export const facilitadorPerfilQuestions = [
    {
        question: 'Nome do Contato',
        name: 'nome_contato',
    },
    {
        question: 'Seu estado civíl',
        type: 'select',
        options: ['Solteiro (a)', 'Casado (a)', 'Separado (a)', 'Divorciado (a)', 'Viúvo (a)'],
        name: 'estado_civil',
    },
    {
        question: 'Qual o ramo de atividade?',
        name: 'ramo',
    },
    {
        question: 'Data de nascimento',
        name: 'dt_nascimento',
        type: "dt"
    },
    {
        question: 'Informe seu CPF',
        name: 'cpf',
        mask: '999.999.999-99',
        half: true
    },
    {
        question: 'Informe seu CNPJ',
        name: 'cnpj',
        mask: '99.999.999/9999-99',
        half: true
    },
    {
        question: 'N° Contribuinte (INSS ou PIS)',
        name: 'contribuinte',
    },
    {
        question: 'Tamanho da camisa',
        type: 'select',
        options: ['PP', 'P', 'M', 'G', 'GG'],
        name: 'camisa',
    },
    {
        question: 'Inscrição municipal',
        name: 'inscricao_municipal',
        half: true
    }, {
        question: 'Inscrição estadual',
        name: 'inscricao_estadual',
        half: true
    },
    {
        name: 'endereco',
        type: 'address',
    }
]

export const parceiroPerfilQuestions = [
    {
        question: 'Nome do Contato',
        name: 'nome_contato',
    },
    {
        question: 'Qual o ramo de atividade?',
        name: 'ramo',
    },
    {
        question: 'N° Contribuinte (INSS ou PIS)',
        name: 'contribuinte',
        half: true
    },
    {
        question: 'Informe seu CNPJ',
        name: 'cnpj',
        mask: '99.999.999/9999-99',
        half: true
    },
    {
        question: 'Inscrição municipal',
        name: 'inscricao_municipal',
        half: true
    }, {
        question: 'Inscrição estadual',
        name: 'inscricao_estadual',
        half: true
    },
    {
        name: 'endereco',
        type: 'address',
    }
]

export const empresaPerfilQuestions = [
    {
        question: 'Pessoa do Contato',
        name: 'nome_contato',
    },
    {
        question: 'Qual o ramo de atividade?',
        name: 'ramo',
    },
    {
        question: 'Informe seu CNPJ',
        name: 'cnpj',
        mask: '99.999.999/9999-99',
        half: true
    },
    {
        question: 'Inscrição municipal',
        name: 'inscricao_municipal',
        half: true
    }, {
        question: 'Inscrição estadual',
        name: 'inscricao_estadual',
        half: true
    },
    {
        name: 'endereco',
        type: 'address',
    }
]

export const curriculoGen = [
    {
        question: '3 habilidades que você identifica em você?',
        full: true,
        multi: true,
        default: [],
        name: 'qualidades',
        type: 'select',
        limit: 3,
        warn: 'Selecione um máximo de 3 hobbies',
        options: ['Boa comunicação', 'Flexibilidade', 'Espírito de equipe', 'Autoconfiança', 'Capacidade de análise', 'Proatividade', 'Capacidade de adaptação', 'Gerenciamento do tempo', 'Inteligência emocional']
    },
    {
        question: '3 dos seus principais hobbies?',
        full: true,
        multi: true,
        default: [],
        name: 'hobbies',
        type: 'select',
        limit: 3,
        warn: 'Selecione um máximo de 3 hobbies',
        options: ['ASSISTIR FILME', 'BORDAR', 'COSTURAR', 'COZINHAR', 'DANÇAR', 'ESTUDAR', 'ESCREVER', 'EXERCITAR-SE', 'IR À PRAIA', 'JOGAR VIDEO GAME', 'JOGAR BOLA', 'JOGAR XADREZ', 'LER', 'MEDITAR', 'OUVIR MÚSICA', 'SAIR COM OS AMIGOS', 'VIAJAR'],
    },
    {
        question: '3 das causas você apoia?',
        full: true,
        default: [],
        name: 'apoio',
        limit: 3,
        warn: 'Selecione um máximo de 3 causas',
        options: ['COMBATE À FOME', 'EDUCAÇÃO', 'IDOSOS', 'CRIANÇA E ADOLESCENTE', 'SAÚDE', 'MEIO AMBIENTE', 'ANIMAIS'],
        multi: true,
        type: 'select',
    }
]

export const curriculoQuestions = [
    {
        question: 'Resumo',
        name: 'resumo',
        full: true,
        multi: true,
    },
    {
        question: 'Objetivo',
        name: 'objetivo',
        full: true,
        multi: true,
    },
    {
        question: 'Quais seus principais hobbies',
        multi: true,
        default: [],
        name: 'hobbies',
        type: 'select',
        limit: 3,
        warn: 'Selecione um máximo de 3 hobbies',
        options: ['ASSISTIR FILME', 'BORDAR', 'COSTURAR', 'COZINHAR', 'DANÇAR', 'ESTUDAR', 'ESCREVER', 'EXERCITAR-SE', 'IR À PRAIA', 'JOGAR VIDEO GAME', 'JOGAR BOLA', 'JOGAR XADREZ', 'LER', 'MEDITAR', 'OUVIR MÚSICA', 'SAIR COM OS AMIGOS', 'VIAJAR'],
    },
    {
        question: 'Que causas você apoia?',
        default: [],
        name: 'apoio',
        limit: 3,
        warn: 'Selecione um máximo de 3 causas',
        options: ['COMBATE À FOME', 'EDUCAÇÃO', 'IDOSOS', 'CRIANÇA E ADOLESCENTE', 'SAÚDE', 'MEIO AMBIENTE', 'ANIMAIS'],
        multi: true,
        type: 'select',
    }
]

export const facilitadorPerfilIn = [
    [
        {
            question: 'Nome do Contato',
            name: 'nome_contato',
        },
        {
            question: 'Seu estado civíl',
            type: 'select',
            options: ['Solteiro (a)', 'Casado (a)', 'Separado (a)', 'Divorciado (a)', 'Viúvo (a)'],
            name: 'estado_civil',
        },
        {
            question: 'Qual o ramo de atividade?',
            name: 'ramo',
        },
        {
            question: 'Data de nascimento',
            name: 'dt_nascimento',
            type: "date"
        },
        {
            question: 'Informe seu CPF',
            name: 'cpf',
            mask: '999.999.999-99',
            half: true
        },
        {
            question: 'Informe seu CNPJ',
            name: 'cnpj',
            mask: '99.999.999/9999-99',
            half: true
        },
        {
            question: 'N° Contribuinte (INSS ou PIS)',
            name: 'contribuinte',
        },
        {
            question: 'Tamanho da camisa',
            type: 'select',
            options: ['PP', 'P', 'M', 'G', 'GG'],
            default: [],
            name: 'camisa',
        },
        {
            question: 'Inscrição municipal',
            name: 'inscricao_municipal',
            half: true
        }, {
            question: 'Inscrição estadual',
            name: 'inscricao_estadual',
            half: true
        },
        {
            name: 'endereco',
            type: 'address',
        }
    ],
    [
        {
            question: 'Através de qual banco deseja receber o pagamento?',
            name: 'banco',
            type: 'select',
            options: ['Banco do Brasil', 'Caixa Econômica Federal', 'Itaú', 'Bradesco', 'Nubank', 'Inter', 'Santander'],
        },
        {
            question: 'Qual o tipo de conta?',
            name: 'tipo',
            type: 'select',
            options: ['Corrente', 'Poupança'],
        },
        {
            question: 'Número da agência?',
            name: 'agencia',
        },
        {
            question: 'Número da conta?',
            name: 'conta',
        },
        {
            question: 'Qual sua chave pix?',
            name: 'pix',
        },
    ]
]

export const alunoPerfilIn = [
    [
        {
            question: 'Data de nascimento',
            name: 'dt_nascimento',
            type: 'date'
        },
        {
            question: 'Qual seu perfil no instagram?',
            name: 'instagram'
        },
        {
            question: 'Com que gênero se identifica',
            name: 'genero',
            other: 'Informe o outro genero',
            type: 'select',
            options: ['Feminino', 'Masculino', 'Não-binário', 'Prefiro não informar']
        },
        {
            question: 'Informe o nome da instituição da qual você faz parte',
            name: 'instituicao',
            type: 'select',
            options: ['IPOM', 'Movimento Saúde Mental', 'Projeto Filhos do Rei', 'Projeto Bom Jesus', 'Somos Um'],
        },
        {
            question: 'Seu estado civíl',
            type: 'select',
            options: ['Solteiro (a)', 'Casado (a)', 'Separado (a)', 'Divorciado (a)', 'Viúvo (a)'],
            name: 'estado_civil',
        },
        {
            question: 'Informe seu CPF',
            mask: '999.999.999-99',
            name: 'cpf',
        },
        {
            question: 'Informe seu RG',
            name: 'rg',
        },
        {
            question: 'Qual sua etinia?',
            name: 'identificacao_racial',
            type: 'select',
            options: ['Amarela', 'Branca', 'Indígena', 'Parda', 'Preta', 'prefiro não opinar'],
            other: 'Que outra etnia você faz parte?'
        },
        {
            question: 'Quais dos aplicativos abaixo você costuma utilizar',
            multi: true,
            default: [],
            name: 'apps',
            type: 'select',
            options: ['Linkedin', 'Facebook', 'Instagram', 'Youtube', 'WhatsApp', 'Zoom', 'Google Meet', 'Skype', 'Sympla'],
        },
        {
            name: 'endereco',
            type: 'address',
        }
    ], [
        {
            question: 'Com quem você mora',
            name: 'quem_mora',
            other: 'informe com quem mora',
            type: 'select',
            options: ['Minha família', 'Sozinho', 'Com parentes']
        },
        {
            question: 'Quantas pessoas moram em sua casa?',
            name: 'qtd_mora',
            type: 'select',
            options: ['Moro sozinho', 'Uma pessoa', 'Duas Pessoas', 'Três Pessoas', 'Quatro Pessoas', 'Cinco Pessoas', 'Mais de cinco Pessoas']
        },
        {
            question: 'Tem filhos?',
            name: 'filhos',
            type: 'bool',
            yes: {
                question: 'Quantos filhos',
                name: 'qtd_filhos',
                type: 'select',
                options: ['Nenhum filho', 'Um filho', 'Dois filhos', 'Três ou mais filhos']
            },
        },
        {
            question: 'Qual sua renda familiar?',
            name: 'renda_familiar',
            type: 'select',
            options: ['Até um salário mínimo', 'Dois salários mínimos', 'Acima de dois salários mínimos']
        },
        {
            question: 'Está inscrito no programa de baixa renda?',
            name: 'baixa_renda',
            type: 'bool'
        },
        {
            question: 'É ou foi aluno da rede pública?',
            name: 'escola_publica',
            type: 'bool'
        },
        {
            question: 'Qual sua escolaridade?',
            name: 'escolaridade',
            type: 'select',
            options: ['Nível médio - incompleto ou cursando', 'Nível médio – completo', 'Superior incompleto ou cursando', 'Superior completo']
        },
        {
            question: 'Tem acesso à internet?',
            name: 'acesso_internet',
            type: 'bool'
        },
        {
            question: 'Possui computador?',
            name: 'possui_computador',
            type: 'bool'
        },
        {
            question: 'Que tipos de problemas/brigas/conflitos você normalmente enfrenta?',
            multi: true,
            name: 'conflitos',
            full: true,
        },
        {
            question: 'O que te tira do sério, dá muita ráiva?',
            full: true,
            multi: true,
            name: 'raiva',
        }
    ], [
        {
            name: 'importante',
            question: 'Qual é para você o motivo mais importante para se ter um trabalho?',
            type: 'select',
            options: ['Para ter mais responsabilidade', 'Independência financeira', 'Sentir-me útil', 'Adquirir experiência', 'Ajudar minha família']
        },
        {
            name: 'futuro',
            question: 'Como você imagina sua vida daqui a 5 anos?',
            type: 'select',
            other: 'Que outro futuro você pensa?',
            options: ['Com um diploma universitário e um bom emprego', 'Trabalhando no setor público ou estudando pra concurso', 'Ganhando dinheiro com meu próprio negócio', 'Não planejei']
        },
        {
            name: 'profissao',
            question: 'Que profissão você gostaria de seguir?',
            type: 'select',
            options: ['Ainda não escolhi', 'Profissão ligada às Engenharias / Ciências Tecnológicas.', 'Profissão ligada às Ciências Humanas.', 'Profissão ligada às Artes.', 'Profissão ligada às Ciências Biológicas e da Saúde.', 'Professor(a) de Ensino Fundamental e Médio.', 'Empreendedor.']
        },
        {
            name: 'decisao',
            question: 'O que ajudou você a tomar essa decisão sobre sua profissão?',
            type: 'select',
            other: 'Outra pessoa te ajudou? Quem?',
            options: ['Meus pais', 'A escola', 'Meus (Minhas) amigos(as)', 'Informações gerais, revistas, jornais, TV', 'Meu trabalho', 'Estímulo financeiro', 'Facilidade de obter emprego', 'Eu me identifico com essa profissão']
        },
        {
            question: 'Você considera que está preparado para o mercado de trabalho?',
            name: 'preparado',
            type: 'bool'
        }]
]

export const empresaPerfilIn = [
    [
        {
            question: 'Nome do Contato',
            name: 'nome_contato',
        },
        // {
        //     question: 'Seu estado civíl',
        //     type: 'select',
        //     options: ['Solteiro (a)', 'Casado (a)', 'Separado (a)', 'Divorciado (a)', 'Viúvo (a)'],
        //     name: 'estado_civil',
        // },
        // {
        //     question: 'Data de nascimento',
        //     name: 'dt_nascimento',
        //     type: "date"
        // },
        {
            question: 'Qual o ramo de atividade?',
            name: 'ramo',
        },
        // {
        //     question: 'Informe seu CPF',
        //     name: 'cpf',
        //     mask: '999.999.999-99',
        //     half: true
        // },
        {
            question: 'Informe seu CNPJ',
            name: 'cnpj',
            mask: '99.999.999/9999-99',
            half: true
        },
        // {
        //     question: 'N° Contribuinte (INSS ou PIS)',
        //     name: 'contribuinte',
        // },
        // {
        //     question: 'Tamanho da camisa',
        //     type: 'select',
        //     options: ['PP', 'P', 'M', 'G', 'GG'],
        //     default: [],
        //     name: 'camisa',
        // },
        {
            question: 'Inscrição municipal',
            name: 'inscricao_municipal',
            half: true
        }, {
            question: 'Inscrição estadual',
            name: 'inscricao_estadual',
            half: true
        },
        {
            name: 'endereco',
            type: 'address',
        }
    ],
    [
        {
            question: 'Através de qual banco deseja receber o pagamento?',
            name: 'banco',
            type: 'select',
            options: ['Banco do Brasil', 'Caixa Econômica Federal', 'Itaú', 'Bradesco', 'Nubank', 'Inter', 'Santander'],
        },
        {
            question: 'Qual o tipo de conta?',
            name: 'tipo',
            type: 'select',
            options: ['Corrente', 'Poupança'],
        },
        {
            question: 'Número da agência?',
            name: 'agencia',
        },
        {
            question: 'Número da conta?',
            name: 'conta',
        },
        {
            question: 'Qual sua chave pix?',
            name: 'pix',
        },
    ]
]

export const alunoPerfilQuestions = [
    {
        question: 'Data de nascimento',
        name: 'dt_nascimento',
        type: 'date'
    },
    {
        question: 'Qual seu perfil no instagram?',
        name: 'instagram'
    },
    {
        question: 'Com que gênero se identifica',
        name: 'genero',
        other: 'Informe o outro genero',
        type: 'select',
        options: ['Feminino', 'Masculino', 'Não-binário', 'Prefiro não informar']
    },
    {
        question: 'Informe o nome da instituição da qual você faz parte',
        name: 'instituicao',
        type: 'select',
        options: ['IPOM', 'Movimento Saúde Mental', 'Projeto Filhos do Rei', 'Projeto Bom Jesus', 'Somos Um'],
    },
    {
        question: 'Seu estado civíl',
        type: 'select',
        options: ['Solteiro (a)', 'Casado (a)', 'Separado (a)', 'Divorciado (a)', 'Viúvo (a)'],
        name: 'estado_civil',
    },
    {
        question: 'Informe seu CPF',
        name: 'cpf',
    },
    {
        question: 'Informe seu RG',
        name: 'rg',
    },
    {
        question: 'Qual sua etinia?',
        name: 'identificacao_racial',
        type: 'select',
        options: ['Amarela', 'Branca', 'Indígena', 'Parda', 'Preta', 'prefiro não opinar'],
        other: 'Que outra etnia você faz parte?'
    },
    {
        question: 'Quais dos aplicativos abaixo você costuma utilizar',
        multi: true,
        default: [],
        name: 'apps',
        type: 'select',
        options: ['Linkedin', 'Facebook', 'Instagram', 'Youtube', 'WhatsApp', 'Zoom', 'Google Meet', 'Skype', 'Sympla'],
    },
    {
        question: 'Com quem você mora',
        name: 'quem_mora',
        other: 'informe com quem mora',
        type: 'select',
        options: ['Minha família', 'Sozinho', 'Com parentes']
    },
    {
        question: 'Quantas pessoas moram em sua casa?',
        name: 'qtd_mora',
        type: 'select',
        options: ['Moro sozinho', 'Uma pessoa', 'Duas Pessoas', 'Três Pessoas', 'Quatro Pessoas', 'Cinco Pessoas', 'Mais de cinco Pessoas']
    },
    {
        question: 'Tem filhos?',
        name: 'filhos',
        type: 'bool',
        yes: {
            question: 'Quantos filhos',
            name: 'qtd_filhos',
            type: 'select',
            options: ['Nenhum filho', 'Um filho', 'Dois filhos', 'Três ou mais filhos']
        },
    },
    {
        question: 'Qual sua renda familiar?',
        name: 'renda_familiar',
        type: 'select',
        options: ['Até um salário mínimo', 'Dois salários mínimos', 'Acima de dois salários mínimos']
    },
    {
        question: 'Está inscrito no programa de baixa renda?',
        name: 'baixa_renda',
        type: 'bool'
    },
    {
        question: 'É ou foi aluno da rede pública?',
        name: 'escola_publica',
        type: 'bool'
    },
    {
        question: 'Qual sua escolaridade?',
        name: 'escolaridade',
        type: 'select',
        options: ['Nível médio - incompleto ou cursando', 'Nível médio – completo', 'Superior incompleto ou cursando', 'Superior completo']
    },
    {
        question: 'Tem acesso à internet?',
        name: 'acesso_internet',
        type: 'bool'
    },
    {
        question: 'Possui computador?',
        name: 'possui_computador',
        type: 'bool'
    },
    {
        question: 'Que tipos de problemas/brigas/conflitos você normalmente enfrenta?',
        multi: true,
        name: 'conflitos',
        full: true,
    },
    {
        question: 'O que te tira do sério, dá muita ráiva?',
        full: true,
        multi: true,
        name: 'raiva',
    },
    {
        name: 'importante',
        question: 'Qual é para você o motivo mais importante para se ter um trabalho?',
        type: 'select',
        options: ['Para ter mais responsabilidade', 'Independência financeira', 'Sentir-me útil', 'Adquirir experiência', 'Ajudar minha família']
    },
    {
        name: 'futuro',
        question: 'Como você imagina sua vida daqui a 5 anos?',
        type: 'select',
        other: 'Que outro futuro você pensa?',
        options: ['Com um diploma universitário e um bom emprego', 'Trabalhando no setor público ou estudando pra concurso', 'Ganhando dinheiro com meu próprio negócio', 'Não planejei']
    },
    {
        name: 'profissao',
        question: 'Que profissão você gostaria de seguir?',
        type: 'select',
        options: ['Ainda não escolhi', 'Profissão ligada às Engenharias / Ciências Tecnológicas.', 'Profissão ligada às Ciências Humanas.', 'Profissão ligada às Artes.', 'Profissão ligada às Ciências Biológicas e da Saúde.', 'Professor(a) de Ensino Fundamental e Médio.', 'Empreendedor.']
    },
    {
        name: 'decisao',
        question: 'O que ajudou você a tomar essa decisão sobre sua profissão?',
        type: 'select',
        other: 'Outra pessoa te ajudou? Quem?',
        options: ['Meus pais', 'A escola', 'Meus (Minhas) amigos(as)', 'Informações gerais, revistas, jornais, TV', 'Meu trabalho', 'Estímulo financeiro', 'Facilidade de obter emprego', 'Eu me identifico com essa profissão']
    },
    {
        question: 'Você considera que está preparado para o mercado de trabalho?',
        name: 'preparado',
        type: 'bool'
    },
    {
        name: 'endereco',
        type: 'address',
    },
]

export const avaliacaoModulo = [
    {
        question: 'O quanto você recomendaria este módulo para uma amigo (a) ou familiar?',
        name: 'recomendacao',
        full: true,
        type: 'number',
        options: 10
    },
    {
        question: 'A duração do módulo foi adequada?',
        name: 'duracao',
        type: 'radio-bool',
    },
    {
        question: 'O conteúdo apresentado foi claro e objetivo?',
        name: 'clareza',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'O Conteúdo abordado é aplicável no dia-a-dia?',
        name: 'aplicabilidade',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'Sobre a Facilitadora e Metodologia aplicada, houve clareza na exposição?',
        name: 'clareza-f',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'A Facilitadora Estimulou a participação de todos?',
        name: 'participacao-f',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'A Facilitadora foi Inovadora e criativa?',
        name: 'inovacao-f',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'O módulo teve um bom nível de aproveitamento?',
        name: 'aproveitamento',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'O tema cumpriu os objetivos propostos?',
        name: 'objetivos',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'Como você avalia a qualidade do nosso material?',
        name: 'qualidade',
        type: 'radio',
        options: ['Regular', 'Bom', 'Excelente']
    },
    {
        question: 'Deixe aqui o seu depoimento para o (a) Facilitador (a) (Elogio, agradecimento ou sugestão)',
        name: 'depoimento',
        full: true,
        multi: true
    },
    {
        question: 'A Facilitadora foi Inovadora e criativa?',
        name: 'criativa-f',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'O módulo Atendeu suas expectativas?',
        name: 'expectativas',
        type: 'radio',
        options: ['Concordo Totalmente', 'Concordo Parcialmente', 'Discordo Parcialmente', 'Discordo Totalmente']
    },
    {
        question: 'O que você mais gostou?',
        name: 'gostou',
        full: true,
        multi: true
    },
    {
        question: 'O que você acha que pode ser melhorado?',
        name: 'melhorado',
        full: true,
        multi: true
    },
]

export const avaliacaoCurso = [
    {
        question: 'O quanto você recomendaria o nosso curso para uma amigo (a) ou familiar?',
        name: 'recomendacao',
        full: true,
        type: 'number',
        options: 10
    },
    {
        question: 'O que você achou da duração das aulas?',
        name: 'duracao',
        type: 'radio',
        options: ['Ótimo', 'Bom', 'Regular']
    },
    {
        question: 'Você preferia fazer esse curso com aulas ao vivo ou gravadas?',
        name: 'preferencia',
        type: 'radio',
        options: ['Somente Gravada', 'Somente ao vivo', 'Parte ao vivo e parte gravada']
    },
    {
        question: 'Qual dia da semana você prefere fazer o curso?',
        name: 'dia_semana',
        type: 'radio',
        options: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
    },
    {
        question: 'Qual o melhor período do dia você prefere fazer o curso?',
        name: 'periodo_dia',
        type: 'radio',
        options: ['Manhã', 'Tarde', 'Noite', 'Qualquer horário']
    },
    {
        question: 'Gostou dos temas?',
        name: 'temas',
        type: 'radio-bool',
    },
    {
        question: 'Em relação a sua experiência com o nosso curso, qual impacto teve na sua vida? (O que aprendi, descobri , mudei)?',
        name: 'impacto',
        full: true,
        multi: true
    },
]

export const legacyPerfilQuestions = [
    {
        question: 'Data de nascimento',
        name: 'dt_nascimento'
    },
    {
        question: 'Qual seu perfil no instagram?',
        name: 'instagram'
    },
    {
        question: 'Com que gênero se identifica',
        name: 'genero',
        other: 'Informe o outro genero',
        options: ['Feminino', 'Masculino', 'Não-binário', 'Prefiro não informar']
    },
    {
        question: 'Informe o nome da instituição da qual você faz parte',
        name: 'instituicao',
    },
    {
        question: 'Seu estado civíl',
        options: ['Solteiro (a)', 'Casado (a)', 'Separado (a)', 'Divorciado (a)', 'Viúvo (a)'],
        name: 'estado_civil',
    },
    {
        question: 'Informe seu CPF',
        name: 'cpf',
    },
    {
        question: 'Informe seu RG',
        name: 'rg',
    },
    {
        question: 'Qual sua etinia?',
        name: 'identificacao_racial',
        options: ['Amarela', 'Branca', 'Indígena', 'Parda', 'Preta', 'prefiro não opinar'],
        other: 'Que outra etnia você faz parte?'
    },
    {
        question: 'Quais dos aplicativos abaixo você costuma utilizar',
        multi: true,
        default: [],
        name: 'apps',
        options: ['Linkedin', 'Facebook', 'Instagram', 'Youtube', 'WhatsApp', 'Zoom', 'Google Meet', 'Skype', 'Sympla'],
    },
    {
        question: 'Com quem você mora',
        name: 'quem_mora',
        other: 'informe com quem mora',
        options: ['Minha família', 'Sozinho', 'Com parentes']
    },
    {
        question: 'Quantas pessoas moram em sua casa?',
        name: 'qtd_mora',
        options: ['Moro sozinho', 'Uma pessoa', 'Duas Pessoas', 'Três Pessoas', 'Quatro Pessoas', 'Cinco Pessoas', 'Mais de cinco Pessoas']
    },
    {
        question: 'Tem filhos?',
        name: 'filhos',
        yes: {
            question: 'Quantos filhos',
            name: 'qtd_filhos',
            options: ['Nenhum filho', 'Um filho', 'Dois filhos', 'Três ou mais filhos']
        },
    },
    {
        question: 'Qual sua renda familiar?',
        name: 'renda_familiar',
        options: ['Até um salário mínimo', 'Dois salários mínimos', 'Acima de dois salários mínimos']
    },
    {
        question: 'Está inscrito no programa de baixa renda?',
        name: 'baixa_renda',
    },
    {
        question: 'É ou foi aluno da rede pública?',
        name: 'escola_publica',
    },
    {
        question: 'Qual sua escolaridade?',
        name: 'escolaridade',
        options: ['Nível médio - incompleto ou cursando', 'Nível médio – completo', 'Superior incompleto ou cursando', 'Superior completo']
    },
    {
        question: 'Tem acesso à internet?',
        name: 'acesso_internet',
    },
    {
        question: 'Possui computador?',
        name: 'possui_computador',
    },
    {
        question: 'Que tipos de problemas/brigas/conflitos você normalmente enfrenta?',
        multi: true,
        name: 'conflitos',
        full: true,
    },
    {
        full: true,
        question: 'O que te tira do sério, dá muita ráiva?',
        multi: true,
        name: 'raiva',
    },
    {
        name: 'importante',
        question: 'Qual é para você o motivo mais importante para se ter um trabalho?',
        options: ['Para ter mais responsabilidade', 'Independência financeira', 'Sentir-me útil', 'Adquirir experiência', 'Ajudar minha família']
    },
    {
        name: 'futuro',
        question: 'Como você imagina sua vida daqui a 5 anos?',
        other: 'Que outro futuro você pensa?',
        options: ['Com um diploma universitário e um bom emprego', 'Trabalhando no setor público ou estudando pra concurso', 'Ganhando dinheiro com meu próprio negócio', 'Não planejei']
    },
    {
        name: 'profissao',
        question: 'Que profissão você gostaria de seguir?',
        options: ['Ainda não escolhi', 'Profissão ligada às Engenharias / Ciências Tecnológicas.', 'Profissão ligada às Ciências Humanas.', 'Profissão ligada às Artes.', 'Profissão ligada às Ciências Biológicas e da Saúde.', 'Professor(a) de Ensino Fundamental e Médio.', 'Empreendedor.']
    },
    {
        name: 'decisao',
        question: 'O que ajudou você a tomar essa decisão sobre sua profissão?',
        other: 'Outra pessoa te ajudou? Quem?',
        options: ['Meus pais', 'A escola', 'Meus (Minhas) amigos(as)', 'Informações gerais, revistas, jornais, TV', 'Meu trabalho', 'Estímulo financeiro', 'Facilidade de obter emprego', 'Eu me identifico com essa profissão']
    },
    {
        question: 'Você considera que está preparado para o mercado de trabalho?',
        name: 'preparado',
    },
    {
        name: 'endereco',
        type: 'address',
    },
]