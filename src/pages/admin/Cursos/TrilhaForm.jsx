import { useState } from "react";
import { Grid } from "@mui/material";

import Form from "../../../App/components/Form";
import { trilhaQuestions } from "../../../constants";

const TrilhaForm = ({ data, updateData }) => {

    const [formData, setFormData] = useState(data || trilhaQuestions.reduce((a, q) => ({ ...a, [q.name]: '' }), {}));
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        updateData({ ...formData, [target.name]: target.value })
    };
    return (<>
        <Grid container spacing={2}>
            {trilhaQuestions.map(q => <Form key={q.name} question={q} value={formData[q.name]} onChange={onChange} />)}
        </Grid>
    </>);
}

export default TrilhaForm;