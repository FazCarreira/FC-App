import { useContext, useEffect, useState } from "react";

import { AuthenticationContext } from "../../services/AuthContext";
import { UserContext } from "../../services/UserContext";

import Fill from "./Fill";
import AvaliacaoTurma from "./AvaliacaoTurma";
import GerarCurriculo from "../../Forms/Currgen";
import { PdfContext } from "../../services/PdfContext";
import { Button } from "@mui/material";
import CurriculoForm from "./CurriculoForm";

const CurriculoAluno = () => {
    const { user } = useContext(AuthenticationContext);
    const { getTurma, turma, setCurrículo, getCurriculo, curriculo: currData } = useContext(UserContext);
    // eslint-disable-next-line
    useEffect(() => { getTurma('aluno'); getCurriculo(user?.profile?.curriculo) }, []);
    const [curriculo, setCurriculo] = useState(currData);
    useEffect(() => setCurriculo(currData), [currData, setCurriculo]);

    const gerarCurriculo = (dataIn) => {
        const { qualidades, profissional, endereco, formacao: f, profissional: p, voluntario: v } = dataIn;
        const allQualidades = ['Boa comunicação', 'Flexibilidade', 'Espírito de equipe', 'Autoconfiança', 'Capacidade de análise', 'Proatividade', 'Capacidade de adaptação', 'Gerenciamento do tempo', 'Inteligência emocional']
        const allAdjetivos = ['comunicativ<g>', 'flexível', 'trabalho em equipe', 'confiante', 'analític<g>', 'proativ<g>', 'com facilidade em me adaptar ao ambiente de trabalho', 'com capacidade de gerenciar bem o tempo', 'com inteligência emocional']
        const adjetivos = allQualidades.reduce((t, q, i) => qualidades.includes(q) ? `${t === '' ? t : `${t},`} ${allAdjetivos[i].replace('<g>', user?.profile?.genero === 'Feminino' ? 'a' : 'o')}` : t, '');
        const newCurriculo = {
            ...dataIn,
            resumo: `Sou um${user?.profile?.genero === 'Feminino' ? 'a' : ''} jovem${adjetivos} e estou em busca ${profissional ? (profissional.atual ? 'de novos desafios' : 'de novas oportunidades') : 'do primeiro emprego'}, de modo que seja possível colocar em prática os meus dons e talentos, além de contribuir para o desenvolvimento da organização como um todo.`,
            objetivo: `Em busca ${profissional ? (profissional.atual ? 'de novos desafios' : 'de novas oportunidades') : 'do primeiro emprego'}`,
            formacao: f ? [{ ...f, conclusao: f.conclusao.format('DD/MM/YYYY') }] : [],
            profissional: p ? [{ ...p, entrou: p.dt_inicio.format('DD/MM/YYYY'), saiu: p.atual ? 'Atual' : p.dt_fim.format('DD/MM/YYYY'), }] : [],
            voluntario: v ? [{ ...v, entrou: v.dt_inicio.format('DD/MM/YYYY'), saiu: v.atual ? 'Atual' : v.dt_fim.format('DD/MM/YYYY'), }] : [],
        }
        setCurrículo(newCurriculo);
        setCurriculo(newCurriculo);
    }

    const calcTotal = turma?.modulos?.reduce((total, { aulas }) => total + aulas?.length, 0)
    const calcProgresso = turma?.modulos?.reduce((total, { aulas }) => total + aulas?.reduce((total, c) => total + (c?.frequencia.some(f => f === user?._id) ? 1 : 0), 0), 0)

    if (calcProgresso >= calcTotal * 0.75) {
        if (user.profile.curso.opiniao) {
            if (user.profile.curriculo) return (
                // <Button onClick={pdf(curriculoPDF)}>BAIXAR CURRÍCULO</Button>
                <CurriculoForm onSetCurriculo={setCurrículo} user={user} curriculo={curriculo} />
            );
            else return <GerarCurriculo aluno={user} salvarCurr={gerarCurriculo} turma={turma} />
        }
        else return <AvaliacaoTurma turma={turma} />
    }
    else return <Fill aulas={calcTotal - calcProgresso} />
}

export default CurriculoAluno;