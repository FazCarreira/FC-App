import { DatePicker, MobileDatePicker } from "@mui/lab";
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, List, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import RowItem from "../../App/components/RowItem";
import { SubTitle, Title } from "../../App/components/StyledComponents";

const VagasEmpresa = () => {
    return (
        <Paper>
            <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Detalhes da Vaga:</Title>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={3} >
                            <TextField fullWidth label="Cargo" />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <TextField fullWidth label="Localidade da Vaga" />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <FormControl fullWidth>
                                <InputLabel>Tipo da vaga</InputLabel>
                                <Select
                                    // value={patrocinio.tipo}
                                    label="Tipo de Trilha"
                                // onChange={onChange}
                                >
                                    <MenuItem value='tipo 1'>Tipo 1</MenuItem>
                                    <MenuItem value='tipo 2'>Tipo 2</MenuItem>
                                    <MenuItem value='tipo 3'>Tipo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <FormControl fullWidth>
                                <InputLabel>Tipo de local de trabalho</InputLabel>
                                <Select
                                    // value={patrocinio.tipo}
                                    label="Tipo de Trilha"
                                // onChange={onChange}
                                >
                                    <MenuItem value='tipo 1'>Tipo 1</MenuItem>
                                    <MenuItem value='tipo 2'>Tipo 2</MenuItem>
                                    <MenuItem value='tipo 3'>Tipo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <TextField fullWidth minRows={4} multiline label="Descrição da Vaga" />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Stack spacing={0.5}>
                                <List>
                                    <RowItem
                                        avatar={<FaPlus size={32} color='#993399' />}
                                        primary="Adicione perguntas de triagem"
                                    />
                                </List>
                                <TextField fullWidth label="Link de redirecionamento para plataforma (Opicional)" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}><Button onClick={() => alert('template confirmação')} fullWidth variant='contained'>Criar Vaga</Button></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Minhas Vagas:</Title>
                    <Grid component='form' container spacing={2}>
                        <Grid item xs={12} md={2} >
                            <SubTitle sx={{ mb: 1 }}>Filtros</SubTitle>
                            <Stack spacing={2}>
                                <MobileDatePicker
                                    label='A partir de'
                                    name='filtro_inicial'
                                    renderInput={(params) => <TextField {...params} />}
                                    fullWidth
                                />
                                <MobileDatePicker
                                    label='Até o dia'
                                    name='filtro_final'
                                    renderInput={(params) => <TextField {...params} />}
                                    fullWidth
                                />
                                <DatePicker
                                    fullWidth
                                    label="Mês e Ano da turma"
                                    views={['year', 'month']}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                                <FormControl fullWidth>
                                <InputLabel>Status da Vaga</InputLabel>
                                <Select
                                    // value={patrocinio.tipo}
                                    label="Status da Vaga"
                                // onChange={onChange}
                                >
                                    <MenuItem value='Status 1'>Status 1</MenuItem>
                                    <MenuItem value='Status 2'>Status 2</MenuItem>
                                    <MenuItem value='Status 3'>Status 3</MenuItem>
                                </Select>
                            </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={10} >
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
                                            <TableCell align='center' padding='none'>Vaga</TableCell>
                                            <TableCell align='center' padding='none'>Lançamento</TableCell>
                                            <TableCell align='center' padding='none'>Candidatos</TableCell>
                                            <TableCell align='center' padding='none'>Candidatos Selecionados</TableCell>
                                            <TableCell align='center' padding='none'>Status da Vaga</TableCell>
                                            <TableCell align='center' padding='none'>Farol</TableCell>
                                            <TableCell align='center' padding='none'>Taxa de inserção no Mercado</TableCell>
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
            </Grid>
        </Paper>
    );
}

export default VagasEmpresa;