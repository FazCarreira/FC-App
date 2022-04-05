import { Fragment, useContext, useState } from "react";
import { Box, Button, Checkbox, Chip, FormControl, Grid, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

import { SubTitle, Title } from "./StyledComponents";
import TextDivider from "./TextDivider";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { PdfContext } from "../../services/PdfContext";

const RelatorioAula = ({ alunos, modulo, updateData, disablePDF, ro }) => {

    const { gerarRelatorioAulas } = useContext(PdfContext);

    const [formData, setFormData] = useState(modulo?.avaliacao || {
        partes: [{
            tema: '',
            tempo: '',
            atividades: ''
        }],
        observacao_geral: '',
        destaques: [],
        atencao_especial: [],
    });

    const { partes, observacao_geral, destaques, atencao_especial } = formData;

    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
        updateData({ ...formData, [target.name]: target.value });
    };

    const handlePartes = i => ({ target }) => {
        const arr = partes;
        if (!arr[i]) arr[i] = { tema: '', tempo: '', atividades: '' };
        arr[i][target.name] = target.value;
        setFormData({ ...formData, partes: arr });
        updateData({ ...formData, partes: arr });
    }

    const addDestaque = (type) => () => {
        const arr = formData[type];
        arr.push({ id: '', hab_per: [], observacao: '' });
        setFormData({ ...formData, [type]: arr });
        updateData({ ...formData, [type]: arr });
    }

    const handleDestaques = (i, type) => ({ target }) => {
        const arr = formData[type];
        arr[i][target.name] = target.value;
        setFormData({ ...formData, [type]: arr });
        updateData({ ...formData, [type]: arr });
    }

    const removeDestaque = (i, type) => _ => {
        const arr = formData[type].filter((a, j) => j !== i);
        setFormData({ ...formData, [type]: arr });
        updateData({ ...formData, [type]: arr });
    }

    const handleSelect = (i, type) => ({ target }) => {
        const arr = formData[type];
        arr[i][target.name] = target.value;
        setFormData({ ...formData, [type]: arr });
        updateData({ ...formData, [type]: arr });
    }

    return (
        <Grid container spacing={2} alignItems='center'>
            {!disablePDF && <Grid item xs={12}>
                <Button variant='contained' onClick={gerarRelatorioAulas([modulo], [formData], alunos)} fullWidth>Baixar PDF</Button>
            </Grid>}
            {modulo?.aulas?.map((aula, i) => (<Fragment key={i}>
                <Grid item xs={12}>
                    <Title>Atividades da aula - {aula?.nome}</Title>
                    <SubTitle>{moment(aula?.dia).format('DD/MM/YYYY')} - {moment(aula?.hora_inicial).format('HH:mm')} às {moment(aula?.hora_final).format('HH:mm')}</SubTitle>
                </Grid>
                {Array.apply(null, Array(2)).map((parte, j) => (<Fragment key={j}>
                    {j !== 0 && (
                        <Grid item xs={12}>
                            <TextDivider>INTERVALO</TextDivider>
                        </Grid>
                    )}
                    <Grid item xs={9}>
                        <TextField
                            disabled={ro}
                            name='tema'
                            label='Tema da aula'
                            value={partes?.[i * 2 + j]?.tema || ''}
                            onChange={handlePartes(i * 2 + j)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            disabled={ro}
                            name='tempo'
                            label='Que horas?'
                            value={partes?.[i * 2 + j]?.tempo || ''}
                            onChange={handlePartes(i * 2 + j)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled={ro}
                            name='atividades'
                            label='Que atividades foram realizadas?'
                            helperText='Separe as atividades por vírgula'
                            value={partes?.[i * 2 + j]?.atividades || ''}
                            onChange={handlePartes(i * 2 + j)}
                            fullWidth
                        />
                    </Grid>
                </Fragment>))}
            </Fragment>))}
            <Grid item xs={12}>
                <Title>Observações</Title>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    disabled={ro}
                    name='observacao_geral'
                    label='Deixe suas observações gerais'
                    value={observacao_geral}
                    onChange={onChange}
                    fullWidth
                    multiline
                    minRows={3}
                />
            </Grid>
            {!ro && <Button sx={{ mt: 3 }} onClick={addDestaque('destaques')} fullWidth >
                Adicionar Destaque
            </Button>}
            {destaques?.map((destaque, i) => (<Fragment key={i}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="alunos_label">Aluno Destaque</InputLabel>
                        <Select
                            disabled={ro}
                            labelId="alunos_label"
                            name="id"
                            value={destaque?.id}
                            onChange={handleSelect(i, 'destaques')}
                            fullWidth
                        >
                            {alunos.map((aluno) => <MenuItem key={aluno?._id} value={aluno?._id}>{aluno?.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <FormControl fullWidth>
                        <InputLabel id="destaques">Habilidades percebidas no aluno</InputLabel>
                        <Select
                            disabled={ro}
                            labelId="destaques"
                            name="hab_per"
                            value={destaque?.hab_per}
                            onChange={handleSelect(i, 'destaques')}
                            fullWidth
                            multiple
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} color="primary" label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {destaqueList.map((d) => <MenuItem key={d} value={d}>
                                <Checkbox checked={destaque?.hab_per.indexOf(d) > -1} />
                                <ListItemText primary={d} />
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <IconButton disabled={ro} onClick={removeDestaque(i, 'destaques')}><FaTrash /></IconButton>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={ro}
                        name='observacao'
                        label='Observações sobre o aluno'
                        value={destaque?.observacao}
                        onChange={handleDestaques(i, 'destaques')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
            </Fragment>))}
            {!ro && <Button sx={{ mt: 3 }} onClick={addDestaque('atencao_especial')} fullWidth >
                Adicionar Atenção Especial
            </Button>}
            {atencao_especial?.map((destaque, i) => (<Fragment key={i}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="alunos_label">Aluno para dar atenção</InputLabel>
                        <Select
                            disabled={ro}
                            labelId="alunos_label"
                            name="id"
                            value={destaque?.id}
                            onChange={handleSelect(i, 'atencao_especial')}
                            fullWidth
                        >
                            {alunos.map((aluno) => <MenuItem key={aluno?._id} value={aluno?._id}>{aluno?.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        disabled={ro}
                        name='observacao'
                        label='Observações sobre o aluno'
                        value={destaque?.observacao}
                        onChange={handleDestaques(i, 'atencao_especial')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton disabled={ro} onClick={removeDestaque(i, 'atencao_especial')}><FaTrash /></IconButton>
                </Grid>
            </Fragment>))}
        </Grid>
    );
}

const destaqueList = ['Comunicação Eficaz', 'Inteligência Emocional', 'Resolução de Problemas', 'Orientação para Servir', 'Julgamento e Tomada de Decisão', 'Coordenação com os Outros', 'Flexibilidade Cognitiva', 'Criatividade', 'Pensamento Crítico', 'Gestão de Pessoas', 'Negociação', 'Resiliência', 'Empatia', 'Ética no Trabalho']

export default RelatorioAula;