import { useContext, useState } from "react";
import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { PdfContext } from "../../../../services/PdfContext";
import RelatorioAula from "../../../../App/components/RelatorioAula";

const RelatorioModulos = ({ alunos, modulos, updateData }) => {

    const { gerarRelatorioAulas } = useContext(PdfContext);

    const initialAvaliacao = {
        partes: [{
            tema: '',
            tempo: '',
            atividades: ''
        }],
        observacao_geral: '',
        destaques: [],
        atencao_especial: [],
    }

    const [formData, setFormData] = useState(modulos?.map(({ avaliacao }) => (avaliacao || initialAvaliacao)));
    const newData = (i) => (data) => {
        const upData = modulos?.map(({ avaliacao }, j) => j === i ? data : (avaliacao || initialAvaliacao))
        updateData(upData);
        setFormData(upData)
    }

    const [value, setValue] = useState(modulos?.[0].nome);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<TabContext value={value}>
        <Button variant='contained' onClick={gerarRelatorioAulas(modulos, formData, alunos)} fullWidth>Baixar PDF</Button>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {modulos?.map(({ nome }) => <Tab key={nome} wrapped label={nome} value={nome} />)}
            </TabList>
        </Box>
        {modulos?.map((modulo, k) => <TabPanel key={k} value={modulo.nome}><RelatorioAula alunos={alunos} modulo={modulo} updateData={newData(k)} disablePDF /></TabPanel>)}
    </TabContext>);
}

export default RelatorioModulos;