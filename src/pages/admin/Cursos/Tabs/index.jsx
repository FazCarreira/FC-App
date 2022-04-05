import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import Forum from "../../../../App/components/Forum";
import { TrilhaContext } from "../../../../services/TrilhaContext";
// import Forum from "./Forum";
// import Materiais from "./Materiais";
import Modulo from "./Modulo";
import Participantes from "./Participantes";
// import Participantes from "./Participantes";

const Tabs = ({ turma, nomeCurso }) => {
    const { getTurma } = useContext(TrilhaContext)
    const [value, setValue] = useState('FORUM');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updateFunc = async () => await getTurma(turma._id);

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                    <Tab label="FORUM" value="FORUM" />
                    <Tab label="ALUNOS" value="ALUNOS" />
                    {turma?.modulos?.map(m => <Tab key={m.nome} wrapped label={m.nome} value={m.nome} />)}
                </TabList>
            </Box>
            <TabPanel value="FORUM">
                <Forum turma={turma} updateFunc={updateFunc} />
            </TabPanel>
            <TabPanel value="ALUNOS"><Participantes turma={turma} nomeCurso={nomeCurso} /></TabPanel>
            {turma?.modulos?.map((m, i) => <TabPanel key={m.nome} value={m.nome}> <Modulo modulo={m} /> </TabPanel>)}
        </TabContext>
    );
}

export default Tabs;