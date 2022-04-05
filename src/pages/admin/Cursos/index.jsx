import { useContext, useEffect, useState } from "react";
import { Button, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";

import { TrilhaContext } from "../../../services/TrilhaContext";
import ModalForm from "../../../App/components/ModalForm";
import TrilhaForm from "./TrilhaForm";
import { ControlledAccordion } from "../../../App/components/ControlledAccordion";
import { FaCopy, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import RowItem from "../../../App/components/RowItem";
import CursoForm from "./CursoForm";
import { useNavigate } from "react-router";

const Cursos = () => {

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const [expanded, setExpanded] = useState('Modulo.nome');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const { createTrilhas, getTrilhas, updateTrilhas, deleteTrilha, trilhas, createTurma, updateTurma, deleteTurma } = useContext(TrilhaContext);
    // eslint-disable-next-line
    useEffect(() => getTrilhas(), []);

    const handleDelete = c => () => {
        setAction({
            title: `Deletar Trilha ${c.nome}?`,
            deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
            onDelete: () => {
                deleteTrilha(c._id)
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const handleDeleteTurma = (turma) => () => {
        setAction({
            title: `Deletar turma ${turma.numero}?`,
            deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
            onDelete: () => {
                deleteTurma(turma._id)
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const [data, setData] = useState({});

    const handleEdit = (data, Component) => () => {
        setAction({
            title: data.nome,
            body: <Component data={data} updateData={setData} />,
            onSave: async (nData) => {
                await updateTrilhas(nData);
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const handleNew = (Component) => () => {
        setAction({
            title: `Novo Trilha`,
            body: <Component updateData={setData} />,
            onSave: async (nData) => {
                const modulos = nData?.modulos?.split(',');
                await createTrilhas({ ...nData, modulos, turmas: [] });
                setOpen(false);
            },
        });
        setOpen(true);
    };

    // const handleDup = (Component, atual) => () => {
    //     setData(atual);
    //     setAction({
    //         title: `Novo Trilha (Copia de ${atual.nome})`,
    //         body: <Component updateData={setData} data={atual} />,
    //         onSave: async (nData) => {
    //             console.log(nData);
    //             // await createTrilhas({ ...nData, turmas: [] });
    //             // setOpen(false);
    //         },
    //     });
    //     setOpen(true);
    // };

    const handleNewTurma = (Component, curso) => () => {
        const numero = curso._id === '61e42cf634e5c27d42de045d' ? (
            curso.turmas.length + 22
        ) : (
            curso.turmas.length + 1
        )
        setAction({
            title: `Nova Turma`,
            body: <Component updateData={setData} />,
            onSave: async (nData) => {
                await createTurma({ ...nData, numero }, curso._id);
                setOpen(false);
            },
        });
        setOpen(true);
    };

    const handleEditTurma = (data, Component) => () => {
        setAction({
            title: `Editando turma ${data.numero}`,
            body: <Component data={data} updateData={setData} />,
            onSave: async (nData) => {
                await updateTurma(nData, data._id);
                setOpen(false);
            },
        });
        setOpen(true);
    };

    // const handleDupTurma = (data, Component, curso) => () => {
    //     const numero = curso._id === '61c1c8f347c7f1896890016e' ? (
    //         curso.turmas.length + 22
    //     ) : (
    //         curso.turmas.length + 1
    //     )
    //     setAction({
    //         title: `Nova Turma (Cópia de ${data.numero})`,
    //         body: <Component data={data} updateData={setData} user={user} curso={curso} />,
    //         onSave: async (nData) => {
    //             console.log({ ...data, ...nData, numero });
    //             const res = await createTurma({ ...data, ...nData, numero }, curso._id);
    //             // const res = await updateTurma(nData, data._id);
    //             if (res) setOpen(false);
    //         },
    //     });
    //     setOpen(true);
    // };

    const navigate = useNavigate();
    const handleView = (id, nome) => () => { navigate(`/admin/cursos/${nome}&${id}`) }

    return (
        <>
            <Paper sx={{ marginTop: 8 }}>
                <Button variant='contained' fullWidth onClick={handleNew(TrilhaForm)}>
                    Adicionar Trilha
                </Button>
                {trilhas?.map(c => (
                    <ControlledAccordion
                        title={c.nome}
                        key={c._id}
                        expanded={expanded === c.nome}
                        onChange={handleChange(c.nome)}
                    >
                        <List>
                            <ListItem button onClick={handleNewTurma(CursoForm, c)}>
                                <ListItemIcon>
                                    <FaPlus />
                                </ListItemIcon>
                                <ListItemText primary="ADICIONE UMA TURMA" />
                            </ListItem>
                            <ListItem button onClick={handleEdit(c, TrilhaForm)}>
                                <ListItemIcon>
                                    <FaPen />
                                </ListItemIcon>
                                <ListItemText primary="EDITAR TRILHA" />
                            </ListItem>
                            {/* <ListItem button onClick={handleDup(TrilhaForm, c)}>
                                <ListItemIcon>
                                    <FaCopy />
                                </ListItemIcon>
                                <ListItemText primary="DUPLICAR ESTA TRILHA" />
                            </ListItem> */}
                            <ListItem button onClick={handleDelete(c)}>
                                <ListItemIcon>
                                    <FaTrash />
                                </ListItemIcon>
                                <ListItemText primary="DELETAR TRILHA" />
                            </ListItem>
                            {c.turmas.map(t => (
                                <RowItem
                                    key={t._id}
                                    primary={'Turma ' + t.numero}
                                    secondary={t.instituicao?.length > 1 ? t.instituicao?.reduce((s, v) => s + ' | ' + v) : t.instituicao?.[0]}
                                    onPress={handleView(t._id, c.nome)}
                                    onEdit={handleEditTurma(t, CursoForm)}
                                    onDelete={handleDeleteTurma(t)}
                                // IconButtons={[
                                //     { icon: <FaCopy />, onClick: handleDupTurma(t, CursoForm, m) }
                                // ]}
                                />
                            ))}
                        </List>
                        {c.turmas.length === 0 && <Typography>Este Trilha não possui turmas cadastradas</Typography>}
                    </ControlledAccordion>
                ))}
            </Paper>
            {trilhas?.length === 0 && <Typography>Você não possui Trilhas cadastrados</Typography>}
            <br />
            <ModalForm open={open} data={data} onClose={() => setOpen(false)} {...action} />
        </>
    );
}

export default Cursos;