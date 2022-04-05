import { useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const MaterialForm = ({ data, updateData, icons }) => {
    const [formData, setFormData] = useState(data || { nome: '', link: '', icon: '' });
    const { nome, link, icon } = formData;

    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
        updateData({ ...formData, [target.name]: target.value });
    }

    return (<Grid container spacing={1}>
        <Grid item xs={12} md={1}>
            <FormControl fullWidth>
                <InputLabel>Icone</InputLabel>
                <Select
                    label="Icone"
                    name="icon"
                    value={icon}
                    onChange={onChange}
                >
                    {icons.map((v, i) => (
                        <MenuItem key={i} value={i}>{v}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
            <TextField
                sx={{ minWidth: 120 }}
                name='nome'
                label='Nome do material'
                value={nome}
                onChange={onChange}
                fullWidth
                required
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                sx={{ minWidth: 120 }}
                name='link'
                label='Link do material'
                value={link}
                onChange={onChange}
                fullWidth
                required
            />
        </Grid>
    </Grid>);
}

export default MaterialForm;