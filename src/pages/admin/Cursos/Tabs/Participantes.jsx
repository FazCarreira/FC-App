import { Fragment, useContext, useEffect, useState } from "react";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemIcon, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import { FaUser, FaUserMinus, FaUserPlus } from "react-icons/fa";
import moment from "moment";

import { UserContext } from "../../../../services/UserContext";
import { TrilhaContext } from "../../../../services/TrilhaContext";
import { ConstantsContext } from "../../../../services/ConstantsContext";

import { Title } from "../../../../App/components/StyledComponents";
import ModalForm from "../../../../App/components/ModalForm";
import RelatorioTurma from "../../../../App/components/RelatorioTurma";
import RelatorioAula from "../../../../App/components/RelatorioAula";
import RelatorioModulos from "./RelatórioModulos";
import AlunoForm from "./AlunoForm";

const Participantes = ({ turma, nomeCurso }) => {

    const { isMobile } = useContext(ConstantsContext);
    const { addAlunoTurma, remAlunoTurma } = useContext(TrilhaContext);
    const { setAvaliacao, getAlunos, alunos, salvarChamada } = useContext(UserContext);

    // eslint-disable-next-line
    useEffect(() => getAlunos(22), []);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});
    const [data, setData] = useState();

    const [modulo, setModulo] = useState(-1);
    const handleModulo = ({ target }) => setModulo(target.value)

    const handleRelatorioTurma = _ => {
        setAction({
            title: `${nomeCurso} - T${turma?.numero}`,
            body: <RelatorioTurma alunos={alunos} turma={turma} nomeCurso={nomeCurso} />
        })
        setOpen(true)
    }

    const handleRelatorioAula = (modulo) => _ => {
        setAction({
            title: 'Relatório',
            body: <RelatorioAula alunos={alunos} modulo={modulo} updateData={setData} />,
            onSave: async (nData) => {
                console.log(nData);
                setAvaliacao(modulo._id, nData);
                setOpen(false);
            },
        });
        setOpen(true);
    }

    const handleRelatorioModulos = (modulos) => _ => {
        setAction({
            title: 'Relatório',
            body: <RelatorioModulos alunos={alunos} modulos={modulos} updateData={setData} />,
            onSave: async (nData) => {
                if (nData) nData?.forEach((d, i) => setAvaliacao(modulos[i]._id, d));
                setOpen(false);
            },
        });
        setOpen(true);
    }

    const [frequenciaAll, setFrequenciaAll] = useState(turma?.modulos?.map(modulo => modulo.aulas.map(a => a?.frequencia)));
    const handleFrequenciaAll = (aluno, i, j) => ({ target }) => {
        let list;
        if (target.checked) list = [...frequenciaAll[j][i], aluno];
        else list = frequenciaAll[j][i].filter(f => f !== aluno);

        const f = [...frequenciaAll];
        f[j][i] = list
        setFrequenciaAll(f);
    }

    const getFrequenciaPercent = (aluno) => {
        const t = turma?.modulos?.reduce((total, modulo) => total + modulo.aulas.length, 0);
        const f = turma?.modulos?.reduce((total, modulo, x) => total + modulo.aulas.reduce((total, _, y) => frequenciaAll[x][y]?.some(f => f === aluno._id) ? total + 1 : total + 0, 0), 0)
        return f * 100 / t
    }

    const [frequencia, setFrequencia] = useState();
    useEffect(() => setFrequencia(turma?.modulos[modulo]?.aulas.map(a => a?.frequencia)), [modulo, turma, setFrequencia]);
    const handleFrequencia = (aluno, i) => ({ target }) => {
        let list;
        if (target.checked) list = [...frequencia[i], aluno];
        else list = frequencia[i].filter(f => f !== aluno);

        const f = [...frequencia];
        f[i] = list
        setFrequencia(f);
    }

    const saveChamada = () => salvarChamada(turma?.modulos[modulo]._id, { frequencia });
    const saveChamadaAll = () => turma?.modulos.map((modulo, i) => salvarChamada(modulo._id, { frequencia: frequenciaAll[i] }));

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddAlunos = () => {
        setAction({
            title: 'Adicionar Alunos',
            body: <AlunoForm alunosTurma={alunos} add updateData={setData} />,
            onSave: async (nData) => {
                nData?.forEach(d => addAlunoTurma(d._id, turma?._id));
                setOpen(false);
            },
        });
        setOpen(true);
    }

    const handleRemAlunos = () => {
        setAction({
            title: 'Remover Alunos',
            body: <AlunoForm alunosTurma={alunos} updateData={setData} />,
            onSave: async (nData) => {
                nData?.forEach(d => remAlunoTurma(d._id));
                setOpen(false);
            },
        });
        setOpen(true);
    }

    const handleDestaque = (aluno) => {
        const hab = turma?.modulos?.reduce((total, modulo) => {
            modulo.avaliacao?.destaques?.filter(d => d.id === aluno)?.[0]?.hab_per.forEach(h => total.push(h));
            return total;
        }, []);
        if (hab.length > 0) return [...new Set(hab)];
        else return 'Não'
    }

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
                                    <MenuItem value={-1}>GERAL</MenuItem>
                                    {turma?.modulos?.map((m, i) => (
                                        turma?.modulos[i].aulas?.length ? <MenuItem key={i} value={i}>{m.nome}</MenuItem> : <Tooltip key={i} arrow title="Modulo sem aulas" placement="left"><span><MenuItem disabled value={i}>{m.nome}</MenuItem></span></Tooltip>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button onClick={handleRelatorioTurma} variant='contained' fullWidth>VER PERFIL DA TURMA</Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {modulo === -1 ? (
                                <Button onClick={handleRelatorioModulos(turma?.modulos)} variant='contained' fullWidth>VER RELATÓRIO DOS MODULOS</Button>
                            ) : (
                                <Button onClick={handleRelatorioAula(turma?.modulos[modulo])} variant='contained' fullWidth>VER RELATÓRIO DO MODULO</Button>
                            )}
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FaUser size={32} color='#993399' />
                    </ListItemIcon>
                    <Stack direction={isMobile ? 'column' : 'row'} spacing={3}>
                        <Title>FREQUÊNCIA</Title>
                        <Button variant='outlined' onClick={modulo === -1 ? saveChamadaAll : saveChamada}>Salvar frequência</Button>
                    </Stack>
                </ListItem>
                <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ position: 'sticky', left: 0, background: 'white', zIndex: 900, whiteSpace: 'noWrap' }} align="center" colSpan={1}>
                                    <Stack direction='row' alignItems='center' justifyContent='center'>
                                        <Typography>Aluno</Typography>
                                        <Tooltip title="Adicionar Aluno"><IconButton onClick={handleAddAlunos}><FaUserPlus size={20} /></IconButton></Tooltip>
                                        <Tooltip title="Remover Aluno"><IconButton onClick={handleRemAlunos}><FaUserMinus size={20} /></IconButton></Tooltip>
                                    </Stack>
                                </TableCell>
                                {modulo === -1 ? (<>{turma?.modulos?.map(modulo => (
                                    modulo.aulas?.length > 0 && <TableCell key={modulo.nome} sx={{ borderLeft: '1px solid #ccc', whiteSpace: 'noWrap' }} align="center" colSpan={modulo.aulas.length}>{modulo.nome}</TableCell>
                                ))}
                                    <TableCell align="center" sx={{ borderLeft: '1px solid #ccc', whiteSpace: 'noWrap' }} >Frequência Total</TableCell>
                                    <TableCell align="center" sx={{ borderLeft: '1px solid #ccc', whiteSpace: 'noWrap' }} >Destaques</TableCell>
                                </>) : (
                                    <TableCell sx={{ borderLeft: '1px solid #ccc', whiteSpace: 'noWrap' }} align="center" colSpan={turma?.modulos[modulo].aulas?.length}>{turma?.modulos[modulo].nome}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {alunos?.sort(sortAlphaBetical).map((aluno, i) => {
                                const destaques = handleDestaque(aluno._id);
                                return (
                                    <TableRow
                                        key={aluno._id}
                                    >
                                        <TableCell style={{ position: 'sticky', left: 0, background: 'white', zIndex: 800, whiteSpace: 'noWrap' }} component="th" scope="row">
                                            {aluno.name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                                        </TableCell>

                                        {modulo === -1 ? (<>{turma?.modulos?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((modulo, j) => (<Fragment key={j}>
                                            {modulo.aulas?.map((aula, x) => {
                                                return (<Fragment key={x}>
                                                    <TableCell align="center" sx={{ borderLeft: '1px solid #ccc' }} component="th" scope="row">
                                                        <FormControlLabel control={<Checkbox onChange={handleFrequenciaAll(aluno._id, x, j)} checked={frequenciaAll[j][x]?.some(f => f === aluno._id)} />} label={moment(aula?.dia).format('DD/MM/YY')} />
                                                    </TableCell>
                                                </Fragment>)
                                            })}
                                        </Fragment>)
                                        )}
                                            <TableCell component="th" scope="row" align="center">
                                                {getFrequenciaPercent(aluno).toFixed(0)}%
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                {typeof destaques === 'string' ? destaques : (
                                                    <Tooltip title={<Stack alignItems='center' spacing={1}>
                                                        {destaques.map((value, i) => (
                                                            <Chip key={i} color="primary" label={value} />
                                                        ))}
                                                    </Stack>}>
                                                        <Typography>Sim</Typography>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        </>) : (<>
                                            {turma?.modulos[modulo].aulas?.map((aula, x) => {
                                                return (<Fragment key={x}>
                                                    <TableCell align="center" sx={{ borderLeft: '1px solid #ccc' }} component="th" scope="row">
                                                        <FormControlLabel control={<Checkbox onChange={handleFrequencia(aluno._id, x)} checked={frequencia?.[x]?.some(f => f === aluno._id) || false} />} label={moment(aula?.dia).format('DD/MM/YY')} />
                                                    </TableCell>
                                                </Fragment>)
                                            })}
                                        </>)}
                                    </TableRow>
                                )
                            })}
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
    let fa = a?.name.toLowerCase(),
        fb = b.name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
}