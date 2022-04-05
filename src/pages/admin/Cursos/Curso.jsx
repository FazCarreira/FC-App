import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Header, SubTitle, Title } from "../../../App/components/StyledComponents";

import { ConstantsContext } from "../../../services/ConstantsContext";
import { TrilhaContext } from "../../../services/TrilhaContext";

import Tabs from "./Tabs";

const Curso = () => {
    const { id, nome } = useParams();

    const { setMobileTitle } = useContext(ConstantsContext);
    const { getTurma, turma } = useContext(TrilhaContext);

    // eslint-disable-next-line
    useEffect(() => { getTurma(id); setMobileTitle(nome); }, []);

    return (
        <>
            <Header sx={{ borderRadius: 8 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Title component="h1">{nome}</Title>
                        <SubTitle component="h1">Turma {turma?.numero}</SubTitle>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }} >
                    </Grid>
                </Grid>
            </Header>
            <Tabs turma={turma} nomeCurso={nome} />
        </>
    );
}

export default Curso;