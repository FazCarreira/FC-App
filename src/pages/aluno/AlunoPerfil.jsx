import { useContext, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

import { AuthenticationContext } from "../../services/AuthContext";
import { AdminContext } from "../../services/AdminContext";
import { ToolsContext } from "../../services/ToolsContext";

import { alunoPerfilQuestions, legacyPerfilQuestions, userQuestions } from "../../constants";
import { Title } from "../../App/components/StyledComponents";
import Form from "../../App/components/Form";

const PerfilAluno = (props) => {
    const { user, changePass } = useContext(AuthenticationContext);
    const { editUser, editProfile } = useContext(AdminContext);
    const { addAlert } = useContext(ToolsContext);

    const info = { name: props?.user?.name || user?.name, email: props?.user?.email || user?.email, phone: props?.user?.phone || user?.phone };
    const [userInfo, setUserInfo] = useState(info);
    const [profile, setProfile] = useState(props?.user?.profile || user?.profile);

    const onChangeInfo = ({ target }) => setUserInfo({ ...userInfo, [target.name]: target.value });
    const onChangePerfil = ({ target }) => setProfile({ ...profile, [target?.name]: target?.value });

    const saveInfo = () => props?.user ? editUser(props?.user?._id, userInfo) : console.log(userInfo);
    const resetInfo = () => setUserInfo(info);

    const saveProfile = () => props?.user ? editProfile(props?.user?._id, profile) : console.log(profile);
    const resetProfile = () => setProfile(props?.user?.profile || user?.profile);

    const [pass, setPass] = useState({ password: '', vpassword: '' });
    const onPassChange = ({ target }) => setPass({ ...pass, [target.name]: target.value });

    const onChangePass = async (e) => {
        const { password, vpassword } = pass;
        if (password !== vpassword || password.trim() === '') return addAlert('As senhas precisam ser iguais', 'warning');
        await changePass({ password });
    };

    return (
        <Paper>
            <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Informações de Usário:</Title>
                    <Grid component='form' container spacing={2}>
                        {userQuestions.map(q => <Form key={q.name} question={q} value={userInfo?.[q.name]} onChange={onChangeInfo} />)}
                        <Grid item xs={6}><Button onClick={saveInfo} fullWidth variant='contained'>Salvar</Button></Grid>
                        <Grid item xs={6}><Button onClick={resetInfo} fullWidth variant='outlined'>Resetar</Button></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Title sx={{ mb: 1 }}>Perfil:</Title>
                    {profile ? (
                        <Grid component='form' container spacing={2}>
                            {props?.user?.legacy || user?.legacy ? (
                                legacyPerfilQuestions.map(q => <Form key={q.name} question={q} value={profile?.[q.name] || q.default || ''} onChange={onChangePerfil} />)
                            ) : (
                                alunoPerfilQuestions.map(q => <Form key={q.name} question={q} value={profile?.[q.name] || q.default || ''} onChange={onChangePerfil} />)
                            )}
                            <Grid item xs={6}><Button onClick={saveProfile} fullWidth variant='contained'>Salvar</Button></Grid>
                            <Grid item xs={6}><Button onClick={resetProfile} fullWidth variant='outlined'>Resetar</Button></Grid>
                        </Grid>
                    ) : (
                        <Typography>Este aluno não possui perfil, favor requerer preenchimento</Typography>
                    )}
                </Grid>
                {!props?.user && (<>
                    <Grid item xs={12}>
                        <Title sx={{ mb: 1 }}>Senha:</Title>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            sx={{ m: 1, minWidth: 120 }}
                            name='password'
                            label='Nova senha'
                            value={pass.password}
                            onChange={onPassChange}
                            fullWidth
                            type='password'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            sx={{ m: 1, minWidth: 120 }}
                            name='vpassword'
                            label='Insira novamente a nova senha'
                            value={pass.vpassword}
                            onChange={onPassChange}
                            fullWidth
                            type='password'
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button fullWidth onClick={onChangePass} >Trocar senha</Button>
                    </Grid>
                </>)}
            </Grid>
        </Paper>
    );
}

export default PerfilAluno;