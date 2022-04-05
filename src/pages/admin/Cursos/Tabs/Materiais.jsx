import { List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useState } from "react";
import { FaCog, FaFilePowerpoint, FaVideo } from "react-icons/fa";
import ModalForm from "../../../../components/ModalForm";

import RowItem from "../../../../components/RowItem";
import { CursoContext } from "../../../../services/CursoContext";
import MaterialForm from "./MateriaisForm";

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(24),
}))

const Materiais = ({ materiais }) => {

    const { updateModulo, curso } = useContext(CursoContext);

    const [data, setData] = useState(materiais);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const manageMaterial = (data, Component) => () => {
        setAction({
            title: 'Materiais',
            body: <Component curso={curso} data={data} updateData={setData} />,
            onSave: async (nData) => {
                const edit = { ...curso, materiais: nData };
                console.log(edit);
                const res = await updateModulo(edit, true);
                if (res) setOpen(false);
            },
        });
        setOpen(true);
    };

    return (
        <>
            <List>
                <RowItem
                    avatar={<FaCog size={32} color='#993399' />}
                    primary={<Title>Gerenciar Material</Title>}
                    onPress={manageMaterial(materiais, MaterialForm)}
                />
                <ListItem>
                    <Title>AULAS</Title>
                </ListItem>
                <List component="div" disablePadding>
                    {materiais?.map((m, i) => {
                        if (m.icon === 1) return (
                            <RowItem
                                key={i}
                                sx={{ pl: 8 }}
                                avatar={<FaVideo size={32} color='#993399' />}
                                primary={m.nome}
                                secondary={m.link}
                                onPress={() => window.open(m.link)}
                            />
                        )
                        else return false;
                    })}
                </List>
                <ListItem>
                    <Title>Slide das Aulas</Title>
                </ListItem>
                <List component="div" disablePadding>
                    {materiais?.map((m, i) => {
                        if (m.icon === 0) return (
                            <RowItem
                                key={i}
                                sx={{ pl: 8 }}
                                avatar={<FaFilePowerpoint size={32} color='#993399' />}
                                primary={m.nome}
                                secondary={m.link}
                                onPress={() => window.open(m.link)}
                            />
                        )
                        else return false;
                    })}
                </List>
            </List>

            <ModalForm open={open} data={data} onClose={() => setOpen(false)} {...action} />
        </>
    );
}

export default Materiais;