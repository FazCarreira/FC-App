import { MobileDatePicker } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";

const CursoForm = ({ data, updateData, ro }) => {

    const [formData, setFormData] = useState(data || { nome: '', instituicao: '', inicio: moment().subtract(1, 'year'), fim: moment(), ch: 0 });

    const { nome, instituicao, inicio, fim, ch } = formData;
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        updateData({ ...formData, [target.name]: target.value })
    };

    return (
        <Grid container spacing={1} sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={12} md={9}>
                <TextField
                    name='nome'
                    label='Qual o nome do curso?'
                    value={nome}
                    disabled={ro}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    name='ch'
                    label='Carga Horária'
                    value={ch}
                    disabled={ro}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField
                    name='instituicao'
                    label='Local de ensino'
                    value={instituicao}
                    disabled={ro}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6} md={2}>
                <MobileDatePicker
                    label='Inicio em'
                    value={inicio}
                    disabled={ro}
                    onChange={inicio => setFormData({ ...formData, inicio })}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item xs={6} md={2}>
                <MobileDatePicker
                    label='Fim em'
                    value={fim}
                    disabled={ro}
                    onChange={fim => setFormData({ ...formData, fim })}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
        </Grid>
    );
}

export default CursoForm;