import { IconButton, List, Paper, TextField } from "@mui/material";
import moment from "moment";
import { useContext, useState } from "react";
import { BiSend } from "react-icons/bi";
import RowItem from "../../../../../components/RowItem";
import { AuthenticationContext } from "../../../../../services/AuthContext";
import { CursoContext } from "../../../../../services/CursoContext";

const Forum = () => {

    const { user } = useContext(AuthenticationContext);
    const { enviarMensagem, deletarMensagem, turma } = useContext(CursoContext);

    const [text, setText] = useState('');
    const onChange = ({ target }) => setText(target.value)

    const handleSend = () => {
        if (enviarMensagem(text))
            setText('');
    }

    return (
        <>
            <Paper>
                <List>
                    <RowItem
                        avatar={user.avatar}
                        alt={user.email}
                        primary={<TextField
                            // sx={{ maxWidth: 900 }}
                            name='text'
                            label='Mensagem'
                            placeholder='Escreva algo para sua turma...'
                            value={text}
                            onChange={onChange}
                            fullWidth
                            multiline
                            minRows={2}
                        />}
                        IconButtons={[
                            <IconButton onClick={handleSend}>
                                <BiSend color='#993399' />
                            </IconButton>
                            // { icon: <FaPaperPlane color='#993399' />, onClick: () => enviarMensagem(text) }
                        ]}
                    />
                </List>
            </Paper>
            <Paper>
                <List>
                    {turma?.forum?.map((msg) => (
                        <RowItem
                            avatar={msg.user.avatar}
                            alt={msg.user.email}
                            primary={msg.text}
                            secondary={moment(msg.date).format('HH:mm - DD/MM/YYYY')}
                            onDelete={() => deletarMensagem(msg._id)}
                        />
                    ))}
                </List>
            </Paper>
        </>
    );
}

export default Forum;