import { useContext, useEffect, useMemo, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import { Navigate } from "react-router";
import ModalForm from "../../../../App/components/ModalForm";

import { AdminContext } from "../../../../services/AdminContext";

import DataGrid from "../DataGrid";
import CadastroForm from "../Form";

const CadastrosFornecedor = () => {

    const { parceiros, getUsers, deleteUser } = useContext(AdminContext);

    const facilitadoresArr = useMemo(_ => parceiros?.filter(p => p?.profile?.tipo === 'fornecedor').map(facilitador => createTableData(
        facilitador.avatar,
        facilitador.name?.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || 'SEM PERFIL',
        facilitador.phone || '--',
        // facilitador.profile?.endereco?.complemento || '--',
        facilitador.email || '--',
        facilitador.profile?.dt_nascimento || '--',
        facilitador.profile?.camisa || '--',
        facilitador.profile?.info_bancaria?.pix || '--',
        facilitador
    )), [parceiros])

    // eslint-disable-next-line
    useEffect(() => getUsers('facilitador'), []);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const handleDelete = (facilitador) => () => {
        setAction({
            title: `Deletar facilitador?`,
            deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
            onDelete: () => {
                deleteUser(facilitador, 'facilitador')
                setOpen(false);
            },
        });
        setOpen(true);
    };

    // const handleDownload = (arr) => {
    //     console.log(arr);
    //     setAction({
    //         title: `${arr.length} aluno${arr.length > 1 ? 's' : ''} selecionado${arr.length > 1 ? 's' : ''} baixados`,
    //         body: <ExportCSV
    //             data={rowDownload}
    //             header={header}
    //             separator={';'}
    //             callback={(res) => console.log(res)}
    //             isDownload={true}
    //             filename={"Alunos.csv"}
    //         />,
    //     })
    //     setOpen(true);
    // }

    // const handleDeleteMulti = (arr) => {
    //     setAction({
    //         title: `Deletar ${arr.length} aluno${arr.length > 1 ? 's' : ''} selecionado${arr.length > 1 ? 's' : ''}?`,
    //         deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
    //         onDelete: () => {
    //             arr.map(id => deleteUser(id, 'aluno'))
    //             setOpen(false);
    //         },
    //     });
    //     setOpen(true);
    // }

    const [data, setData] = useState({});

    // const handleEdit = (data, Component) => () => {
    //     setAction({
    //         title: data?.name,
    //         body: <Component data={data} updateData={setData} />,
    //         onSave: (nData) => {
    //             const { role, ...body } = nData;
    //             const res = updateUser(body);
    //             if (res) setOpen(false);
    //             getUser('aluno')
    //         },
    //     });
    //     setOpen(true);
    // };

    const handleNew = (Component) => () => {
        setAction({
            title: `Novo facilitador`,
            body: <Component updateData={setData} localRole='facilitador' />,
            onSave: async (nData) => {
                console.log(nData);
            },
        });
        setOpen(true);
    };

    // const history = <useHistory></useHistory>();
    const [redirect, setRedirect] = useState(false);
    const handleView = (id) => () => setRedirect(id);

    // const handleCSV = (data) => data?.map(a => registerLegacy(a).catch(() => console.log(a)))

    function createTableData(Avatar, Nome, Telefone, Email, Aniversário, Camisa, Pix, full) {
        return { Avatar, Nome, Telefone, Email, Aniversário, Camisa, Pix, full };
    }

    const headCells = [
        { label: 'Avatar' },
        { label: 'Nome' },
        { label: 'Telefone' },
        // { label: 'Endereço' },
        { label: 'Email' },
        { label: 'Aniversário' },
        { label: 'Camisa' },
        { label: 'Pix' }
    ];;

    if (redirect) return <Navigate to={`/admin/facilitador/${redirect}`} />
    return (
        <>
            <Paper>
                <List>
                    <ListItem button onClick={handleNew(CadastroForm)}>
                        <ListItemIcon>
                            <FaPlus />
                        </ListItemIcon>
                        <ListItemText primary="ADICIONE UM FORNECEDOR" />
                    </ListItem>
                    <DataGrid title='Facilitadores' headCells={headCells} //onDeleteMulti={handleDeleteMulti} onDownload={handleDownload} exportPDF={exportPDF}
                        data={facilitadoresArr}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                </List>

            </Paper>
            <br />
            {facilitadoresArr?.length === 0 && <Typography>Você não possui facilitadores cadastrados</Typography>}
            <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
        </>
    );
}

export default CadastrosFornecedor