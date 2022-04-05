import { useState } from "react";
import { Box, Button, Fade, FormControl, FormControlLabel, FormLabel, Grid, List, Radio, RadioGroup, Stack, Tooltip } from "@mui/material";

import useInterval from "../hooks/UseInterval";
import { SubTitle, Title } from "../App/components/StyledComponents";
import AddressForm from "../App/components/AddressForm";
import { curriculoGen } from "../constants";
import Form from "../App/components/Form";
import FormForm from "./FormForm";
import moment from "moment";
import ExpForm from "./ExpForm";
import IdiForm from "./IdiForm";
import { FaPlus, FaTrash } from "react-icons/fa";
import RowItem from "../App/components/RowItem";
import { SiMicrosoftexcel, SiMicrosoftpowerpoint, SiMicrosoftword } from "react-icons/si";
import CursoForm from "./CursoForm";

const GerarCurriculo = ({ aluno: user, updateData, salvarCurr, turma }) => {
    const [step, setStep] = useState(1);

    const [fade, setFade] = useState(false);
    const [start, stop] = useInterval(() => !fade && setFade(true), 500);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const nextStep = (i = 1) => async () => {
        stop();
        setFade(false);
        await delay(500);
        setStep(step + i);
        start();
    }

    const [endereco, setEndereco] = useState(user?.profile?.endereco);
    // const enderecoChange = ({ target }) => setEndereco({ ...endereco, [target.name]: target.value });

    const [qualidades, setQualidades] = useState({});
    const onQualidade = ({ target }) => {
        setQualidades({ ...qualidades, [target.name]: target.value });
    }

    const [formacao, setFormacao] = useState({
        nome: user?.profile?.escolaridade?.includes('médio') ? 'Ensino médio' : 'Ensino Superior',
        instituicao: "",
        conclusao: moment().add(1, 'year'),
        atual: false
    });

    const [profissional, setProfissional] = useState();
    const [voluntario, setVoluntario] = useState();

    const [idiomas, setIdiomas] = useState([{ idioma: 'Português', nivel: 'Fluente' }]);
    const novoIdioma = () => {
        const list = idiomas
        list.push({ idioma: '', nivel: '' });
        setIdiomas([...list]);
    }
    const updateIdiomas = (i) => (v) => {
        const list = idiomas
        list[i] = v;
        setIdiomas(list);
    }
    const removeIdioma = (i) => () => {
        const list = idiomas.filter((_, j) => j !== i);
        setIdiomas(list);
    }

    const [office, setOffice] = useState({ word: 'basico', exel: 'basico', power_point: 'basico' });
    const onOffice = ({ target }) => setOffice({ ...office, [target.name]: target.value });

    const fazCarreira = turma?.modulos?.map(modulo => {
        return ({
            nome: modulo.nome,
            instituicao: 'Faz Carreira',
            inicio: moment.min(modulo.aulas.reduce((c, aula) => moment.min(moment(aula.dia), c), moment()), moment()),
            fim: moment.max(modulo.aulas.reduce((c, aula) => moment.max(moment(aula.dia), c), moment()), moment()),
            ch: modulo?.aulas?.reduce((total, { hora_inicial, hora_final }) => total + (moment(hora_final).hour() - moment(hora_inicial).hour()), 0)
        })
    })

    const [cursos, setCursos] = useState(fazCarreira);
    const novoCurso = () => {
        const list = cursos
        list.push({ nome: '', instituicao: '', inicio: moment().subtract(1, 'year'), fim: moment(), ch: 0 });
        setCursos([...list]);
    }
    const updateCursos = (i) => (v) => {
        const list = cursos
        list[i] = v;
        setCursos(list);
    }
    const removeCurso = (i) => () => {
        const list = cursos.filter((_, j) => j !== i);
        setCursos(list);
    }

    start();
    let err
    switch (step) {
        case 1:
            if (endereco) err = Object.values(endereco).some(e => e === '') ? 'Escreva seu endereço' : null;
            else err = 'Escreva seu endereço';
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Olá! Vou te ajudar a fazer seu currículo!</Title>
                        <SubTitle>{user?.name} Confirma pra mim onde você mora</SubTitle>
                        <Grid container spacing={2}>
                            <AddressForm data={endereco} onChange={setEndereco} />
                        </Grid>
                        <Tooltip title={err || 'Vamos em frente'}><span>
                            <Button onClick={nextStep()} disabled={!!err} variant='contained'>Pronto, está tudo certo agora</Button>
                        </span></Tooltip>
                    </Stack>
                </Fade>
            )
        case 2:
            if (formacao) err = Object.values(formacao).some(f => f === '') ? 'Complete os dados' : null;
            else err = 'Complete os dados';
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Maravilha!</Title>
                        <SubTitle>Olhei aqui sua escolaridade... Me conta mais!</SubTitle>
                        <Grid container spacing={2}>
                            <FormForm updateData={setFormacao} data={formacao} />
                        </Grid>
                        <Tooltip title={err || 'Vamos em frente'}><span>
                            <Button onClick={nextStep()} disabled={!!err} variant='contained'>Pronto, está tudo certo agora</Button>
                        </span></Tooltip>
                    </Stack>
                </Fade>
            )
        case 3:
            err = null;
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Legal!</Title>
                        <SubTitle>Me fala aí, você ja trabalhou em algum lugar?</SubTitle>
                        <Stack spacing={2}>
                            <Button onClick={nextStep()} variant='contained'>Sim</Button>
                            <Button onClick={nextStep(2)} variant='contained'>Sim, mas apenas voluntário</Button>
                            <Button onClick={nextStep(3)} variant='contained'>Ainda não</Button>
                        </Stack>
                    </Stack>
                </Fade>
            )
        case 4:
            if (profissional) err = Object.values(profissional).some(f => f === '') ? 'Complete os dados' : null;
            else err = 'Complete os dados';
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Que bom!</Title>
                        <SubTitle>Me conta do seu ultimo trabalho</SubTitle>
                        <Grid container spacing={2}>
                            <ExpForm updateData={setProfissional} data={profissional} />
                        </Grid>
                        <Tooltip title={err || 'Vamos em frente'}><span>
                            <Button onClick={nextStep(2)} disabled={!!err} variant='contained'>Esse foi meu trabalho</Button>
                        </span></Tooltip>
                    </Stack>
                </Fade>
            )
        case 5:
            if (voluntario) err = Object.values(voluntario).some(f => f === '') ? 'Complete os dados' : null;
            else err = 'Complete os dados';
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Muito nobre!</Title>
                        <SubTitle>Me fala sobre isso</SubTitle>
                        <Grid container spacing={2}>
                            <ExpForm updateData={setVoluntario} data={voluntario} />
                        </Grid>
                        <Tooltip title={err || 'Vamos em frente'}><span>
                            <Button onClick={nextStep()} disabled={!!err} variant='contained'>Esse foi meu trabalho</Button>
                        </span></Tooltip>
                    </Stack>
                </Fade>
            )
        case 6:
            // if (idiomas) err = idiomas.some(i => Object.entries(i).some(([k, v]) => k !== 'other' && v === '')) ? 'Complete os dados' : null;
            // else err = 'Complete os dados';
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Ok</Title>
                        <SubTitle>Que idiomas você fala?</SubTitle>
                        <Box sx={{ width: '100%' }}>
                            <List>
                                {idiomas.map((idi, i) => (<Stack direction='row' alignItems='center' key={i}>
                                    <IdiForm ro={i === 0} data={idi} updateData={updateIdiomas(i)} />
                                    {i !== 0 && <FaTrash size={24} color='#999' onClick={removeIdioma(i)} />}
                                </Stack>))}
                                <RowItem avatar={<FaPlus color='#999' size={32} />} primary='Adicionar Idioma' onPress={novoIdioma} />
                            </List>
                        </Box>
                        {/* <Tooltip title={err || 'Vamos em frente'}><span> */}
                        {/* <Button onClick={nextStep()} disabled={!!err} variant='contained'>Esses são os idiomas que falo</Button> */}
                        <Button onClick={nextStep()} variant='contained'>Esses são os idiomas que falo</Button>
                        {/* </span></Tooltip> */}
                    </Stack>
                </Fade>
            )
        case 7:
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Legal!</Title>
                        <SubTitle>Estamos terminando, mas você sabe usar as ferramentas office?</SubTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} justifyContent='center' sx={{ textAlign: 'center' }}>
                                {/* <img style={{width:'30%'}} src="/img/currículo/30.png" alt="Ícone do Word" /> */}
                                <SiMicrosoftword size={128} color='#999' />
                                <FormControl sx={{ textAlign: 'center' }}>
                                    <FormLabel>Habilidade em Word</FormLabel>
                                    <RadioGroup row name="word" value={office?.word} onChange={onOffice}>
                                        <FormControlLabel value="basico" control={<Radio />} label="Básico" />
                                        <FormControlLabel value="medio" control={<Radio />} label="Mediano" />
                                        <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4} justifyContent='center' sx={{ textAlign: 'center' }}>
                                {/* <img style={{width:'30%'}} src="/img/currículo/31.png" alt="Ícone do Excel" /> */}
                                <SiMicrosoftexcel size={128} color='#999' />
                                <FormControl sx={{ textAlign: 'center' }}>
                                    <FormLabel>Habilidade em Excel</FormLabel>
                                    <RadioGroup row name="exel" value={office?.exel} onChange={onOffice}>
                                        <FormControlLabel value="basico" control={<Radio />} label="Básico" />
                                        <FormControlLabel value="medio" control={<Radio />} label="Mediano" />
                                        <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4} justifyContent='center' sx={{ textAlign: 'center' }}>
                                {/* <img style={{width:'30%'}} src="/img/currículo/32.png" alt="Ícone do PowerPoint" /> */}
                                <SiMicrosoftpowerpoint size={128} color='#999' />
                                <FormControl sx={{ textAlign: 'center' }}>
                                    <FormLabel>Habilidade em PowerPoint</FormLabel>
                                    <RadioGroup row name="power_point" value={office?.power_point} onChange={onOffice}>
                                        <FormControlLabel value="basico" control={<Radio />} label="Básico" />
                                        <FormControlLabel value="medio" control={<Radio />} label="Mediano" />
                                        <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button onClick={nextStep()} variant='contained'>É isso que eu sei delas</Button>
                    </Stack>
                </Fade>
            )
        case 8:
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Estamos quase lá!</Title>
                        <SubTitle>Que cursos você já fez?</SubTitle>
                        <Box sx={{ width: '100%' }}>
                            <List>
                                {cursos?.map((cur, i) => (<Stack direction='row' alignItems='center' key={i}>
                                    <CursoForm ro={i < fazCarreira.length} data={cur} updateData={updateCursos(i)} />
                                    {!(i < fazCarreira.length) && <FaTrash size={24} color='#999' onClick={removeCurso(i)} />}
                                </Stack>))}
                                <RowItem avatar={<FaPlus color='#999' size={32} />} primary='Adicionar Curso' onPress={novoCurso} />
                            </List>
                        </Box>
                        <Button onClick={nextStep()} variant='contained'>Esses são os cursos que fiz</Button>
                    </Stack>
                </Fade>
            )
        case 9:
            err = curriculoGen.some(q => !qualidades?.[q.name]?.length || qualidades?.[q.name]?.length === 0) ? 'Escolha ao menos uma opção de cada' : null;
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Ok, Ultima coisinha...</Title>
                        <SubTitle>Me conta um pouco sobre você</SubTitle>
                        <Grid container spacing={1}>
                            {curriculoGen.map(q => <Form key={q.name} question={q} value={qualidades?.[q.name] || []} onChange={onQualidade} />)}
                        </Grid>
                        <Tooltip title={err || 'Vamos em frente'}><span>
                            <Button onClick={nextStep()} disabled={!!err} variant='contained'>
                                Acho que é isso, esse sou eu.
                            </Button>
                        </span></Tooltip>
                    </Stack>
                </Fade>
            )
        default:
            if (!!updateData) updateData({ fim: true, ...qualidades, formacao, profissional, voluntario, endereco, idiomas, office, cursos });
            return (
                <Fade in={fade}>
                    <Stack spacing={2} alignItems='center' sx={{ my: 6 }} >
                        <Title>Pronto!</Title>
                        <SubTitle>Ajustei seu currículo para você</SubTitle>
                        {salvarCurr && <Button onClick={() => salvarCurr(
                            { ...qualidades, formacao, profissional, voluntario, endereco, idiomas, office, cursos }
                        )}>Veja como ficou</Button>}
                    </Stack>
                </Fade>
            )
    }
}

export default GerarCurriculo;