import { useContext, useEffect } from "react";
import { AutoAccordion } from "../../App/components/ControlledAccordion";

import { UserContext } from "../../services/UserContext";
import Tabs from "./Tabs";

const FacilitadorCursos = () => {
    const { getTurma, turma } = useContext(UserContext);
    // eslint-disable-next-line
    useEffect(() => getTurma('facilitador'), []);
    const arr = turma?.map(turma => ({
        name: `Acelerando Talentos - T${turma.numero}`,
        render: <Tabs modulos={turma.modulos} turma={turma} />
    }))

    return (<AutoAccordion array={arr} />);
}

export default FacilitadorCursos;