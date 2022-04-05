import { Fragment, useContext, useState } from "react";
import { Avatar, Box, Button, Collapse, Divider, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { FaArrowLeft, FaCheckCircle, FaChevronDown, FaChevronUp, FaCircle, FaFileExcel, FaFilePdf, FaFileVideo, FaUndoAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

import { Drawer, Logo, MobileDrawerButton } from "../../App/layout/styles";

import { UserContext } from "../../services/UserContext";
import { ConstantsContext } from "../../services/ConstantsContext";
import { AuthenticationContext } from "../../services/AuthContext";

import RowItem from "../../App/components/RowItem";
import { Desc, SubTitle, Title } from "../../App/components/StyledComponents";
import moment from "moment";
import Forum from "../../App/components/Forum";

const Aula = () => {
    let { user } = useContext(AuthenticationContext);
    const { turma } = useContext(UserContext);
    const { open, toggleDrawer, openLink } = useContext(ConstantsContext)
    const navigate = useNavigate();

    const { modulos } = turma;

    const [moduloAtivo, setModuloAtivo] = useState(0);

    const handleClick = (value) => () => {
        setModuloAtivo(value);
    };

    return (<>
        <Drawer
            open={open}
            variant="permanent"
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <MobileDrawerButton onClick={toggleDrawer}>
                    <FaArrowLeft color='white' />
                </MobileDrawerButton>
                <Logo>
                    <Typography variant='h6' sx={{ textTransform: 'uppercase', fontFamily: 'Righteous' }}>
                        Faz Carreira
                    </Typography>
                    <img src="/img/Logo.svg" alt="Logo Faz Carreira"
                        height='20px'
                        style={{ marginLeft: 5 }}
                    />
                </Logo>
            </Toolbar>
            <Divider />
            <List>
                {modulos?.map((modulo, i) => (<Fragment key={i}>
                    <ListItemButton onClick={handleClick(i)}>
                        <ListItemAvatar>
                            <Avatar src={modulo?.file?.src} alt="imagem modulo" />
                        </ListItemAvatar>
                        <ListItemText primary={modulo?.nome} />
                        {moduloAtivo ? <FaChevronUp /> : <FaChevronDown />}
                    </ListItemButton>
                    <Collapse in={moduloAtivo === i} timeout="auto" unmountOnExit sx={{ backgroundColor: '#fff' }}>
                        <List component="div" disablePadding>
                            {modulo?.aulas?.map((aula, j) => (
                                <ListItemButton key={j} sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        {aula?.frequencia?.some(f => f === user?._id) ? <FaCheckCircle color='#993399' size={32} /> : <FaCircle size={32} />}
                                    </ListItemIcon>
                                    <ListItemText primary={aula?.nome} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </Fragment>))}
            </List>
            <Box component="div" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '100%'
            }}>
                <Box component="div">
                    <ListItemButton onClick={() => navigate('/aluno/trilha')} sx={{ justifySelf: 'end' }}>
                        <ListItemIcon>
                            <FaUndoAlt size={32} />
                        </ListItemIcon>
                        <ListItemText primary='Voltar' />
                    </ListItemButton>
                </Box>
            </Box>
        </Drawer>
        <Grid container sx={{ mt: 4 }} justifyContent='space-between'>
            <Grid xs={12} md={8}>
                <Grid container sx={{ mt: 4 }} alignItems='center' justifyContent='center'>
                    <Grid component={Stack} xs={12} md={8} spacing={2} direction='column' alignItems='center' justifyContent='center' >
                        <Title>{modulos?.[moduloAtivo]?.nome}</Title>
                        <SubTitle>{modulos?.[moduloAtivo]?.facilitador?.name}</SubTitle>
                        {/* <Desc>{`${moment(modulos?.[moduloAtivo]?.dt_inicial).format('DD/MM/YYYY')} - ${moment(modulos?.[moduloAtivo]?.dt_final).format('DD/MM/YYYY')}`}</Desc> */}
                        {/* <Desc sx={{ textTransform: 'lowercase' }}>{`${moment(modulos?.[moduloAtivo]?.hora_inicial).format('HH:mm')} às ${moment(modulos?.[moduloAtivo]?.hora_final).format('HH:mm')}`}</Desc> */}
                        <Button disabled={!modulos?.[moduloAtivo]?.link_aula} variant="contained" onClick={openLink(modulos?.[moduloAtivo]?.link_aula)}>Ir para a aula</Button>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Avatar src={modulos?.[moduloAtivo]?.facilitador?.avatar} sx={{ width: 128, height: 128, mx: 'auto', my: 3 }} />
                    </Grid>
                    <Grid xs={12}>
                        <List>
                            {modulos?.[moduloAtivo]?.aulas?.map((aula, i) => (
                                <RowItem
                                    key={i}
                                    primary={aula?.nome}
                                    secondary={`${moment(aula?.dia).format('DD/MM/YYYY')} - ${moment(aula?.hora_inicial).format('HH:mm')} às ${moment(aula?.hora_final).format('HH:mm')}`}
                                />
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={12}>
                        <Forum turma={turma} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} md={3} sx={{ border: '5px solid #993399', borderRadius: '25px', mt: 4 }}>
                <div style={{ height: '35vh', overflow: 'hidden', borderBottom: '5px solid #993399' }}>
                    <Title sx={{ textAlign: 'center' }}>Mural</Title>
                    <List sx={{ maxHeight: 248, overflow: 'auto' }}>
                        <ListItem>
                            <Desc>Sem avisos</Desc>
                        </ListItem>
                    </List>
                </div>
                <div style={{ height: '35vh', overflow: 'hidden' }}>
                    <Title sx={{ textAlign: 'center' }}>Materiais</Title>
                    <List sx={{ maxHeight: 248, overflow: 'auto' }}>
                        {modulos?.[moduloAtivo]?.aulas?.map(aula => aula?.materiais?.map(material => <RowItem
                            key={material?._id}
                            avatar={icons[material?.icon]}
                            primary={material?.nome}
                            secondary={aula?.nome}
                            onPress={openLink(material?.link)}
                        />))}
                    </List>
                </div>
            </Grid>
        </Grid>
    </>);
}

const icons = [
    <FaFilePdf size={24} color='#20b1aa' />,
    <FaFileVideo size={24} color='#20b1aa' />,
    <FaFileExcel size={24} color='#20b1aa' />
]

export default Aula;