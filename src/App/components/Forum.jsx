import { useContext, useState } from "react";
import { Avatar, Grid, Button, Paper, TextField, IconButton, Typography } from "@mui/material";
import { FaTrash } from "react-icons/fa";

import { AuthenticationContext } from "../../services/AuthContext";
import { UserContext } from "../../services/UserContext";

const Forum = ({ turma, updateFunc }) => {
    let { user } = useContext(AuthenticationContext);
    let { sendMsg, deleteMsg } = useContext(UserContext);
    const forum = turma?.forum;

    const [msg, setMsg] = useState('');
    const onChange = ({ target }) => setMsg(target.value);

    const send = async () => {
        setMsg('');
        await sendMsg(turma._id, { user: user._id, text: msg, name: user._name, avatar: user.avatar, });
        await updateFunc?.();
    }
    const remove = (id) => async () => {
        await deleteMsg(turma._id, id);
        await updateFunc?.();
    }

    return (<>
        <Paper>
            <Grid component='form' container spacing={1} justifyContent='space-between' alignItems='center' sx={{ p: 1 }}>
                <Grid item xs={1}><Avatar sx={{ width: { xs: 42, md: 64 }, height: { xs: 42, md: 64 } }} src={user.avatar} alt={user.name} /></Grid>
                <Grid item xs={10} md={9}>
                    <TextField
                        label='Envie uma mensagem'
                        value={msg}
                        onChange={onChange}
                        fullWidth
                        multiline
                        minRows={2}
                    />
                </Grid>
                <Grid item xs={12} md={1}><Button fullWidth variant='contained' onClick={send}>Enviar</Button></Grid>
            </Grid>
        </Paper>
        {forum?.map(msg => (<Paper key={msg?._id}>
            <Grid component='form' container justifyContent='space-between' alignItems='center' sx={{ p: 2 }}>
                <Grid item xs={1}><Avatar sx={{ width: { xs: 42, md: 64 }, height: { xs: 42, md: 64 } }} src={msg?.avatar} alt={msg?.name} /></Grid>
                <Grid item xs={msg?.user === user._id ? 8 : 10}>
                    <Typography sx={{ color: '#aaa' }}>{msg?.name}:</Typography>
                    <Typography>{msg?.text}</Typography>
                </Grid>
                {msg?.user === user._id && <Grid item xs={1}><IconButton onClick={remove(msg?._id)}><FaTrash /></IconButton></Grid>}
            </Grid>
        </Paper>))}
    </>);
}

export default Forum;