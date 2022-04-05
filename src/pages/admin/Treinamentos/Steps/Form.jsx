import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const Form = ({ data, updateData, icons }) => {

    const [formData, setFormData] = useState(data || { name: '', link: '', icon: 0 });

    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
        updateData({ ...formData, [target.name]: target.value });
    }

    return (
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                    <InputLabel>Icone</InputLabel>
                    <Select
                        label="Icone"
                        name="icon"
                        value={formData?.icon}
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
                    sx={{ m: 1, minWidth: 120 }}
                    name='name'
                    label='Nome do Material'
                    value={formData?.name}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={5}>
                <TextField
                    sx={{ m: 1, minWidth: 120 }}
                    name='link'
                    label='Link do Material'
                    value={formData?.link}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>

        </Grid>
    );
}

export default Form;