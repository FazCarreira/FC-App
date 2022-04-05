import { Button, Grid, Input, Typography } from "@mui/material";
import { useState } from "react";

const ImageInput = ({ file, onChange }) => {
    if (file) return (
        <Grid item sx={{ position: 'relative' }}>
            <Typography sx={{ position: 'absolute', backgroundColor: '#fff8', px: 2, py: 1 }}>Imagem atual</Typography>
            <Button
                component="label"
                sx={{ position: 'absolute', bottom: 0, backgroundColor: '#fff8', px: 2, py: 1 }}
            >
                Trocar Imagem
                <Input
                    accept="image/*"
                    multiple
                    name="uploadedFile"
                    type='file'
                    sx={{ display: 'none' }}
                    onChange={({ target }) => onChange(target.files[0])}
                />
            </Button>
            <img src={file.src} alt={file.key} style={{ height: 200 }} />
        </Grid>
    )
    else return (
        <Grid item>
            <Button
                variant="contained"
                component="label"
            >
                Carregar Imagem
                <Input
                    accept="image/*"
                    multiple
                    name="uploadedFile"
                    type='file'
                    sx={{ display: 'none' }}
                    onChange={({ target }) => onChange(target.files[0])}
                />
            </Button>

        </Grid>
    );
}

export default ImageInput;