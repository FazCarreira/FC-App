import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Contato = ({ contato, editSite }) => {

    const [formData, setFormData] = useState(contato || {
        local: "",
        email: "",
        telefone: ['', '']
    });

    useEffect(() => { if (contato) setFormData(contato) }, [contato]);

    const onChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });
    const handleTelefone = (n) => ({ target }) => {
        const telefone = [...formData.telefone];
        telefone[n] = target.value;
        setFormData({ ...formData, telefone });
    }

    const reset = () => setFormData(contato);

    const edit = () => editSite({ contato: formData })

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Se o campo estiver em branco, não aparecerá no site</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label="Telefone" fullWidth
                    value={formData?.telefone[0]}
                    onChange={handleTelefone(0)}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label="Telefone" fullWidth
                    value={formData?.telefone[1]}
                    onChange={handleTelefone(1)}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField label="Email" fullWidth
                    name='email'
                    value={formData?.email}
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField label="Localização" fullWidth
                    name='local'
                    value={formData?.local}
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button color="primary" variant="contained" onClick={edit} sx={{ m: 1 }}>Salvar</Button>
                <Button color="primary" variant="outlined" onClick={reset} sx={{ m: 1 }}>Resetar</Button>
            </Grid>

        </Grid>
    );
}

export default Contato;