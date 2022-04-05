import { useContext, useEffect, useState } from "react";
import { Button, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { MobileDatePicker, MobileTimePicker } from "@mui/lab";
import { FaFileExcel, FaFilePdf, FaFileVideo, FaPlus } from "react-icons/fa";

import { AdminContext } from "../../../../services/AdminContext";
import { ToolsContext } from "../../../../services/ToolsContext";
import { ConstantsContext } from "../../../../services/ConstantsContext";

import { SubTitle, Title } from "../../../../App/components/StyledComponents";
import RowItem from "../../../../App/components/RowItem";
import ModalForm from "../../../../App/components/ModalForm";
import MaterialForm from "../../../../App/components/MaterialForm";

const Step = ({ etapa, save }) => {
    const { uploadVideo } = useContext(ToolsContext);
    const { getUser, parceiros } = useContext(AdminContext);
    const { openLink } = useContext(ConstantsContext)

    const [formData, setFormData] = useState(etapa);
    // eslint-disable-next-line
    useEffect(() => getUser('facilitador'), []);
    useEffect(() => setFormData({ ...etapa, facilitador: etapa?.facilitador?._id || '' }), [setFormData, etapa]);
    const [file, setFile] = useState();
    useEffect(() => setFile(formData.file), [setFile, formData]);
    const [materiais, setMateriais] = useState();
    useEffect(() => setMateriais(formData.materiais), [setMateriais, formData]);

    const { link_aula, hora_inicial, hora_final, dia, facilitador } = formData;
    const onChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });
    const dateChange = name => value => onChange({ target: { name, value } });

    const onSave = () => save({ ...formData, materiais, file: file?.id || file?._id });
    // const onSave = () => console.log({ ...formData, materiais, file: file?.id });
    const onReset = () => setFormData(etapa);

    const onFile = async (fileIn) => {
        let fileData = new FormData();
        fileData.append("uploadedFile", fileIn);
        const file = await uploadVideo(fileData);
        setFile(file)
        setFormData({ ...formData, file })
    }

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});
    const [data, setData] = useState({});

    const novoMaterial = () => {
        setAction({
            title: 'Adicionar material',
            body: <MaterialForm updateData={setData} icons={icons} />,
            onSave: async (nData) => {
                const list = materiais;
                list.unshift(nData);
                setMateriais(list);
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const editMaterial = (data, i) => () => {
        setAction({
            title: data.nome,
            body: <MaterialForm data={data} updateData={setData} icons={icons} />,
            onSave: async (nData) => {
                const list = materiais;
                list[i] = nData;
                setMateriais(list);
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const delMaterial = (i) => () => {
        const list = materiais;
        setMateriais(list.filter((_, j) => j !== i));
    }

    return (<>
        <Title component="h1" sx={{ color: '#000', textAlign: 'center', mb: 2 }} >{etapa?.nome}</Title>
        <Grid container spacing={2} sx={{ mt: 1 }} >
            <Grid container spacing={2} item xs={12} md={6} >
                {file?.src ? (
                    <video src={file?.src} style={{ width: '100%' }} controls />
                ) : (
                    <img src="https://via.placeholder.com/500x300/?text=SEM%20V%C3%8DDEO" alt="Sem vídeo" style={{ width: '100%' }} />
                )
                }
            </Grid>
            <Grid container spacing={2} item xs={12} md={6} >
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                    >
                        Trocar Vídeo
                        <Input
                            accept="image/*"
                            multiple
                            name="uploadedFile"
                            type='file'
                            sx={{ display: 'none' }}
                            onChange={({ target }) => onFile(target.files[0])}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name='link_aula'
                        label='Link da Aula'
                        value={link_aula || ''}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MobileDatePicker
                        label="Data inicial"
                        value={dia}
                        onChange={dateChange("dia")}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MobileTimePicker
                        label="Horario de inico"
                        value={hora_inicial}
                        onChange={dateChange('hora_inicial')}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MobileTimePicker
                        label="Horario de fim"
                        value={hora_final}
                        onChange={dateChange('hora_final')}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Facilitador</InputLabel>
                        <Select
                            label="Facilitador"
                            name="facilitador"
                            value={facilitador || ''}
                            onChange={onChange}
                        >
                            {parceiros?.map(facilitador => <MenuItem key={facilitador?._id} value={facilitador?._id}>{facilitador?.name?.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || facilitador?.email}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button onClick={onSave} variant='contained' fullWidth sx={{ marginRight: 2 }}>
                        Salvar mudanças
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button onClick={onReset} variant='outlined' fullWidth>
                        Resetar mudanças
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <List>
                    <ListItem>
                        <SubTitle>Material de apoio</SubTitle>
                    </ListItem>
                    <ListItem button onClick={novoMaterial}>
                        <ListItemIcon>
                            <FaPlus />
                        </ListItemIcon>
                        <ListItemText primary="ADICIONAR MATERIAL" />
                    </ListItem>
                    <List component="div" disablePadding>
                        {materiais?.sort(iconSort).map((material, i) => <RowItem
                            key={i}
                            avatar={icons[material.icon]}
                            primary={material.nome}
                            onPress={openLink(material.link)}
                            onEdit={editMaterial(material, i)}
                            onDelete={delMaterial(i)}
                        />)}
                    </List>
                </List>
            </Grid>
        </Grid>
        <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
    </>);
}

const icons = [
    <FaFilePdf size={24} color='#20b1aa' />,
    <FaFileVideo size={24} color='#20b1aa' />,
    <FaFileExcel size={24} color='#20b1aa' />
]
const iconSort = (a, b) => a.icon - b.icon;

export default Step