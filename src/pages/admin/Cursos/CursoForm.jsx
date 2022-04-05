import { useState } from "react";
import { MobileDatePicker } from "@mui/lab";
import { Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import moment from "moment";

const CursoForm = ({ data, updateData }) => {

    const [geral, setGeral] = useState(data || {
        instituicao: [],
        matriculas: {
            inicio: moment()._d,
            fim: moment().add(1, 'week')._d,
        }
    });

    const handleGeral = ({ target }) => {
        const { name, value } = target;
        setGeral({ ...geral, [name]: typeof value === 'string' ? value.split(',') : value })
        updateData({ ...data, [name]: value });
    };

    const dateGeral = (n) => (v) => {
        setGeral({ ...geral, matriculas: { ...geral.matriculas, [n]: v._d } })
        updateData({ ...data, matriculas: { ...geral.matriculas, [n]: v._d } });
    }

    return (
        <Grid container spacing={2} sx={{ mt: 1 }} >
            <Grid item xs={12} md={3}>
                <MobileDatePicker
                    label="Inicio das matrículas"
                    value={geral.matriculas?.inicio}
                    onChange={dateGeral('inicio')}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <MobileDatePicker
                    label="Fim das matrículas"
                    value={geral.matriculas?.fim}
                    onChange={dateGeral('fim')}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id='instituicao'>Instituição da turma</InputLabel>
                    <Select
                        labelId='instituicao'
                        required multiple
                        name='instituicao'
                        onChange={handleGeral}
                        input={<OutlinedInput label='Instituição da turma' />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        value={geral.instituicao}
                    >
                        {['IPOM', 'Movimento Saúde Mental', 'Projeto Filhos do Rei', 'Projeto Bom Jesus', 'Somos Um'].map(i => (
                            <MenuItem key={i} value={i}>
                                <Checkbox checked={geral.instituicao.indexOf(i) > -1} />
                                <ListItemText primary={i} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default CursoForm;