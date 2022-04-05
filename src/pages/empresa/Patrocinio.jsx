import { DatePicker, MobileDatePicker } from "@mui/lab";
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Legend, SubTitle, Title } from "../../App/components/StyledComponents";

const PatrocinioEmpresa = () => {

    const [patrocinio, setPatrocinio] = useState({
        tipo: '',
    });

    const onChange = ({ target }) => setPatrocinio({ ...patrocinio, [target.name]: target.value });

    return (
        <Paper>
            <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Patrocinar:</Title>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9} >
                            <FormControl fullWidth>
                                <InputLabel>Tipo de Trilha</InputLabel>
                                <Select
                                    value={patrocinio.tipo}
                                    label="Tipo de Trilha"
                                    onChange={onChange}
                                >
                                    <MenuItem value='tipo 1'>Tipo 1</MenuItem>
                                    <MenuItem value='tipo 2'>Tipo 2</MenuItem>
                                    <MenuItem value='tipo 3'>Tipo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} >
                            <TextField label="Quantidade de turmas" type="number" />
                        </Grid>
                        <Grid item xs={6} md={2} >
                            <MobileDatePicker
                                label='Inicio da turma'
                                // value={value}
                                // openTo="year"
                                name='periodo'
                                // onChange={handleAddressNDate}
                                renderInput={(params) => <TextField {...params} />}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} md={2} >
                            <MobileDatePicker
                                label='Fim da turma'
                                // value={value}
                                // openTo="year"
                                name='periodo'
                                // onChange={handleAddressNDate}
                                renderInput={(params) => <TextField {...params} />}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} md={4} >
                            <FormControl fullWidth>
                                <InputLabel>Modalidade</InputLabel>
                                <Select
                                    // value={patrocinio.tipo}
                                    label="Tipo de Trilha"
                                // onChange={onChange}
                                >
                                    <MenuItem value='tipo 1'>Sincrono</MenuItem>
                                    <MenuItem value='tipo 2'>Assincrono</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4} >
                            <Typography fontSize='1rem' >Ferramentas adicionais:</Typography>
                            <Stack direction="row" alignItems="center">
                                <FormControlLabel control={<Checkbox />} label="Tipo 1" />
                                <FormControlLabel control={<Checkbox />} label="Tipo 2" />
                                <FormControlLabel control={<Checkbox />} label="Tipo 3" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}><Button onClick={() => alert('template confirmação')} fullWidth variant='contained'>Solicitar Turma</Button></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Meus patrocinios:</Title>
                    <Grid component='form' container spacing={2}>
                        <Grid item xs={12} md={6} >
                            <SubTitle sx={{ mb: 1 }}>Filtros</SubTitle>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={4} >
                                    <MobileDatePicker
                                        label='Inicio da turma'
                                        name='filtro_inicial'
                                        renderInput={(params) => <TextField {...params} />}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={4} >
                                    <MobileDatePicker
                                        label='Fim da turma'
                                        name='filtro_final'
                                        renderInput={(params) => <TextField {...params} />}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <DatePicker
                                        fullWidth
                                        label="Mês e Ano da turma"
                                        views={['year', 'month']}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box component='fieldset' sx={{ border: '1 black' }}>
                                        <Legend sx={{ mb: 1 }}>Impacto</Legend>
                                        <Stack direction='row' spacing={3} alignItems='center'>
                                            <Avatar sx={{ width: 64, height: 64 }} src='https://via.placeholder.com/300/c0c0c0/?text=%20' />
                                            <Stack justifyContent='center' alignItems='center'>
                                                <Title>00</Title>
                                                <SubTitle sx={{ textAlign: 'center' }}>Turmas Realizadas</SubTitle>
                                            </Stack>
                                            <Stack justifyContent='center' alignItems='center'>
                                                <Title>000</Title>
                                                <SubTitle sx={{ textAlign: 'center' }}>Impactados</SubTitle>
                                            </Stack>
                                            <Stack justifyContent='center' alignItems='center'>
                                                <Title>00%</Title>
                                                <SubTitle sx={{ textAlign: 'center' }}>Taxa de empregabilidade</SubTitle>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <TableContainer sx={{ height: '80%' }}>
                                <Table
                                    sx={{ width: '100%' }}
                                    size={'medium'}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                // indeterminate={numSelected > 0 && numSelected < rowCount}
                                                // checked={rowCount > 0 && numSelected === rowCount}
                                                // onChange={onSelectAllClick}
                                                />
                                            </TableCell>
                                            <TableCell align='center' padding='none'>Turmas</TableCell>
                                            <TableCell align='center' padding='none'>QTD alunos</TableCell>
                                            <TableCell align='center' padding='none'>Periodo</TableCell>
                                            <TableCell align='center' padding='none'>Investimento</TableCell>
                                            <TableCell align='center' padding='none'>AÇÕES</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={0}
                                rowsPerPage={5}
                                page={1}
                                labelRowsPerPage='Linhas por página'
                                labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`; }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <SubTitle>Minhas conquistas</SubTitle>
                        <div style={{ width: '80%', height: '1px', backgroundColor: 'gray' }} />
                    </Stack>
                    <Stack spacing={2} direction='row' alignItems='center' >
                        <Avatar sx={{ width: 64, height: 64 }} src='https://via.placeholder.com/300/cd7f32/?text=%20' />
                        <Avatar sx={{ width: 64, height: 64 }} src='https://via.placeholder.com/300/c0c0c0/?text=%20' />
                        <Avatar sx={{ width: 64, height: 64 }} src='https://via.placeholder.com/300/ffd700/?text=%20' />
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default PatrocinioEmpresa;