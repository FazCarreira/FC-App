import { useContext, useState } from "react";
import { Button, Grid, List, ListItem } from "@mui/material";
import { FaFileExcel, FaFilePdf, FaFileVideo, FaPlus } from "react-icons/fa";
import moment from "moment";

import { AuthenticationContext } from "../../../services/AuthContext";
import { ConstantsContext } from "../../../services/ConstantsContext";
import { UserContext } from "../../../services/UserContext";

import RowItem from "../../../App/components/RowItem";
import ModalForm from "../../../App/components/ModalForm";
import { Desc, SubTitle, Title } from "../../../App/components/StyledComponents";

import MaterialForm from "../../../App/components/MaterialForm";

const Modulo = ({ modulo }) => {

    const { user } = useContext(AuthenticationContext);
    const { openLink } = useContext(ConstantsContext)
    const { postMaterial, deleteMaterial } = useContext(UserContext)

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState({});

    const novoMaterial = () => {
        setAction({
            title: 'Adicionar material',
            body: <MaterialForm updateData={setData} icons={icons} />,
            onSave: async (nData) => {
                await postMaterial(modulo._id, nData.aula, nData);
                setOpen(false);
            },
        });
        setOpen(true);
    };
    const delMaterial = (modulo, material) => () => deleteMaterial(modulo, material);

    return (<>
        <Grid container spacing={2}>
            <Grid container spacing={2} item xs={12} md={6}>
                <Grid item xs={12} >
                    <Title component="h1">{modulo?.nome}</Title>
                    <SubTitle component="h1">Com: {user?.name}</SubTitle>
                    <Button disabled={!modulo?.link_aula} variant="contained" onClick={openLink(modulo?.link_aula)}>Ir para a aula</Button>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        {modulo?.aulas?.map((aula, i) => (
                            <RowItem
                                key={i}
                                primary={`Aula ${i + 1} - ${aula.nome}`}
                                secondary={`${moment(aula.dia).format('DD/MM/YYYY')} - ${moment(aula.hora_inicial).format('HH:mm')} às ${moment(aula.hora_final).format('HH:mm')}`}
                            />
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Grid xs={12} md={3}>
                <Title sx={{ textAlign: 'center' }}>Materiais</Title>
                <List sx={{ maxHeight: 248, overflow: 'auto' }}>
                    <RowItem
                        avatar={<FaPlus color='#993399' />}
                        primary='Adicionar material'
                        onPress={novoMaterial}
                    />
                    {modulo?.aulas?.map(aula => aula.materiais?.map(material => <RowItem
                        key={material._id}
                        avatar={icons[material.icon]}
                        primary={material.nome}
                        secondary={aula.nome}
                        onPress={openLink(material.link)}
                    />))}
                    {modulo.materiais?.map(material => <RowItem
                        key={material._id}
                        avatar={icons[material.icon]}
                        primary={material.nome}
                        onPress={openLink(material.link)}
                        onDelete={delMaterial(modulo._id, material._id)}
                    />)}
                </List>
            </Grid>
            <Grid xs={12} md={3}>
                <Title sx={{ textAlign: 'center' }}>Mural</Title>
                <List sx={{ maxHeight: 248, overflow: 'auto' }}>
                    <ListItem>
                        <Desc>O quadro de avisos está desabilitado</Desc>
                    </ListItem>
                    {/* {turma?.modulos?.[moduloAtivo]?.materiais?.map(material => <RowItem
                                key={material._id}
                                avatar={icons[material.icon]}
                                primary={material.nome}
                                onPress={openLink(material.link)}
                            />)} */}
                </List>
            </Grid>
        </Grid>

        <ModalForm open={open} data={data} onClose={() => setOpen(false)} {...action} />
    </>);
}

const icons = [
    <FaFilePdf size={24} color='#20b1aa' />,
    <FaFileVideo size={24} color='#20b1aa' />,
    <FaFileExcel size={24} color='#20b1aa' />
]

export default Modulo;