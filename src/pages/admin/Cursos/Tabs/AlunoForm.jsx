import { useContext, useEffect, useState } from "react";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

import { AdminContext } from "../../../../services/AdminContext";

const AlunoForm = ({ alunosTurma, updateData, add }) => {
    const all = useContext(AdminContext)
    // eslint-disable-next-line
    useEffect(() => all.getUsers('aluno'), []);

    const alunos = add ? all.alunos.filter(({ _id }) => !alunosTurma.some(a => a._id === _id)) : alunosTurma;

    const [aluno, setAluno] = useState([]);
    const handleChange = ({ target: { value } }) => {
        setAluno(value);
        updateData(value);
    };

    return (<FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="Alunos">Alunos</InputLabel>
        <Select
            labelId="Alunos"
            multiple
            value={aluno}
            onChange={handleChange}
            input={<OutlinedInput label="Alunos" />}
            renderValue={(selected) => selected.sort(sortAlphaBetical).map((v, i, a) => `${v.name}${i + 1 === a.length ? '' : ', '}`)}
            MenuProps={MenuProps}
            fullWidth
        >
            {alunos?.sort(sortAlphaBetical).map(a => (
                <MenuItem key={a._id} value={a}>
                    <Checkbox checked={aluno.indexOf(a) > -1} />
                    <ListItemText primary={a.name} />
                </MenuItem>
            ))}
        </Select>
    </FormControl>);
}

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

const sortAlphaBetical = (a, b) => {
    let fa = a.name?.toLowerCase(),
        fb = b.name?.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
}

export default AlunoForm;