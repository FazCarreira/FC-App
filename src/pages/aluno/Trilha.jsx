import { useContext, useEffect } from "react";
import { List, Stack } from "@mui/material";
import { useNavigate } from "react-router";
// import moment from "moment";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

import { UserContext } from "../../services/UserContext";
import { AuthenticationContext } from "../../services/AuthContext";

import RowItem from "../../App/components/RowItem";
import { SubTitle, Title } from "../../App/components/StyledComponents";
import { ConstantsContext } from "../../services/ConstantsContext";

const Trilha = () => {
    let { user } = useContext(AuthenticationContext);
    const { getTurma, turma } = useContext(UserContext);
    const { isMobile } = useContext(ConstantsContext)
    // eslint-disable-next-line
    useEffect(() => getTurma('aluno'), []);
    const navigate = useNavigate();

    return (<Stack spacing={3} sx={{ mt: 5 }}>
        {turma?.modulos?.map((modulo, i) => (
            <Stack key={i} direction={isMobile ? 'column' : 'row'} spacing={1}>
                <img src={modulo.file.src} alt="imagem modulo" />
                <Stack spacing={2}>
                    <Title>{modulo.nome}</Title>
                    <SubTitle>Aula com: {modulo.facilitador?.name}</SubTitle>
                    <List>
                        {modulo.aulas?.map((aula, j) => (
                            <RowItem
                                key={j}
                                avatar={aula?.frequencia?.some(f => f === user?._id) ? <FaCheckCircle color='#993399' size={32} /> : <FaCircle size={32} />}
                                primary={aula?.nome}
                                // secondary={`${capitalizeFirstLetter(dia)} - ${moment(modulo.hora_inicial).format('HH:mm')} às ${moment(modulo.hora_final).format('HH:mm')}`}
                                onPress={() => navigate('/aluno/aulas')}
                            />
                        ))}
                    </List>
                </Stack>
            </Stack>
        ))}
    </Stack>);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default Trilha;