import { useContext, useEffect, useState } from "react";
import { Button, Grid, List, Stack, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";

import RowItem from "../../../App/components/RowItem";
import ModalForm from "../../../App/components/ModalForm";
import Form from "../../../App/components/Form";
import ImageInput from "../../../App/components/ImageInput";
import { ToolsContext } from "../../../services/ToolsContext";

const ParceiroCards = ({ info, editSite, name, type }) => {

    const [list, setList] = useState(info || ['na']);
    const [effect, setEffect] = useState(info?.map(_ => false) || [false]);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const [data, setData] = useState({});

    useEffect(() => {
        if (info) {
            setList(info);
            setEffect(info?.map(_ => false));
        }
    }, [info]);

    const remove = (r, i) => () => {
        setList(list.filter(v => v !== r));
        const arr = effect;
        arr[i] = 'del';
        setEffect(arr);
    };

    // const handleCancel = (r, i) => () => {
    //     const arr = effect;
    //     arr[i] = false;
    //     setEffect(arr);
    //     setList(oldList => info.filter(i => oldList.some(l => l === i) || i === r));
    // }

    const reset = () => {
        setList(info);
        setEffect(info?.map(_ => false));
    };
    const edit = () => editSite({ [name]: list });

    const handleNew = () => {
        setAction({
            title: `Nov${info?.[0]?.desc ? 'a' : 'o'} ${name}`,
            body: <ParceiroForm onData={setData} type={type} />,
            onSave: (nData) => {
                let arr = list;
                let arr2 = effect
                arr.unshift(nData);
                arr2.unshift('new');
                setList(arr);
                console.log(arr);
                setEffect(arr2);
                setOpen(false);
            }
        });
        setOpen(true);
    };

    const handleEdit = (o, i) => () => {
        setData({ ...o, file: o?.file._id })
        setAction({
            title: `Editando ${o.name || o.nome}`,
            body: <ParceiroForm data={o} onData={setData} type={type} />,
            onSave: (opn) => {
                let arr = list;
                let arr2 = effect
                arr[i] = opn;
                arr2[i] = 'edit';
                setList(arr);
                setEffect(arr2);
                setOpen(false);
            }
        });
        setOpen(true);
    };

    return (<>
        <List>
            <RowItem
                avatar={<FaPlus />}
                primary={<Typography sx={{ fontFamily: 'Righteous' }}>Criar {name}</Typography>}
                onPress={handleNew}
            />
            {info?.map((d, i) => (
                <RowItem
                    key={i}
                    avatar={d?.file?.src}
                    primary={<Typography sx={{ fontFamily: 'Righteous' }}>{d?.name || d?.nome}</Typography>}
                    secondary={<Typography sx={{ maxWidth: '450px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {d?.desc || d?.link}
                    </Typography>}
                    status={effect[i]}
                    // onCancel={!!effect[i] && handleCancel(d, i)}
                    onEdit={!effect[i] && handleEdit(d, i)}
                    onDelete={!effect[i] && remove(d, i)}
                />
            ))}
        </List>
        <Button color="primary" variant="contained" onClick={edit} sx={{ m: 1 }}>Salvar</Button>
        <Button color="primary" variant="outlined" onClick={reset} sx={{ m: 1 }}>Resetar</Button>

        <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
    </>);
}

const ParceiroForm = ({ data, onData, type }) => {

    const { uploadImage } = useContext(ToolsContext);

    const [formData, setFormData] = useState(data);
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        onData({ ...formData, [target.name]: target.value, file: formData?.file?._id || formData?.file?.id })
    };


    const onFile = async (fileIn) => {
        let fileData = new FormData();
        fileData.append("uploadedFile", fileIn);
        const file = await uploadImage(fileData);
        setFormData({ ...formData, file })
        onData({ ...formData, file: file.id })
    }

    const parceiroArr = [{
        question: `Nome do ${type}`,
        name: 'name',
        full: true
    }, {
        question: `Link do site do ${type}`,
        name: 'link',
        full: true
    }]

    const opiniaoArr = [{
        question: 'Nome do aluno',
        name: 'nome',
        full: true
    }, {
        question: 'Opinião',
        name: 'desc',
        full: true
    }]

    return (
        <Stack direction='row' spacing={2}>
            <ImageInput file={formData?.file} onChange={onFile} />
            <Grid container spacing={2}>
                {type === 'opinioes' ? (
                    opiniaoArr.map(q => <Form key={q.name} question={q} value={formData?.[q.name]} onChange={onChange} />)
                ) : (
                    parceiroArr.map(q => <Form key={q.name} question={q} value={formData?.[q.name]} onChange={onChange} />)
                )}
            </Grid>
        </Stack>
    );
}

export default ParceiroCards;