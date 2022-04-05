import { Avatar, Button, Grid, Input, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { Title } from "../../App/components/StyledComponents";
import { AuthenticationContext } from "../../services/AuthContext";

import { bancoQuestions, empresaPerfilQuestions, userParceiroQuestions } from "../../constants";
import Form from "../../App/components/Form";
import { ToolsContext } from "../../services/ToolsContext";
import { UserContext } from "../../services/UserContext";

const PerfilEmpresa = (props) => {
    const { user } = useContext(AuthenticationContext);
    const { editUser } = useContext(UserContext);
    const { uploadImage } = useContext(ToolsContext);

    const [userInfo, setUserInfo] = useState(props?.user || user);

    const onChangeInfo = ({ target }) => setUserInfo({ ...userInfo, [target.name]: target.value });

    const resetInfo = () => setUserInfo(props?.user || user);

    const onSave = () => editUser({ ...userInfo, avatar });

    const [avatar, setAvatar] = useState(userInfo.avatar);
    const onFile = async (fileIn) => {
        let fileData = new FormData();
        fileData.append("uploadedFile", fileIn);
        const file = await uploadImage(fileData);
        setAvatar(file.src);
    }

    return (
        <Paper>
            <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Informações de Usário:</Title>
                    <Grid container spacing={2}>
                        {userParceiroQuestions.map(q => <Form key={q.name} question={q} value={userInfo[q.name]} onChange={onChangeInfo} />)}
                        <Grid item xs={6}><Button onClick={onSave} fullWidth variant='contained'>Salvar</Button></Grid>
                        <Grid item xs={6}><Button onClick={resetInfo} fullWidth variant='outlined'>Resetar</Button></Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Informações Bancárias:</Title>
                    <Grid component='form' container spacing={2}>
                        {bancoQuestions.map(q => <Form key={q.name} question={q} value={user.profile?.info_bancaria[q.name]} onChange={onChangeInfo} />)}
                        <Grid item xs={6}><Button onClick={resetInfo} fullWidth variant='contained'>Salvar</Button></Grid>
                        <Grid item xs={6}><Button onClick={resetInfo} fullWidth variant='outlined'>Resetar</Button></Grid>
                    </Grid>
                </Grid> */}
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Perfil:</Title>
                    {user.profile ? (
                        <Grid component='form' container spacing={2}>
                            {empresaPerfilQuestions.map(q => <Form key={q.name} question={q} value={user.profile[q.name] || q.default} onChange={onChangeInfo} />)}
                            <Grid item xs={6}><Button onClick={resetInfo} fullWidth variant='contained'>Salvar</Button></Grid>
                            <Grid item xs={6}><Button onClick={resetInfo} fullWidth variant='outlined'>Resetar</Button></Grid>
                        </Grid>
                    ) : (
                        <Typography>Este facilitador não possui perfil, favor entrar em contato e requerer preenchimento</Typography>
                    )}
                </Grid>
                {/* {!props?.user && (
                    <Grid item xs={12}>
                        <Title sx={{ mb: 1 }}>Senha:</Title>
                    </Grid>
                )} */}
            </Grid>
        </Paper>
    );
}

export default PerfilEmpresa;