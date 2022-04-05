import { useState } from "react";
import { MobileDatePicker } from "@mui/lab";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";

import moment from 'moment'

const ExpForm = ({ data, updateData }) => {

    const [formData, setFormData] = useState(data || {
        empresa: "",
        desc: "",
        dt_inicio: moment().subtract(1, 'week'),
        dt_fim: moment().add(1, 'week'),
        voluntario: false,
        atual: false,
    });

    const { empresa, desc, dt_inicio, dt_fim, atual } = formData;
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
        updateData({ ...formData, [target.name]: target.value });
    };
    const changeCheck = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.checked });
        updateData({ ...formData, [target.name]: target.checked });
    }

    return (
        <Grid container spacing={1} sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={12} md={6}>
                <TextField
                    name='empresa'
                    label='Nome da Empresa'
                    value={empresa}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <MobileDatePicker
                    label="Data inicial"
                    value={dt_inicio}
                    onChange={dt_inicio => setFormData({ ...formData, dt_inicio })}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <MobileDatePicker
                    label="Data fim"
                    disabled={atual}
                    value={atual ? moment() : dt_fim}
                    onChange={dt_fim => setFormData({ ...formData, dt_fim })}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField
                    name='desc'
                    label='Descreva suas funções'
                    value={desc}
                    onChange={onChange}
                    multiline
                    fullWidth
                />
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel control={<Checkbox value={atual} name='atual' onChange={changeCheck} />} label="Trabalha atualmente aqui?" />
            </Grid>
        </Grid>
    );
}

export default ExpForm;