import { Fragment, useContext, useEffect, useState } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, List, ListItem, ListItemIcon, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { FaUser } from "react-icons/fa";

import { Title } from "../../../App/components/StyledComponents";
import { UserContext } from "../../../services/UserContext";
import { ConstantsContext } from "../../../services/ConstantsContext";
import moment from "moment";
import RelatorioTurma from "../../../App/components/RelatorioTurma";
import ModalForm from "../../../App/components/ModalForm";
import RelatorioModulos from "./RelatórioModulos";

const Participantes = ({ modulos, numeroTurma, avaliacoes }) => {

    const { isMobile } = useContext(ConstantsContext);
    const { getAlunos, alunos, salvarChamada, setAvaliacao } = useContext(UserContext);
    // eslint-disable-next-line
    useEffect(() => getAlunos(numeroTurma), []);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const [modulo, setModulo] = useState(0);
    const handleModulo = ({ target }) => setModulo(target.value)

    const handleRelatorioTurma = _ => {
        setAction({
            title: `Acelerando Talentos - T${numeroTurma}`,
            body: <RelatorioTurma turma={numeroTurma} alunos={alunos} />
        })
        setOpen(true)
    }

    const [data, setData] = useState();
    const handleRelatorio = _ => {
        setAction({
            title: 'Relatório',
            body: <RelatorioModulos alunos={alunos} avaliacoes={avaliacoes} modulo={modulos[modulo]} updateData={setData} />,
            onSave: async (nData) => {
                setAvaliacao(modulos[modulo]._id, nData);
                setOpen(false);
            },
        });
        setOpen(true);
    }

    const [frequencia, setFrequencia] = useState(modulos[modulo].aulas.map(a => a.frequencia));
    const handleFrequencia = (aluno, i) => ({ target }) => {
        let list;
        if (target.checked) list = [...frequencia[i], aluno];
        else list = frequencia[i].filter(f => f !== aluno);

        const f = [...frequencia];
        f[i] = list
        setFrequencia(f);
    }

    const saveChamada = () => salvarChamada(modulos[modulo]._id, { frequencia });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <List>
                <ListItem>
                    <Grid container spacing={2} alignItems='center' >
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Módulo</InputLabel>
                                <Select
                                    value={modulo}
                                    label="Módulo"
                                    onChange={handleModulo}
                                >
                                    {modulos?.map((m, i) => (
                                        m.aulas?.length ? <MenuItem key={i} value={i}>{m.nome}</MenuItem> : <Tooltip key={i} arrow title="Modulo sem aulas" placement="left"><span><MenuItem disabled value={i}>{m.nome}</MenuItem></span></Tooltip>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button onClick={handleRelatorioTurma} variant='contained' fullWidth>VER PERFIL DA TURMA</Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button onClick={handleRelatorio} variant='contained' fullWidth>VER RELATÓRIOS DA TURMA</Button>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FaUser size={32} color='#993399' />
                    </ListItemIcon>
                    <Stack direction={isMobile ? 'column' : 'row'} spacing={3}>
                        <Title>FREQUÊNCIA</Title>
                        <Button variant='outlined' onClick={saveChamada}>Salvar frequência</Button>
                    </Stack>
                </ListItem>
                <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ left: 0, background: 'white', zIndex: 900, whiteSpace: 'noWrap' }} align="center" colSpan={1}>Aluno</TableCell>
                                <TableCell sx={{ borderLeft: '1px solid #ccc', whiteSpace: 'noWrap' }} align="center" colSpan={modulos[modulo].aulas?.length}>{modulos[modulo].nome}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {alunos?.sort(sortAlphaBetical).map(aluno => (
                                <TableRow key={aluno._id}>
                                    <TableCell style={{ position: isMobile ? '' : 'sticky', left: 0, background: 'white', zIndex: 800, whiteSpace: 'noWrap' }} component="th" scope="row">
                                        {aluno.name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                                    </TableCell>
                                    {modulos[modulo].aulas?.map((aula, x) => (<Fragment key={x}>
                                        <TableCell align="center" sx={{ borderLeft: '1px solid #ccc' }} component="th" scope="row">
                                            <FormControlLabel control={<Checkbox onChange={handleFrequencia(aluno._id, x)} checked={frequencia?.[x]?.some(f => f === aluno._id)} />} label={moment(aula.dia).format('DD/MM/YY')} />
                                        </TableCell>
                                    </Fragment>))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={alunos?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage='Linhas por página'
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`; }}
                />
            </List>
            <ModalForm open={open} data={data} onClose={() => setOpen(false)} fullWidth maxWidth='md' {...action} />
        </>
    );
}

export default Participantes;

const sortAlphaBetical = (a, b) => {
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
}