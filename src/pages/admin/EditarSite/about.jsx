import { Button, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Form from "../../../App/components/Form";
import ImageInput from "../../../App/components/ImageInput";
import ModalForm from "../../../App/components/ModalForm";
import RowItem from "../../../App/components/RowItem";
import { Title } from "../../../App/components/StyledComponents";
import { ToolsContext } from "../../../services/ToolsContext";

const About = ({ editSite, about }) => {

    const [formData, setFormData] = useState(about || {
        video: '',
        video2: '',
        time: [],
        feitos: {
            jovens: '',
            turmas: '',
            estados: '',
            empresas: '',
            insercoes: '',
            impactados: '',
        },
        text1: '',
        text2: '',
        bginfo: ''
    });

    useEffect(() => { if (about) setFormData(about) }, [about]);

    const onChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });

    const onFeitos = ({ target }) => setFormData({ ...formData, feitos: { ...formData.feitos, [target.name]: target.value } });
    const feitosArr = [{
        question: `Número de Jovens capacitados`,
        name: 'jovens',
    }, {
        question: `Número de Turmas realizadas`,
        name: 'turmas',
    }, {
        question: `Número de Estados do Nordeste`,
        name: 'estados',
    }, {
        question: `Número de Empresas parcerias`,
        name: 'empresas',
    }, {
        question: `Porcentagem de Jovens inseridos no mercado`,
        mask: '99%',
        name: 'insercoes',
    }, {
        question: `Número de Pessoas impactadas indiretamente`,
        name: 'impactados',
    },]
    const textosArr = [{
        question: `Texto do quem somos`,
        name: 'text1',
        full: true,
        multi: true,
    }, {
        question: `Texto 2 do quem somos`,
        name: 'text2',
        full: true,
        multi: true,
    }, {
        question: `E é assim que a gente Faz Carreira`,
        name: 'bginfo',
        full: true,
        multi: true,
    }]

    const reset = () => setFormData(about);
    const edit = () => editSite({ about: formData })

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});
    const handleNew = () => {
        setAction({
            title: `Novo membro da equipe`,
            body: <TimeForm onData={setData} />,
            onSave: (nData) => {
                let value = formData?.time || [];
                value.unshift(nData);
                onChange({ target: { name: 'time', value } })
                setOpen(false);
            }
        });
        setOpen(true);
    };

    const handleEdit = (o, i) => () => {
        setAction({
            title: `Editando ${o.nome}`,
            body: <TimeForm data={o} onData={setData} />,
            onSave: (nData) => {
                let value = formData?.time;
                value[i] = nData;
                onChange({ target: { name: 'time', value } })
                setOpen(false);
            }
        });
        setOpen(true);
    };

    const remove = (i) => () => {
        let value = formData?.time?.filter((_, j) => j !== i);
        onChange({ target: { name: 'time', value } })
    };

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField label="Video institucional 1" fullWidth
                    name='video'
                    value={formData?.video}
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField label="Video institucional 2" fullWidth
                    name='video2'
                    value={formData?.video2}
                    onChange={onChange}
                />
            </Grid>
            {feitosArr.map(q => <Form key={q.name} question={q} value={formData?.feitos?.[q.name] || ''} onChange={onFeitos} />)}
            {textosArr.map(q => <Form key={q.name} question={q} value={formData?.[q.name] || ''} onChange={onChange} />)}
            <Grid item xs={12} md={12}>
                <List>
                    <ListItem>
                        <Title>Equipe Faz Carreira:</Title>
                    </ListItem>
                    <RowItem
                        avatar={<FaPlus />}
                        primary={<Typography sx={{ fontFamily: 'Righteous' }}>Novo Membro da equipe</Typography>}
                        onPress={handleNew}
                    />
                    {formData?.time?.map((d, i) => (
                        <RowItem
                            key={i}
                            avatar={d?.src}
                            primary={<Typography sx={{ fontFamily: 'Righteous' }}>{d?.nome}</Typography>}
                            secondary={<Typography sx={{ maxWidth: '450px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {d?.desc}
                            </Typography>}
                            onEdit={handleEdit(d, i)}
                            onDelete={remove(i)}
                        />
                    ))}
                </List>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button color="primary" variant="contained" onClick={edit} sx={{ m: 1 }}>Salvar</Button>
                <Button color="primary" variant="outlined" onClick={reset} sx={{ m: 1 }}>Resetar</Button>
            </Grid>

        </Grid>
        <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
    </>);
}

const TimeForm = ({ data, onData }) => {

    const { uploadImage } = useContext(ToolsContext);

    const [formData, setFormData] = useState(data);
    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
        onData({ ...formData, [target.name]: target.value, src: formData?.src })
    };

    const onFile = async (fileIn) => {
        let fileData = new FormData();
        fileData.append("uploadedFile", fileIn);
        const file = await uploadImage(fileData);
        setFormData({ ...formData, src: file.src })
        onData({ ...formData, src: file.src })
    }

    const membroArr = [{
        question: `Nome do membro da equipe`,
        name: 'nome',
    }, {
        question: `Função do membro da equipe`,
        name: 'desc',
    }, {
        question: `Link do membro da equipe`,
        name: 'link',
    }]

    return (
        <Grid container spacing={2}>
            {membroArr.map(q => <Form key={q.name} question={q} value={formData?.[q.name]} onChange={onChange} />)}
            <ImageInput file={{ src: formData?.file }} onChange={onFile} />
        </Grid>
    );
}

export default About;