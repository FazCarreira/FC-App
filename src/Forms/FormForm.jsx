import { MobileDatePicker } from "@mui/lab";
import { Checkbox, FormControlLabel, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

import moment from 'moment'

const FormForm = ({ data, updateData }) => {

    const [formData, setFormData] = useState(data || {
        nome: "",
        instituicao: "",
        conclusao: moment().add(1, 'year'),
        atual: false
    });

    const { nome, instituicao, conclusao, atual } = formData;
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        updateData({ ...formData, [target.name]: target.value })
    };

    return (
        <Grid container spacing={1} sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={12} md={8}>
                <FormControl fullWidth>
                    <InputLabel>Escolaridade</InputLabel>
                    <Select
                        value={nome}
                        name='nome'
                        label='Escolaridade'
                        onChange={onChange}
                    >
                        {ensino.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                        {/* <MenuItem value={'-'}>Outro</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
                <MobileDatePicker
                    label={atual ? "Previsão de conclusão" : "Concluido em"}
                    value={conclusao}
                    onChange={conclusao => setFormData({ ...formData, conclusao })}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField
                    name='instituicao'
                    label='Local de ensino'
                    value={instituicao}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControlLabel control={<Checkbox value={atual} onChange={({ target }) => setFormData({ ...formData, atual: target.checked })} />} label="Estuda atualmente aqui?" />
            </Grid>
        </Grid>
    );
}

const ensino = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior']

export default FormForm;