import { useState } from "react";
import { FormControl, Grid, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { MobileDatePicker, MobileTimePicker } from "@mui/lab";
import moment from "moment";
import { FaFileExcel, FaFilePdf, FaFileVideo, FaPlus } from "react-icons/fa";

import RowItem from "../../../../App/components/RowItem";

const AulaForm = ({ data, updateData, aula }) => {

    const [formData, setFormData] = useState(data || { nome: '', dia: moment(aula?.dia).add(1, 'd') || moment(), hora_inicial: aula?.hora_inicial || moment(), hora_final: aula?.hora_final || moment().add(2, 'h'), materiais: [] });
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
        updateData({ ...formData, [target.name]: target.value });
    }
    const dateChange = name => value => onChange({ target: { name, value } });

    const initMaterial = { nome: '', link: '', icon: 0 }

    const [materiais, setMateriais] = useState(data?.materiais || []);
    const [material, setMaterial] = useState(initMaterial);

    const onMaterial = ({ target }) => setMaterial({ ...material, [target.name]: target.value });

    const adicionarMaterial = () => {
        const value = materiais;
        value.unshift(material);
        setMaterial(initMaterial);
        setMateriais(value);
        onChange({ target: { name: 'materiais', value } })
    }

    const removeMaterial = (m) => () => {
        const value = materiais.filter(v => v !== m);
        setMateriais(value);
        onChange({ target: { name: 'materiais', value } })
    }

    const editMaterial = (m) => () => {
        const value = materiais.filter(v => v !== m);
        setMaterial(m);
        setMateriais(value);
        onChange({ target: { name: 'materiais', value } })
    }

    return (
        <Grid container spacing={2} sx={{ mt: 1 }} >
            <Grid item xs={12} md={6}>
                <TextField
                    name='nome'
                    label='Nome para a Aula'
                    value={formData.nome}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <MobileDatePicker
                    label="Dia"
                    value={formData.dia}
                    onChange={dateChange("dia")}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <MobileTimePicker
                    label="Horario de inico"
                    value={formData.hora_inicial}
                    onChange={dateChange('hora_inicial')}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <MobileTimePicker
                    label="Horario de fim"
                    value={formData.hora_final}
                    onChange={dateChange('hora_final')}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'inline' }}>
                <List>
                    <ListItem>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={1}>
                                <FormControl fullWidth>
                                    <InputLabel>Icone</InputLabel>
                                    <Select
                                        label="Icone"
                                        name="icon"
                                        value={material.icon}
                                        onChange={onMaterial}
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
                                    value={material.name}
                                    onChange={onMaterial}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={{ minWidth: 120 }}
                                    name='link'
                                    label='Link do material'
                                    value={material.link}
                                    onChange={onMaterial}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem button onClick={adicionarMaterial} >
                        <ListItemIcon>
                            <FaPlus />
                        </ListItemIcon>
                        <ListItemText primary="ADICIONAR MATERIAL" />
                    </ListItem>
                    {materiais.map((m, i) => (<RowItem
                        key={i}
                        avatar={icons[m.icon]}
                        primary={m.nome}
                        secondary={m.link}
                        onDelete={removeMaterial(m)}
                        onEdit={editMaterial(m)}
                    />
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}

const icons = [
    <FaFilePdf size={24} />,
    <FaFileVideo size={24} />,
    <FaFileExcel size={24} />
]

export default AulaForm;