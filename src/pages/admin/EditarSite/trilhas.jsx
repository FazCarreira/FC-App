import { Avatar, Button, Checkbox, FormControl, Grid, IconButton, Input, InputLabel, List, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Form from "../../../App/components/Form";
import ModalForm from "../../../App/components/ModalForm";
import RowItem from "../../../App/components/RowItem";
import { Title } from "../../../App/components/StyledComponents";
import { AdminContext } from "../../../services/AdminContext";
import { ToolsContext } from "../../../services/ToolsContext";

const Trilhas = ({ editSite, trilhas }) => {
    const [list, setList] = useState(trilhas || []);

    useEffect(() => {
        if (trilhas) {
            setList(trilhas);
        }
    }, [trilhas]);

    const reset = () => setList(trilhas);
    const edit = () => editSite({ trilhas: list })

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const handleNew = () => {
        setAction({
            title: `Novo membro da equipe`,
            body: <TrilhaForm onData={setData} />,
            onSave: (nData) => {
                let arr = list;
                const data = {
                    ...nData, facilitadores: nData.facilitadores.map(f => f.facilitador ? ({
                        img: f.facilitador.img || f.facilitador.avatar,
                        name: f.facilitador.name,
                        ...f
                    }) : f)
                }
                arr.unshift(data);
                console.log(data);
                setList(arr);
                setOpen(false);
            }
        });
        setOpen(true);
    };

    const handleEdit = (o, i) => () => {
        setAction({
            title: `Editando ${o.name}`,
            body: <TrilhaForm data={o} onData={setData} />,
            onSave: (nData) => {
                let arr = list;
                const data = {
                    ...nData, facilitadores: nData.facilitadores.map(f => f.facilitador ? ({
                        img: f.facilitador.img || f.facilitador.avatar,
                        name: f.facilitador.name,
                        ...f
                    }) : f)
                }
                arr[i] = data;
                console.log(data);
                setList(arr);
                setOpen(false);
            }
        });
        setOpen(true);
    };

    const remove = (i) => () => setList(list.filter((_, j) => j !== i));

    return (<>
        <List>
            <RowItem
                avatar={<FaPlus />}
                primary={<Typography sx={{ fontFamily: 'Righteous' }}>Nova Trilha</Typography>}
                onPress={handleNew}
            />
            {list?.map((d, i) => (
                <RowItem
                    key={i}
                    primary={<Typography sx={{ fontFamily: 'Righteous' }}>{d?.name}</Typography>}
                    secondary={<Typography sx={{ maxWidth: '450px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {d?.desc}
                    </Typography>}
                    onEdit={handleEdit(d, i)}
                    onDelete={remove(i)}
                />
            ))}
        </List>
        <Button color="primary" variant="contained" onClick={edit} sx={{ m: 1 }}>Salvar</Button>
        <Button color="primary" variant="outlined" onClick={reset} sx={{ m: 1 }}>Resetar</Button>

        <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
    </>);
}

const TrilhaForm = ({ data, onData }) => {

    const { uploadImage } = useContext(ToolsContext);
    const { getUsers, parceiros } = useContext(AdminContext);
    // eslint-disable-next-line
    useEffect(() => getUsers('facilitador'), []);

    const [formData, setFormData] = useState(data);
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        onData({ ...formData, [target.name]: target.value })
    };

    const onFile = async (fileIn, i) => {
        let fileData = new FormData();
        fileData.append("uploadedFile", fileIn);
        const file = await uploadImage(fileData);
        const value = formData?.facilitadores;
        value[i].img = file.src
        onChange({ target: { name: 'facilitadores', value } })
    }

    const trilhaArr = [{
        question: 'Animacao da Trilha',
        name: 'animacao',
        type: 'select',
        options: ['Nenhuma', 'Animação Acelerando Talentos', 'Animação Mulheres Provedoras'],
    }, {
        question: 'Nome da Trilha',
        name: 'name',
    }, {
        question: 'Chamada da Trilha',
        name: 'chamada',
    }, {
        question: 'Carga Horária do curso',
        name: 'horas',
    }, {
        question: 'Descrição da Trilha',
        name: 'desc',
        multi: true,
        full: true
    }, {
        question: 'Incio da Trilha',
        name: 'inicio',
        type: 'date',
        half: true
    }, {
        question: 'Fim da Trilha',
        name: 'fim',
        type: 'date',
        half: true
    }, {
        question: 'Encerramento das inscrições',
        name: 'inscricoes',
        type: 'date',
        half: true
    }, {
        question: 'Valor do investimento',
        mask: '999,99',
        name: 'investimento',
        half: true
    },]

    const addRow = (type) => () => {
        const arr = formData?.[type] || [];
        arr.push({ facilitador: '', link: '', desc: '', name: '', about: '' });
        setFormData({ ...formData, [type]: arr });
        onData({ ...formData, [type]: arr });
    }

    const handleRow = (i, type) => ({ target }) => {
        const arr = formData?.[type];
        arr[i][target.name] = target.value;
        setFormData({ ...formData, [type]: arr });
        onData({ ...formData, [type]: arr });
    }

    const removeRow = (i, type) => _ => {
        const arr = formData?.[type].filter((a, j) => j !== i);
        setFormData({ ...formData, [type]: arr });
        onData({ ...formData, [type]: arr });
    }

    // const handleChangeRow = (i, type) => ({ target }) => {
    //     const arr = formData?.[type];
    //     arr[i][target.name] = target.value;
    //     setFormData({ ...formData, [type]: arr });
    //     onData({ ...formData, [type]: arr });
    // }

    return (
        <Grid container spacing={2} alignItems='center'>
            {trilhaArr.map(q => <Form key={q.name} question={q} value={formData?.[q.name]} onChange={onChange} />)}
            <Button sx={{ mt: 3 }} onClick={addRow('facilitadores')} fullWidth >
                Adicionar Facilitador
            </Button>
            {formData?.facilitadores?.map((facilitador, i) => (<Fragment key={i}>
                <Grid item xs={4}>
                    <TextField
                        name='name'
                        label='Nome do Facilitador'
                        value={facilitador?.name}
                        onChange={handleRow(i, 'facilitadores')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        name='link'
                        label='Link associado'
                        value={facilitador?.link}
                        onChange={handleRow(i, 'facilitadores')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <Stack direction='row'>
                        <Avatar src={facilitador?.img} />
                        <Button
                            component="label"
                        >
                            Trocar Imagem
                            <Input
                                accept="image/*"
                                multiple
                                name="uploadedFile"
                                type='file'
                                sx={{ display: 'none' }}
                                onChange={({ target }) => onFile(target.files[0], i)}
                            />
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        name='desc'
                        label='Descrição das Funções do facilitador'
                        value={facilitador?.desc}
                        onChange={handleRow(i, 'facilitadores')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={removeRow(i, 'facilitadores')}><FaTrash /></IconButton>
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
            </Fragment>))}
            <Button sx={{ mt: 3 }} onClick={addRow('modulos')} fullWidth >
                Adicionar Módulo
            </Button>
            {formData?.modulos?.map((modulo, i) => (<Fragment key={i}>
                <Grid item xs={11}>
                    <TextField
                        name='name'
                        label='Nome do Módulo'
                        value={modulo?.name}
                        onChange={handleRow(i, 'modulos')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={removeRow(i, 'modulos')}><FaTrash /></IconButton>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='desc'
                        label='Descríção do módulo'
                        value={modulo?.desc}
                        onChange={handleRow(i, 'modulos')}
                        fullWidth
                        multiline
                        minRows={2}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='about'
                        label='Tópicos Abordados'
                        value={modulo?.about}
                        onChange={handleRow(i, 'modulos')}
                        fullWidth
                        multiline
                        minRows={2}
                    />
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
            </Fragment>))}
        </Grid>
    );
}

export default Trilhas;