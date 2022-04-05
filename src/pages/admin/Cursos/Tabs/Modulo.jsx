import { useContext, useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, List, MenuItem, Select, TextField } from "@mui/material";
import { FaPlus } from "react-icons/fa";

import ModalForm from "../../../../App/components/ModalForm";
import RowItem from "../../../../App/components/RowItem";

import { AdminContext } from "../../../../services/AdminContext";
import { TrilhaContext } from "../../../../services/TrilhaContext";
import { ToolsContext } from "../../../../services/ToolsContext";

import AulaForm from "./AulaForm";
import ImageInput from "../../../../App/components/ImageInput";
import moment from "moment";

const Modulo = ({ modulo }) => {

    const { getUsers, parceiros } = useContext(AdminContext);
    const { uploadImage } = useContext(ToolsContext);
    const { updateModulo } = useContext(TrilhaContext);
    // eslint-disable-next-line
    useEffect(() => getUsers('facilitador'), []);
    const [formData, setFormData] = useState(modulo)

    const { link_aula, facilitador, ementa, aulas } = formData;
    const onChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });

    const onSave = async () => {
        updateModulo(formData, modulo._id);
    }
    const onReset = () => setFormData(modulo);

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const handleRemove = (m) => () => {
        const aulas = formData?.aulas?.filter((v, i) => i !== m);
        setFormData({ ...formData, aulas })
    }

    const handleEdit = (data, Component, i) => () => {
        setAction({
            title: data?.nome,
            body: <Component data={data} updateData={setData} />,
            onSave: async (nData) => {
                const { aulas } = formData;
                aulas[i] = nData;
                setFormData({ ...formData, aulas })
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const handleNew = (Component) => () => {
        const aulas = formData?.aulas || [];
        setAction({
            title: `Nova Aula - ${modulo.nome}`,
            body: <Component updateData={setData} aula={aulas?.[aulas.length - 1]} />,
            onSave: async (nData) => {
                aulas.push(nData);
                setFormData({ ...formData, aulas })
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const [imagem, setImagem] = useState(formData?.file || {});
    const onFile = async (fileIn) => {
        let fileData = new FormData();
        fileData?.append("uploadedFile", fileIn);
        const file = await uploadImage(fileData);
        setImagem(file)
        setFormData({ ...formData, file: file.id })
    }

    return (
        <>
            <Grid component='form' container spacing={2} sx={{ mt: 1 }} >
                <Grid item xs={6}>
                    <TextField
                        name='link_aula'
                        label='Link da Aula'
                        value={link_aula || ''}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='ementa'
                        label='Link da Ementa'
                        value={ementa || ''}
                        onChange={onChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Facilitador</InputLabel>
                        <Select
                            label="Facilitador"
                            name="facilitador"
                            value={facilitador || ''}
                            onChange={onChange}
                        >
                            {parceiros?.map(facilitador => facilitador?.profile?.tipo === 'fornecedor' ? false : (
                                <MenuItem key={facilitador._id} value={facilitador._id}>{facilitador?.name?.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || facilitador?.email}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <RowItem
                            avatar={<FaPlus size={32} color='#993399' />}
                            primary='Adicionar Aula'
                            onPress={handleNew(AulaForm)}
                        />
                        {aulas?.map((aula, i) => (
                            <RowItem
                                key={i}
                                primary={`Aula ${i + 1} - ${aula?.nome}`}
                                secondary={`${moment(aula?.dia).format('DD/MM/YYYY')} - ${moment(aula?.hora_inicial).format('HH:mm')} às ${moment(aula?.hora_final).format('HH:mm')}`}
                                onEdit={handleEdit(aula, AulaForm, i)}
                                onDelete={handleRemove(i)}
                            />
                        ))}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <ImageInput file={imagem} onChange={onFile} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button onClick={onSave} variant='contained' fullWidth sx={{ marginRight: 2 }}>
                        Salvar mudanças
                    </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button onClick={onReset} variant='outlined' fullWidth>
                        Resetar mudanças
                    </Button>
                </Grid>
            </Grid>

            <ModalForm open={open} data={data} onClose={() => setOpen(false)} {...action} />
        </>
    );
}

export default Modulo;