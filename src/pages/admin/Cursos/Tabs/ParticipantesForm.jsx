import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CadastroContext } from "../../../../services/CadastrosContext";

const AlunoForm = ({ updateData, alunosIn }) => {

    const { user, getUser } = useContext(CadastroContext);

    // eslint-disable-next-line
    useEffect(() => getUser('aluno'), []);

    const [alunos, setAlunos] = useState(alunosIn?.map(a => a?.id?.name) || []);

    const handleChange = ({ target }) => {
        const { value } = target;
        setAlunos(typeof value === 'string' ? value.split(',') : value);
        const selection = user.map(a => ({ nome: a?.user?.name, id: a?.user._id })).filter(a => value.includes(a.nome))
        updateData(selection);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="alunos_label">Alunos do Curso</InputLabel>
            <Select
                labelId="alunos_label"
                id="alunos"
                multiple
                name="alunos"
                value={alunos}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                fullWidth
            >
                {user.map((aluno) => {
                    return (
                        aluno?.profile?.turma - 22 === 0 ? (<MenuItem key={aluno?.user?._id} value={aluno?.profile?.perfil?.basico?.nome || aluno.user?.email}>
                            <Checkbox checked={alunos?.indexOf(aluno?.profile?.perfil?.basico?.nome || aluno.user?.email) > -1} />
                            <ListItemText primary={aluno?.profile?.perfil?.basico?.nome || aluno.user?.email} />
                        </MenuItem>) : false
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default AlunoForm;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};