import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import moment from "moment";

import { AuthenticationContext } from "../../services/AuthContext";
import { UserContext } from "../../services/UserContext";
import { PdfContext } from "../../services/PdfContext";
import AvaliacaoTurma from "./AvaliacaoTurma";
import Fill from "./Fill";

const CertificadoAluno = () => {

    const { user } = useContext(AuthenticationContext);
    const { getTurma, turma } = useContext(UserContext);
    const { gerarCertificado } = useContext(PdfContext);
    // eslint-disable-next-line
    useEffect(() => getTurma('aluno'), []);


    const pdf = () => {
        const aulaInicial = turma?.modulos?.reduce((curr, modulo) => moment.min(modulo.aulas.reduce((c, aula) => moment.min(moment(aula.dia), c), moment()), curr), moment());
        const aulaFinal = turma?.modulos?.reduce((curr, modulo) => moment.max(modulo.aulas.reduce((c, aula) => moment.max(moment(aula.dia), c), moment()), curr), moment());

        return ({
            user: user?.name,
            tipo: 'curso',
            name: 'Acelerando Talentos',
            ch: turma?.modulos?.reduce((total, { aulas }) => total + aulas.reduce((total, { hora_inicial, hora_final }) => total + (moment(hora_final).hour() - moment(hora_inicial).hour()), 0), 0),
            periodo: {
                dia: [aulaInicial?.format('DD'), aulaFinal?.format('DD')],
                mes: [aulaInicial?.format('MMMM'), aulaFinal?.format('MMMM')],
                ano: [aulaInicial?.format('YYYY'), aulaFinal?.format('YYYY')]
            },
            conteudo: turma?.modulos?.map(m => m.nome),
            align: 'left'
        })
    }

    const { download, uri } = gerarCertificado(pdf());
    const calcTotal = turma?.modulos?.reduce((total, { aulas }) => total + aulas?.length, 0)
    const calcProgresso = turma?.modulos?.reduce((total, { aulas }) => total + aulas?.reduce((total, c) => total + (c?.frequencia.some(f => f === user?._id) ? 1 : 0), 0), 0)

    if (calcProgresso >= calcTotal * 0.75) {
        if (user.profile.curso.opiniao) {
            return (<Box sx={{ height: 600 }}>
                <embed width='100%' height='100%' src={uri} />
                <Button onClick={download} fullWidth>Baixar PDF</Button>
            </Box>);
        }
        else return <AvaliacaoTurma turma={turma} />
    }
    else return <Fill aulas={calcTotal - calcProgresso} />
}


export default CertificadoAluno;