import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Video = ({ video, editSite }) => {

    const [formData, setFormData] = useState(video || '');

    useEffect(() => { if (video) setFormData(video) }, [video]);

    const onChange = ({ target }) => setFormData(target.value);

    const reset = () => setFormData(video);

    const edit = () => editSite({ video: formData })

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Se o campo estiver em branco, o vídeo não aparecerá no site</Typography>
            </Grid>
            <Grid item xs={10}>
                <TextField
                    label="Link do Youtube" fullWidth
                    value={formData}
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

export default Video;