import { FormControl, Grid, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { FaFileExcel, FaFilePdf, FaFileVideo, FaPlus } from "react-icons/fa";
import RowItem from "../../../../App/components/RowItem";

const MaterialForm = ({ modulo, updateData }) => {

    const initMaterial = { nome: '', link: '', icon: 0 }

    const [materiais, setMateriais] = useState(modulo.materiais);
    const [material, setMaterial] = useState(initMaterial);

    const onChange = ({ target }) => setMaterial({ ...material, [target.name]: target.value });

    const adicionarMaterial = () => {
        const list = materiais;
        list.unshift(material);
        setMaterial(initMaterial);
        setMateriais(list);
        updateData(list);
    }

    const removeMaterial = (m) => () => {
        const list = materiais.filter(v => v !== m);
        setMateriais(list);
        updateData(list);
    }

    const editMaterial = (m) => () => {
        const list = materiais.filter(v => v !== m);
        setMateriais(list);
        setMaterial(m);
        updateData(list);
    }

    return (
        <Grid item xs={12} md={12} sx={{ display: 'inline' }}>
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
                                value={material.nome}
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
                                value={material.link}
                                onChange={onChange}
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
    );
}

export default MaterialForm;

const icons = [
    <FaFilePdf size={24} />,
    <FaFileVideo size={24} />,
    <FaFileExcel size={24} />
]