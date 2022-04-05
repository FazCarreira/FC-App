import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminContext } from "../../../../services/AdminContext";
import { ConstantsContext } from "../../../../services/ConstantsContext";
import PerfilAluno from "../../../aluno/AlunoPerfil";
import CertificadoAluno from "./Certificado";
import AlunoCurriculo from "./Currículo";

const Aluno = () => {
    const { id } = useParams();

    const { getUser, user, editCurriculo } = useContext(AdminContext);
    const { setCustomTitle } = useContext(ConstantsContext);

    // eslint-disable-next-line
    useEffect(() => getUser(id), []);

    useEffect(() => setCustomTitle(user?.name), [user, setCustomTitle])

    const [value, setValue] = useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    <Tab label="CERTIFICADOS" value="CERTIFICADOS" />
                    <Tab label="CURRÍCULO" value="CURRÍCULO" />
                    <Tab label="PERFIL" value="PERFIL" />
                </TabList>
            </Box>
            <TabPanel value="CERTIFICADOS"><CertificadoAluno user={user} /></TabPanel>
            <TabPanel value="CURRÍCULO"><AlunoCurriculo user={user} editCurriculo={editCurriculo} /></TabPanel>
            <TabPanel value="PERFIL"><PerfilAluno user={user} /></TabPanel>
        </TabContext>
    );
}

export default Aluno;