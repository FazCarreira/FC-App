import { useContext, useState } from "react";
import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { PdfContext } from "../../../services/PdfContext";
import RelatorioAula from "../../../App/components/RelatorioAula";

const RelatorioModulos = ({ alunos, avaliacoes, modulo, updateData }) => {

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
    let index = -1;
    const avaAnteriores = avaliacoes.reduce((t, a, i) => {
        if (a.nome === modulo.nome) index = i;
        if (index === -1) t.push(a);

        return t;
    }, []);

    const formData = [...avaAnteriores?.map(({ avaliacao }) => (avaliacao || initialAvaliacao)), initialAvaliacao];
    const [value, setValue] = useState(modulo.nome);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const upData = (v) => {
        formData[avaAnteriores.lenght] = v;
        updateData(v)
    }

    return (<TabContext value={value}>
        <Button variant='contained' onClick={gerarRelatorioAulas([...avaAnteriores, modulo], formData, alunos)} fullWidth>Baixar PDF</Button>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {avaAnteriores?.map(({ nome }) => <Tab key={nome} wrapped label={nome} value={nome} />)}
                <Tab key={modulo.nome} wrapped label={modulo.nome} value={modulo.nome} />
            </TabList>
        </Box>
        {avaAnteriores?.map((a, k) => <TabPanel key={k} value={a.nome}><RelatorioAula ro alunos={alunos} modulo={a} updateData={updateData} disablePDF /></TabPanel>)}
        <TabPanel value={modulo.nome}><RelatorioAula alunos={alunos} modulo={modulo} updateData={upData} disablePDF /></TabPanel>
    </TabContext>);
}

export default RelatorioModulos;