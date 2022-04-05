import { useContext, useEffect, useState } from "react";

import { TreinamentoContext } from "../../../services/TreinamentoContext";
import { AuthenticationContext } from "../../../services/AuthContext";
import { PdfContext } from "../../../services/PdfContext";

import { ControlledAccordion } from "../../../App/components/ControlledAccordion";
import Steps from "./Steps";
import moment from "moment";

const TreinamentosFacilitador = () => {

    const { user } = useContext(AuthenticationContext);
    const { treinamentos, getTreinamentos, participarTreinamentos } = useContext(TreinamentoContext);
    const { gerarCertificado } = useContext(PdfContext);

    // eslint-disable-next-line
    useEffect(() => getTreinamentos(), []);

    const [expanded, setExpanded] = useState('');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const pdf = (treinamento) => {
        const arrLast = treinamento?.etapas.length - 1;
        return ({
            user: user.name,
            tipo: 'treinamento',
            name: treinamento.nome,
            ch: treinamento?.etapas?.reduce((total, { hora_inicial, hora_final }) => total + (moment(hora_final).hour() - moment(hora_inicial).hour()), 0),
            periodo: {
                dia: [moment(treinamento?.etapas[0].dia).format('DD'), moment(treinamento?.etapas[arrLast].dia).format('DD')],
                mes: [moment(treinamento?.etapas[0].dia).format('MMMM'), moment(treinamento?.etapas[arrLast].dia).format('MMMM')],
                ano: [moment(treinamento?.etapas[0].dia).format('YYYY'), moment(treinamento?.etapas[arrLast].dia).format('YYYY')]
            },
            align: 'center'
        })
    }
    return (<>
        {treinamentos?.map((treinamento, i) => {
            const completed = treinamento.etapas.map(({ participantes }) => participantes.some(p => p === user._id)) || [];
            const allCompleted = completed.filter(c => c).length === treinamento.etapas.length;
            const { download, uri } = gerarCertificado(pdf(treinamento));
            return (
                <ControlledAccordion
                    key={i}
                    title={treinamento.nome}
                    expanded={expanded === treinamento.name}
                    onChange={handleChange(treinamento.name)}
                >
                    <Steps pdf={download} treinamento={treinamento} participarTreinamentos={participarTreinamentos} completed={completed} allCompleted={allCompleted} />
                </ControlledAccordion>
            )
        })}
    </>);
}

export default TreinamentosFacilitador;