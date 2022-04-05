import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminContext } from "../../../../services/AdminContext";
import { ConstantsContext } from "../../../../services/ConstantsContext";
import PerfilFacilitador from "./FacilitadorPerfil";

const Facilitador = () => {
    const { id } = useParams();

    const { getUser, user } = useContext(AdminContext);
    const { setCustomTitle } = useContext(ConstantsContext);

    // eslint-disable-next-line
    useEffect(() => getUser(id), []);

    useEffect(() => setCustomTitle(user?.name), [user, setCustomTitle])

    const [value, setValue] = useState('HISTÓRICO');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    alert(user?.profile?._id);
    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    <Tab label="HISTÓRICO" value="HISTÓRICO" />
                    <Tab label="PERFIL" value="PERFIL" />
                    <Tab label="CERTIFICADOS" value="CERTIFICADOS" />
                </TabList>
            </Box>
            <TabPanel value="HISTÓRICO">EM PROGRESSO</TabPanel>
            <TabPanel value="PERFIL"><PerfilFacilitador user={user} /></TabPanel>
            <TabPanel value="CERTIFICADOS">EM PROGRESSO</TabPanel>
        </TabContext>
    );
}

export default Facilitador;