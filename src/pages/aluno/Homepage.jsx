import { useContext, useEffect } from "react";
import { Stack } from "@mui/material";

import { ConstantsContext } from "../../services/ConstantsContext";
import { BorderLinearProgress, Desc, SubTitle, Title } from "../../App/components/StyledComponents";
import { UserContext } from "../../services/UserContext";
import { AuthenticationContext } from "../../services/AuthContext";

const AlunoHome = () => {
    let { user } = useContext(AuthenticationContext);
    const { setCustomTitle, setHeaderRight } = useContext(ConstantsContext);
    const { getTurma, turma } = useContext(UserContext);
    // eslint-disable-next-line
    useEffect(() => getTurma('aluno'), []);
    useEffect(() => setCustomTitle("TRILHA ACELERANDO TALENTOS"), [setCustomTitle])

    const calcTotal = turma?.modulos?.reduce((total, { aulas }) => total + aulas?.length, 0)
    const calcProgresso = turma?.modulos?.reduce((total, { aulas }) => total + aulas?.reduce((total, c) => total + (c?.frequencia.some(f => f === user?._id) ? 1 : 0), 0), 0)

    useEffect(() => setHeaderRight(<Stack>
        <Desc>Seu Progresso</Desc>
        <BorderLinearProgress variant="determinate" color="fazcarreira" value={(100 * calcProgresso) / calcTotal} />
    </Stack>), [setHeaderRight, calcTotal, calcProgresso])

    return (<Stack>
        <Title sx={{ my: 2 }}>Bem-vindo(a)</Title>
        <Desc>
            Você está prestes a encarar uma jornada de muito aprendizado e de aceleração dos seus talentos e habilidades! Estamos entusiasmadas por compartilhar esse momento com você, pois queremos te ajudar a desenvolver as soft skill mais procuradas pelos empregadores no Brasil e no mundo.
        </Desc>
        <Title sx={{ my: 2 }}>O que você vai aprender?</Title>
        <Desc>
            - Como ter uma inteligência emocional saudável por meio do desenvolvimento de seus pilares;
        </Desc>
        <Desc>
            - Como utilizar a comunicação de forma prática para se expressar melhor e compartilhar suas ideias claramente;
        </Desc>
        <Desc>
            - Transformar conflitos em oportunidades de crescimento e pertencimento;
        </Desc>
        <Desc>
            - Identificar e desenvolver seu potencial por meio do autoconhecimento.
        </Desc>
        <Title sx={{ mt: 2 }}>O que preciso saber?</Title>
        <SubTitle sx={{ my: 2 }}>Antes de começar:</SubTitle>
        <Desc>
            - Atenção plena é essencial! Para isso ache um local tranquilo e silencioso para assistir às aulas.
        </Desc>
        <Desc>
            - Cuide da sua postura e do seu conforto.
        </Desc>
        <Desc>
            - Prepare lanchinhos e água com antecedência.
        </Desc>
        <Desc>
            - Teste sua conexão à internet uns 30 minutos antes e se o app do Zoom está pronto para usar!
        </Desc>
        <SubTitle sx={{ my: 2 }}>E durante a aula?</SubTitle>
        <Desc>
            - Tente manter a câmera ligada. Queremos conhecer você!
        </Desc>
        <Desc>
            - Mantenha o microfone no mudo e religue quando precisar falar.
        </Desc>
        <Desc>
            - Silencie as notificações do seu celular ou computador.
        </Desc>
        <Desc>
            - Use fones de ouvido.
        </Desc>
        <Desc>
            - Toda pergunta é bem-vinda e peça ajuda se precisar.
        </Desc>
        <Desc>
            - Participe com objetividade e respeite a ordem das falas.
        </Desc>
        {/* <Title sx={{ my: 2 }}>Se apresente para a turma</Title>
        <p>DESABILITADO</p> */}
    </Stack>);
}

export default AlunoHome;