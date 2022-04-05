import { useState } from "react";
import { Grid } from "@mui/material";

import Form from "../../../App/components/Form";

import { userQuestions } from "../../../constants";

const CadastroForm = ({ data, updateData, localRole }) => {

    const [formData, setFormData] = useState(data || {
        email: "",
        phone: "",
        name: "",
        role: localRole
    });
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        updateData({ ...formData, [target.name]: target.value })
    };

    return (
        <Grid component='form' container spacing={2}>
            {userQuestions.map(q => <Form key={q.name} question={q} value={formData[q.name]} onChange={onChange} />)}
        </Grid>
    );
}

export default CadastroForm;