import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Modulo from "./Modulos";
import Participantes from "./Participantes";
import Forum from "../../../App/components/Forum";

const Tabs = ({ turma, modulos }) => {

    const [value, setValue] = useState('FORUM');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                    <Tab label="FORUM" value="FORUM" />
                    <Tab label="ALUNOS" value="ALUNOS" />
                    {modulos?.map(m => <Tab key={m.nome} wrapped label={m.nome} value={m.nome} />)}
                </TabList>
            </Box>
            <TabPanel value="FORUM">
                <Forum turma={turma} />
            </TabPanel>
            <TabPanel value="ALUNOS"><Participantes modulos={modulos} numeroTurma={turma.numero} avaliacoes={turma.avaliacoes} /></TabPanel>
            {modulos?.map((m, i) => <TabPanel key={m.nome} value={m.nome}><Modulo modulo={m} /></TabPanel>)}
        </TabContext>
    );
}

export default Tabs;