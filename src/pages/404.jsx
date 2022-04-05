import React from 'react';
import { Grid, Paper, Typography, } from '@mui/material';
import styles from './auth/styles';

function NotFound() {
    const style = styles();

    return (
        <Grid container className={style.background}>
            <Grid item xs={12} sm={9} md={7} lg={5} style={{ margin: 'auto' }}>
                <Paper className={style.paper}>
                    <Typography
                        align='center'
                        component='h1'
                        variant='h3'
                        style={{ textTransform: 'uppercase', fontFamily: 'Righteous' }}>
                        Erro 404 - Página não encontrada
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default NotFound;