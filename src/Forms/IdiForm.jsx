import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const IdiForm = ({ data, updateData, ro }) => {

    const [formData, setFormData] = useState(data || { idioma: '', nivel: 'Básico', outro: '' });

    const { idioma, nivel, outro } = formData;
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        updateData({ ...formData, [target.name]: target.value })
    };

    return (
        <Grid container spacing={1} sx={{ m: 1, minWidth: 120 }}>
            <Grid item xs={12} md={idioma === '-' ? 4 : 8}>
                <FormControl fullWidth>
                    <InputLabel>Idioma</InputLabel>
                    <Select
                        value={idioma}
                        name='idioma'
                        label="Idioma"
                        disabled={ro}
                        onChange={onChange}
                    >
                        {idiomas.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                        <MenuItem value={'-'}>Outro</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {idioma === '-' && <Grid item xs={12} md={4}>
                <TextField
                    name='outro'
                    label='Idioma'
                    value={outro}
                    disabled={ro}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>}
            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <InputLabel>Nível</InputLabel>
                    <Select
                        value={nivel}
                        name='nivel'
                        label="Nível"
                        disabled={ro}
                        onChange={onChange}
                    >
                        {niveis.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

const idiomas = ['Português', "Inglês", 'Espanhol'];
const niveis = ['Básico', 'Intermediário', 'Avançado', 'Fluente']

export default IdiForm;