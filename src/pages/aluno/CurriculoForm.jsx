import { useContext, useEffect, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, List, Paper, Radio, RadioGroup, Stack } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { SiMicrosoftexcel, SiMicrosoftpowerpoint, SiMicrosoftword } from "react-icons/si";
import moment from "moment";

import { SubTitle, Title } from "../../App/components/StyledComponents";
import RowItem from "../../App/components/RowItem";
import Form from "../../App/components/Form";
import IdiForm from "../../Forms/IdiForm";
import ExpForm from "../../Forms/ExpForm";
import FormForm from "../../Forms/FormForm";
import CursoForm from "../../Forms/CursoForm";
import ModalForm from "../../App/components/ModalForm";
import { curriculoQuestions } from "../../constants";
import { PdfContext } from "../../services/PdfContext";

const CurriculoForm = ({ curriculo, onSetCurriculo, user }) => {

    const { gerarCurriculo } = useContext(PdfContext);

    const [formData, setFormData] = useState(curriculo);
    useEffect(() => setFormData(curriculo), [setFormData, curriculo]);

    const onChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });
    const onOffice = ({ target }) => onChange({ target: { name: 'office', value: { ...formData.office, [target.name]: target.value } } })

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});
    const [data, setData] = useState({});

    const handleDelete = (i, name) => _ => {
        const value = formData[name].filter((_, j) => j !== i);
        onChange({ target: { name, value } })
    };

    const handleNew = (Component, name) => () => {
        setAction({
            title: name,
            body: <Component updateData={setData} />,
            onSave: (nData) => {
                switch (name) {
                    case 'Experiência':
                        onChange({
                            target: {
                                name: 'profissional', value: formData?.profissional ? [...formData?.profissional, {
                                    ...nData,
                                    entrou: nData.dt_inicio.format('DD/MM/YYYY'),
                                    saiu: nData.atual ? 'até o momento' : nData.dt_fim.format('DD/MM/YYYY'),
                                }] : [{
                                    ...nData,
                                    entrou: nData.dt_inicio.format('DD/MM/YYYY'),
                                    saiu: nData.atual ? 'até o momento' : nData.dt_fim.format('DD/MM/YYYY'),
                                }]
                            }
                        })
                        break;
                    case 'Formação':
                        onChange({
                            target: {
                                name: 'formacao', value: formData?.formacao ? [...formData?.formacao, {
                                    ...nData, conclusao: nData.conclusao.format('DD/MM/YYYY')
                                }] : [{
                                    ...nData, conclusao: nData.conclusao.format('DD/MM/YYYY')
                                }]
                            }
                        })
                        break;
                    case 'Idioma':
                        let { idioma, nivel, outro } = nData;
                        if (idioma === '-') idioma = outro;
                        onChange({
                            target: {
                                name: 'idiomas', value: formData?.idiomas ? [...formData?.idiomas, { idioma, nivel, outro }] : [{ idioma, nivel, outro }]
                            }
                        })
                        break;
                    case 'Trabalho voluntário':
                        onChange({
                            target: {
                                name: 'voluntario', value: formData?.voluntario ? [...formData?.voluntario, {
                                    ...nData,
                                    entrou: nData.dt_inicio.format('DD/MM/YYYY'),
                                    saiu: nData.atual ? 'até o momento' : nData.dt_fim.format('DD/MM/YYYY'),
                                }] : [{
                                    ...nData,
                                    entrou: nData.dt_inicio.format('DD/MM/YYYY'),
                                    saiu: nData.atual ? 'até o momento' : nData.dt_fim.format('DD/MM/YYYY'),
                                }]
                            }
                        })
                        break;
                    case 'Curso':
                        onChange({
                            target: {
                                name: 'cursos', value: formData?.cursos ? [...formData?.cursos, nData] : [nData]
                            }
                        })
                        break;
                    default:
                        break;
                }
                setOpen(false);
                setData({});
            },
        });
        setOpen(true);
    };

    const onSave = () => onSetCurriculo(formData);
    const onReset = () => setFormData(curriculo);

    const endereco = `${user?.profile?.endereco?.rua ? user?.profile?.endereco?.rua + ',' : ''} ${user?.profile?.endereco?.numero ? user?.profile?.endereco?.numero + ',' : ''} ${user?.profile?.endereco?.cidade} - ${user?.profile?.endereco?.estado}`
    const curriculoPDF = {
        ...user,
        endereco: user?.profile?.endereco || { rua: 'Rua Teste', numero: '0000', bairro: 'Bairro', cidade: 'Fortaleza', estado: 'CE' },
        ...formData,
    }
    return (
        <Paper>
            <Box sx={{ mx: 'auto', maxWidth: 1024 }}>
                <Grid container spacing={3} sx={{ p: 2 }}>
                    <Grid item xs={12} md={5}>
                        <Title>{user?.name}</Title>
                        <SubTitle>{endereco}</SubTitle>
                    </Grid>
                    <Grid item xs={12} md={7} alignSelf='center'>
                        <Stack direction='row' spacing={1}>
                            <Button variant="contained" onClick={onSave} >Salvar</Button>
                            <Button variant="outlined" onClick={onReset} >Resetar</Button>
                            <Button onClick={gerarCurriculo(curriculoPDF)} >Baixar Currículo</Button>
                        </Stack>
                    </Grid>
                    {curriculoQuestions.map(q => <Form key={q.name} question={q} value={formData?.[q.name] || q.default} onChange={onChange} />)}
                    <Grid item xs={12} md={4} justifyContent='center' sx={{ textAlign: 'center' }}>
                        {/* <img style={{width:'30%'}} src="/img/currículo/30.png" alt="Ícone do Word" /> */}
                        <SiMicrosoftword size={128} color='#1d9992' />
                        <FormControl sx={{ textAlign: 'center' }}>
                            <FormLabel>Habilidade em Word</FormLabel>
                            <RadioGroup row name="word" value={formData?.office?.word || 'basico'} onChange={onOffice}>
                                <FormControlLabel value="basico" control={<Radio />} label="Básico" />
                                <FormControlLabel value="medio" control={<Radio />} label="Mediano" />
                                <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} justifyContent='center' sx={{ textAlign: 'center' }}>
                        {/* <img style={{width:'30%'}} src="/img/currículo/31.png" alt="Ícone do Excel" /> */}
                        <SiMicrosoftexcel size={128} color='#1d9992' />
                        <FormControl sx={{ textAlign: 'center' }}>
                            <FormLabel>Habilidade em Excel</FormLabel>
                            <RadioGroup row name="exel" value={formData?.office?.exel || 'basico'} onChange={onOffice}>
                                <FormControlLabel value="basico" control={<Radio />} label="Básico" />
                                <FormControlLabel value="medio" control={<Radio />} label="Mediano" />
                                <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} justifyContent='center' sx={{ textAlign: 'center' }}>
                        {/* <img style={{width:'30%'}} src="/img/currículo/32.png" alt="Ícone do PowerPoint" /> */}
                        <SiMicrosoftpowerpoint size={128} color='#1d9992' />
                        <FormControl sx={{ textAlign: 'center' }}>
                            <FormLabel>Habilidade em PowerPoint</FormLabel>
                            <RadioGroup row name="power_point" value={formData?.office?.power_point || 'basico'} onChange={onOffice}>
                                <FormControlLabel value="basico" control={<Radio />} label="Básico" />
                                <FormControlLabel value="medio" control={<Radio />} label="Mediano" />
                                <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SubTitle>Cursos</SubTitle>
                        <List>
                            <RowItem
                                avatar={<FaPlus color='#1d9992' size={32} />}
                                primary="ADICIONE UM CURSO"
                                onPress={handleNew(CursoForm, 'Curso')}
                            />
                            {formData?.cursos?.map(c => (
                                <RowItem
                                    key={c._id}
                                    primary={`${c.ch}hrs - ${c.nome}`}
                                    secondary={`Em ${c.instituicao} - ${moment(c.inicio).format('DD/MM/YYYY')} à ${moment(c.fim).format('DD/MM/YYYY')}`}
                                />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SubTitle>Soft skills desenvolvidas</SubTitle>
                        <List>
                            {['COMUNICAÇÃO', 'INTELIGÊNCIA EMOCIONAL', 'GESTÃO DE CONFLITOS'].map(sf => (
                                <RowItem key={sf} primary={sf} />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SubTitle>Idiomas</SubTitle>
                        <List>
                            <RowItem
                                avatar={<FaPlus color='#1d9992' size={32} />}
                                primary="ADICIONE UM IDIOMA"
                                onPress={handleNew(IdiForm, 'Idioma')}
                            />
                            {formData?.idiomas?.map((p, i) => (
                                <RowItem
                                    key={i}
                                    primary={`${p?.idioma}`}
                                    secondary={`${p?.nivel}`}
                                    onDelete={(handleDelete(i, 'idiomas'))}
                                />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SubTitle>Experiência</SubTitle>
                        <List>
                            <RowItem
                                avatar={<FaPlus color='#1d9992' size={32} />}
                                primary="ADICIONE UMA EXPERIÊNCIA"
                                onPress={handleNew(ExpForm, 'Experiência')}
                            />
                            {formData?.profissional?.map((p, i) => (
                                <RowItem
                                    key={i}
                                    primary={p?.empresa}
                                    secondary={`${p?.entrou} - ${p?.saiu}`}
                                    onDelete={(handleDelete(i, 'Profissional'))}
                                />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SubTitle>Formação</SubTitle>
                        <List>
                            <RowItem
                                avatar={<FaPlus color='#1d9992' size={32} />}
                                primary="ADICIONE UMA FORMAÇÃO"
                                onPress={handleNew(FormForm, 'Formação')}
                            />
                            {formData?.formacao?.map((p, i) => (
                                <RowItem
                                    key={i}
                                    primary={`${p?.nome} - ${p?.instituicao}`}
                                    secondary={`Termino em ${p?.conclusao}`}
                                    onDelete={(handleDelete(i, 'formacao'))}
                                />
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SubTitle>Trabalho Voluntário</SubTitle>
                        <List>
                            <RowItem
                                avatar={<FaPlus color='#1d9992' size={32} />}
                                primary="ADICIONE UM TRABALHO VOLUNTÁRIO"
                                onPress={handleNew(ExpForm, 'Trabalho voluntário')}
                            />
                            {formData?.voluntario?.map((p, i) => (
                                <RowItem
                                    key={i}
                                    primary={p?.empresa}
                                    secondary={`${p?.entrou} - ${p?.saiu}`}
                                    onDelete={(handleDelete(i, 'Voluntario'))}
                                />
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>
            <ModalForm data={data} open={open} onClose={() => setOpen(false)} {...action} />
        </Paper>
    );
}

export default CurriculoForm;