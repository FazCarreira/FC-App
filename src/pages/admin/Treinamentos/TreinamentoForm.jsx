import { useState } from "react";
import { Grid } from "@mui/material";

import { treinamentoQuestions } from "../../../constants";
import Form from "../../../App/components/Form";

const TreinamentoForm = ({ data, updateData }) => {
    const [formData, setFormData] = useState(data ? { nome: data.nome, etapas: data.etapas.map(e => e.nome) } : { nome: '', etapas: '' });
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        updateData({ ...formData, [target.name]: target.value })
    };
    return (<>
        <Grid container spacing={2}>
            {treinamentoQuestions.map(q => <Form key={q.name} question={q} value={formData[q.name]} onChange={onChange} />)}
        </Grid>
    </>);
}

export default TreinamentoForm;