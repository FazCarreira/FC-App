import { useContext, useEffect, useState } from "react";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";

import { TreinamentoContext } from "../../../services/TreinamentoContext";

import ModalForm from "../../../App/components/ModalForm";
import { ControlledAccordion } from "../../../App/components/ControlledAccordion";

import TreinamentoForm from "./TreinamentoForm";
import Steps from "./Steps";

const Treinamentos = () => {

    const { treinamentos, createTreinamentos, getTreinamentos, updateTreinamentos, deleteTreinamento } = useContext(TreinamentoContext);

    // eslint-disable-next-line
    useEffect(() => getTreinamentos(), []);

    const [expanded, setExpanded] = useState('');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});
    const [data, setData] = useState({});

    const handleDelete = (treinamento) => () => {
        setAction({
            title: `Deletar ${treinamento.nome}?`,
            deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
            onDelete: () => {
                deleteTreinamento(treinamento._id);
                setOpen(false);
            },
        });
        setOpen(true);
    };


    const handleEdit = (data) => () => {
        setAction({
            title: data.nome,
            body: <TreinamentoForm data={data} updateData={setData} />,
            onSave: async (nData) => {
                const etapaNames = typeof nData.etapas === 'string' ? nData?.etapas?.split(',') : [nData.etapas];
                const etapas = etapaNames.map((nome, i) => ({ ...data.etapas[i], nome }))
                await updateTreinamentos({ ...nData, etapas, _id: data._id });
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const handleNew = () => {
        setAction({
            title: `Novo Treinamento`,
            body: <TreinamentoForm updateData={setData} />,
            onSave: async (nData) => {
                const etapas = nData?.etapas?.split(',');
                createTreinamentos({ ...nData, etapas });
                setOpen(false);
            },
        });
        setOpen(true);
    };

    return (<>
        <Paper>
            <List>
                <ListItem button onClick={handleNew}>
                    <ListItemIcon>
                        <FaPlus />
                    </ListItemIcon>
                    <ListItemText primary="ADICIONAR TREINAMENTO" />
                </ListItem>
            </List>
        </Paper>
        {treinamentos?.map((treinamento, i) => (
            <ControlledAccordion
                key={i}
                title={treinamento.nome}
                secondary={
                    <Stack direction='row'>
                        <IconButton onClick={handleEdit(treinamento)}><FaPen /></IconButton>
                        <IconButton onClick={handleDelete(treinamento)}><FaTrash /></IconButton>
                    </Stack>
                }
                expanded={expanded === treinamento.name}
                onChange={handleChange(treinamento.name)}
            >
                <Steps treinamento={treinamento} onUpdate={updateTreinamentos} />
            </ControlledAccordion>
        ))}
        <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
    </>);
}

export default Treinamentos;