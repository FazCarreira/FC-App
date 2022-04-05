import { useContext, useEffect, useMemo, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { Navigate } from "react-router";
import ModalForm from "../../../../App/components/ModalForm";

import { AdminContext } from "../../../../services/AdminContext";

import DataGrid from "../DataGrid";
import CadastroForm from "../Form";

const CadastrosFacilitador = () => {

    const { empresa, getUsers, deleteUser } = useContext(AdminContext);

    const empresasArr = useMemo(_ => empresa?.map(empresa => createTableData(
        empresa.name?.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || 'SEM PERFIL',
        empresa.phone || '--',
        // facilitador.profile?.endereco?.complemento || '--',
        empresa.email || '--',
        empresa.profile?.dt_nascimento || '--',
        empresa.profile?.camisa || '--',
        empresa.profile?.info_bancaria?.pix || '--',
        empresa
    )), [empresa])

    // eslint-disable-next-line
    useEffect(() => getUsers('empresa'), []);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const handleDelete = (empresa) => () => {
        setAction({
            title: `Deletar empresa?`,
            deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
            onDelete: () => {
                deleteUser(empresa, 'empresa')
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
            title: `Nova empresa`,
            body: <Component updateData={setData} localRole='empresa' />,
            onSave: async (nData) => {
                console.log(nData);
            },
        });
        setOpen(true);
    };

    // const history = <useHistory></useHistory>();
    const [redirect, setRedirect] = useState(false);
    const handleView = (id) => () => setRedirect(id)

    // const handleCSV = (data) => data?.map(a => registerLegacy(a).catch(() => console.log(a)))

    function createTableData(Nome, Telefone, Email, Aniversário, Camisa, Pix, full) {
        return { Nome, Telefone, Email, Aniversário, Camisa, Pix, full };
    }

    const headCells = [
        { label: 'Nome' },
        { label: 'Telefone' },
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
                        <ListItemText primary="ADICIONE UMA EMPRESA" />
                    </ListItem>
                    <DataGrid title='EMPRESAS PARCEIRAS' headCells={headCells} //onDeleteMulti={handleDeleteMulti} onDownload={handleDownload} exportPDF={exportPDF}
                        data={empresasArr}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                </List>

            </Paper>
            <br />
            {empresasArr?.length === 0 && <Typography>Você não possui empresas parceiras cadastradas</Typography>}
            <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
        </>
    );
}

export default CadastrosFacilitador