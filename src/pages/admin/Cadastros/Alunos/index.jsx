import { useContext, useEffect, useMemo, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import { Navigate } from "react-router";
import ModalForm from "../../../../App/components/ModalForm";

import { AdminContext } from "../../../../services/AdminContext";

import DataGrid from "../DataGrid";
import CadastroForm from "../Form";

const CadastrosAluno = () => {

    const { alunos, getUsers, deleteUser } = useContext(AdminContext);

    const alunosArr = useMemo(_ => alunos?.map(aluno => createTableData(
        aluno.avatar,
        aluno.name || "--",
        ((aluno.legacy ? moment().year() - moment(aluno.profile?.dt_nascimento, 'DD/MM/YYYY').year() : moment().year() - moment(aluno.profile?.dt_nascimento).year()) || "--"),
        aluno.phone || '--',
        aluno.email || '--',
        `${aluno.profile?.endereco?.cidade || 'Sem Cidade'} / ${aluno.profile?.endereco?.estado || 'Sem Estado'}`,
        aluno.profile?.escolaridade || '--',
        aluno.profile?.instituicao || '--',
        '' || '--', addLeadingZeros(aluno.profile?.turma || 0, 2), 'Não' || '--',
        moment(aluno.created).format('DD/MM/YYYY') || '--',
        aluno
    )), [alunos])

    // eslint-disable-next-line
    useEffect(() => getUsers('aluno'), []);

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const handleDelete = (aluno) => () => {
        setAction({
            title: `Deletar aluno?`,
            deleteLabel: "Atenção! Deletar é uma ação que não pode ser desfeita",
            onDelete: () => {
                deleteUser(aluno, 'aluno')
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
            title: `Novo aluno`,
            body: <Component updateData={setData} localRole='aluno' />,
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

    function createTableData(Avatar, Nome, Idade, Telefone, Email, Cidade, Escolaridade, Instituição, Parceiro, Turma, Destaque, Cadastro, full) {
        return { Avatar, Nome, Idade, Telefone, Email, Cidade, Escolaridade, Instituição, Parceiro, Turma, Destaque, Cadastro, full };
    }

    const headCells = [
        { label: 'Avatar', },
        { label: 'Nome', },
        { label: 'Idade', },
        { label: 'Telefone', },
        { label: 'Email', },
        { label: 'Cidade', },
        { label: 'Escolaridade', },
        { label: 'Instituição', },
        { label: 'Destaque', },
        { label: 'Cadastro', },
        // { label: 'Parceiro', },
        { label: 'Turma', },
    ];

    if (redirect) return <Navigate to={`/admin/alunos/${redirect}`} />
    return (
        <>
            <Paper>
                <List>
                    <ListItem button onClick={handleNew(CadastroForm)}>
                        <ListItemIcon>
                            <FaPlus />
                        </ListItemIcon>
                        <ListItemText primary="ADICIONE UM ALUNO" />
                    </ListItem>
                    <DataGrid title='Alunos' headCells={headCells} //onDeleteMulti={handleDeleteMulti} onDownload={handleDownload} exportPDF={exportPDF}
                        data={alunosArr}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                </List>

            </Paper>
            <br />
            {alunosArr?.length === 0 && <Typography>Você não possui alunos cadastrados</Typography>}
            <ModalForm open={open} onClose={() => setOpen(false)} data={data} {...action} fullWidth maxWidth='md' />
        </>
    );
}

const addLeadingZeros = (n, length) => {
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
}

export default CadastrosAluno