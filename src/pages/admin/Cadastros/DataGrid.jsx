import { Fragment, useState } from "react";
import { Avatar, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';

import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { FaCheck, FaDownload, FaEye, FaFileDownload, FaFilter, FaPencilAlt, FaTimes, FaTrash } from "react-icons/fa";
import CadastroForm from "./Form";
import { DatePicker } from "@mui/lab";

function descendingComparator(a, b, orderBy) {
    if (b?.[orderBy] < a?.[orderBy]) {
        return -1;
    }
    if (b?.[orderBy] > a?.[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        else return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell?.label}
                        align='center'
                        padding='none'
                        sortDirection={orderBy === headCell?.label ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell?.label}
                            direction={orderBy === headCell?.label ? order : 'asc'}
                            onClick={createSortHandler(headCell?.label)}
                        >
                            {headCell?.label}
                            {orderBy === headCell?.label ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'decrescente' : 'crescente'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align='center' >AÇÕES</TableCell>
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = (props) => {
    const { selected, title, onDelete, onDownload, onPDF, filter, headCells } = props;

    const [search, setSearch] = useState(false);
    const [filterText, setFilterText] = useState({});
    const [noProfile, setNoProfile] = useState(false);
    const [cadastro, setCadastro] = useState({ dia: false, mes: false, ano: false });
    const handleCadastro = (event) => setCadastro({ ...cadastro, [event.target.name]: event.target.checked, });
    const handleFilter = ({ target }) => setFilterText({ ...filterText, [target.name]: target.value })
    const onFilter = () => {
        filter(filterText, cadastro, noProfile)
    };

    const cadastroHandler = (cell) => {
        if (cadastro.dia)
            return (<DatePicker
                fullWidth
                label="Dia do Cadastro"
                openTo="year"
                value={filterText['Cadastro'] || ''}
                onChange={(value) => {
                    handleFilter({ target: { name: cell?.label, value } });
                }}
                renderInput={(params) => <TextField {...params} helperText={null} />}
            />)
        else if (cadastro.ano) {
            if (cadastro.mes)
                return (<DatePicker
                    fullWidth
                    label="Mês e Ano do Cadastro"
                    views={['year', 'month']}
                    value={filterText['Cadastro'] || ''}
                    onChange={(value) => {
                        handleFilter({ target: { name: cell?.label, value } });
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                />)
            else
                return (<DatePicker
                    fullWidth
                    label="Ano do Cadastro"
                    views={['year']}
                    value={filterText['Cadastro'] || ''}
                    onChange={(value) => {
                        handleFilter({ target: { name: cell?.label, value } });
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                />)
        } else if (cadastro.mes)
            return (<FormControl fullWidth>
                <InputLabel>Mês do Cadastro</InputLabel>
                <Select
                    fullWidth
                    label='Mês de cadastro'
                    value={noProfile ? '' : filterText['Cadastro'] || ''}
                    onChange={handleFilter}
                    name={cell?.label} disabled={noProfile}
                >
                    {moment.months().map((m, i) => <MenuItem key={i} value={i + 1}>{m?.toUpperCase()}</MenuItem>)}
                </Select>
            </FormControl>)
        else return (<TextField label='Selecione um parametro' fullWidth disabled />)
    }

    const cancel = () => {
        filter(false);
        setFilterText({});
        setSearch(false);
    }

    const toggleNoProfile = () => setNoProfile(!noProfile)


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selected.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {!search && <>
                {selected.length > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {selected.length} selecionados
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                )}
            </>}
            {selected.length > 0 ? (
                <>
                    <Tooltip title="Delete" onClick={() => onDelete(selected.map(s => s?.user._id))}>
                        <IconButton>
                            <FaTrash />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Baixar CSV" onClick={() => onDownload(selected)}>
                        <IconButton>
                            <FaDownload />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Baixar PDF" onClick={() => onPDF(selected)}>
                        <IconButton>
                            <FaFileDownload />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (search ? (
                <Grid container spacing={2} >
                    {headCells.map(cell => {
                        if (cell?.label === 'Avatar') return false;
                        else if (cell?.label === 'Cadastro') return (<Fragment key={cell?.label}>
                            <Grid item xs={12} md={6}>
                                <Stack direction="row" alignItems="center">
                                    {cadastroHandler(cell)}
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={cadastro.dia} onChange={handleCadastro} name='dia' />
                                        }
                                        label="Dia"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={cadastro.mes || cadastro.dia} onChange={handleCadastro} name='mes' />
                                        }
                                        label="Mês"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={cadastro.ano || cadastro.dia} onChange={handleCadastro} name='ano' />
                                        }
                                        label="Ano"
                                    />
                                </Stack>
                            </Grid>
                        </Fragment>);
                        else return (
                            <Grid key={cell?.label} item xs={12} md={6}>
                                <TextField
                                    label={cell?.label} fullWidth name={cell?.label} disabled={noProfile}
                                    value={noProfile ? '' : filterText[cell?.label] || ''} onChange={handleFilter}
                                />
                            </Grid>
                        );
                    })}
                    <Grid item xs={6} md={1} sx={{ marginY: 'auto' }}>
                        <Tooltip title="Pes" onClick={onFilter}>
                            <IconButton>
                                <FaCheck />
                            </IconButton>
                        </Tooltip >
                    </Grid>
                    <Grid item xs={6} md={1} sx={{ marginY: 'auto' }}>
                        <Tooltip title="Cancelar" onClick={cancel}>
                            <IconButton>
                                <FaTimes />
                            </IconButton>
                        </Tooltip >
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={noProfile} onChange={toggleNoProfile} />
                            }
                            label="Usuário sem perfil"
                        />
                    </Grid>
                </Grid>
            ) : (
                <Tooltip title="Filter list" onClick={() => setSearch(true)}>
                    <IconButton>
                        <FaFilter />
                    </IconButton>
                </Tooltip >
            ))}
        </Toolbar >
    );
};

const DataGrid = ({ data, headCells, title, onEdit, onDelete, onDeleteMulti, onDownload, onView }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Nome');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(data);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filter = (search, cadastro, noProfile) => {
        if (noProfile) setRows(data.filter(e => !e.full.profile));
        else if (!search) setRows(data)
        else setRows(data.filter(e => Object.keys(search).every(s => {
            if (s === 'Cadastro') {
                const user = moment(e[s], 'DD/MM/YYYY');
                if (cadastro.dia) return search[s].format('DD/MM/YYYY') === user.format('DD/MM/YYYY');
                else if (cadastro.ano) {
                    if (cadastro.mes) return search[s].format('MM/YYYY') === user.format('MM/YYYY');
                    else return search[s].format('YYYY') === user.format('YYYY');
                } else return user.format('MMM') === moment().month(search[s] - 1).format("MMM");
            }
            if (s === 'Turma' && search[s] !== '')
                return e[s] === search[s];
            else if (typeof e[s] === 'string' && search[s] !== '')
                return e[s].toLowerCase().includes(search[s].toLowerCase());
            else return false;
        })))
        // console.log(typeof search?.Cadastro);
    }
    // const filterField = (search, field) => search && field ? setRows(data.filter(e => e[field].some(s => typeof s === 'string' && s.))) : setRows(data);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows?.map((n) => n?.full);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows?.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

    const exportPDF = (selected) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = `Relatório de Alunos`;
        const headers = [headCells.filter(hc => hc.label !== 'Avatar').map(hc => hc.label)];

        const data = selected.map(s => rows?.filter(r => r.full === s).map(o => Object.values(o).filter(v => typeof v === 'string' ? !v.includes('www.gravatar.com') : true))[0]);

        console.log(headers, data)

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(`Alunos - ${moment().format('DD-MM-YYYY')}`)
    }

    return (<>
        <EnhancedTableToolbar selected={selected} title={title} onDelete={onDeleteMulti} onDownload={onDownload} onPDF={exportPDF} filter={filter} headCells={headCells} />
        <TableContainer sx={{ maxHeight: 600 }}>
            <Table
                stickyHeader
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows?.length}
                    headCells={headCells}
                />
                <TableBody>
                    {/* <TableRow>
                        <TableCell />
                        {headCells[0].label === 'Avatar' && <TableCell />}
                        {headCells.map((cell, i) => i === 0 ? null : <TableCell key={cell?.label} align="right">
                            <TextField />
                        </TableCell>)}
                    </TableRow> */}
                    {stableSort(rows, getComparator(order, orderBy))
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const isItemSelected = isSelected(row?.full);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row?.Nome + index}
                                    selected={isItemSelected}
                                    onClick={(event) => handleClick(event, row?.full)}
                                >
                                    <TableCell padding="checkbox" onClick={(event) => handleClick(event, row?.full)}>
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    {headCells[0].label === 'Avatar' && <TableCell>
                                        <Avatar src={row.Avatar} alt={row.Nome} />
                                    </TableCell>}
                                    {headCells.map((cell, i) => i === 0 ? null : <TableCell key={cell?.label} align="right">{row?.[cell?.label]}</TableCell>)}
                                    <TableCell align='center' id={labelId}>
                                        {onView && (
                                            <IconButton onClick={onView(row.full?._id)}>
                                                <FaEye />
                                            </IconButton>
                                        )}
                                        {onEdit && (
                                            <IconButton onClick={onEdit(row.full, CadastroForm)}>
                                                <FaPencilAlt />
                                            </IconButton>
                                        )}
                                        {onDelete && (
                                            <IconButton onClick={onDelete(row?.full?._id)}>
                                                <FaTrash />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: (true ? 33 : 53) * emptyRows,
                            }}
                        >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='Linhas por página'
            labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`; }}
        />
    </>
    );
}

export default DataGrid;