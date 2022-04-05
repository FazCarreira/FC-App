import { useContext } from "react";
import { Button, Grid, List, ListItem, Stack } from "@mui/material";

import { Desc, SubTitle, Title } from "../../../../App/components/StyledComponents";
import { ConstantsContext } from "../../../../services/ConstantsContext";
import { FaFileExcel, FaFilePdf, FaFileVideo } from "react-icons/fa";
import moment from "moment";
import RowItem from "../../../../App/components/RowItem";

const Step = ({ etapa, complete, allCompleted, last, completed, pdf }) => {
    const { openLink } = useContext(ConstantsContext)
    const { link_aula, hora_inicial, hora_final, dia, facilitador, file, materiais } = etapa;

    const ativar_link = moment().isSame(moment(dia), 'day') && moment().isBetween(hora_inicial, hora_final, 'hour');

    return (<>
        <Grid container spacing={2} sx={{ mt: 1 }} justifyContent='center' >
            {file?.src &&
                <Grid container spacing={2} item xs={12} md={6} >
                    <video src={etapa?.file?.src} style={{ width: '100%' }} controls />
                </Grid>
            }
            <Grid component={Stack} direction='column' item xs={12} md={6} justifyContent='center' alignItems='center' >
                <Title>{etapa.nome}</Title>
                <SubTitle>Com {facilitador?.name}</SubTitle>
                <Desc>{moment(dia).format('DD/MM/YYYY')} - {moment(hora_inicial).format('HH:mm')} às {moment(hora_final).format('HH:mm')}</Desc>
                <Button disabled={!ativar_link} onClick={openLink(link_aula)} variant='contained'>Ir para a turma</Button>
            </Grid>
            <Grid item xs={12}>
                {allCompleted ? (<>
                    <SubTitle sx={{ textAlign: 'center' }}>TREINAMENTO COMPLETO!</SubTitle>
                    <Button variant="contained" fullWidth onClick={pdf} >{`BAIXAR CERTIFICADO`}</Button>
                </>) : (
                    completed ? (
                        <Button variant="contained" fullWidth disabled >ETAPA CONCLUIDA</Button>
                    ) : (
                        <Button variant="contained" onClick={complete} fullWidth disabled={allCompleted} >{last ? 'Completar Treinamento' : 'Próxima etapa'}</Button>
                    )
                )}
            </Grid>
            <Grid item xs={12}>
                <List>
                    <ListItem>
                        <SubTitle>Material de apoio:</SubTitle>
                    </ListItem>
                    <List component="div" disablePadding>
                        {materiais?.sort(iconSort).map((material, i) => <RowItem
                            key={i}
                            avatar={icons[material.icon]}
                            primary={material.nome}
                            onPress={openLink(material.link)}
                        />)}
                    </List>
                </List>
            </Grid>
        </Grid>
    </>);
}

const icons = [
    <FaFilePdf size={24} color='#20b1aa' />,
    <FaFileVideo size={24} color='#20b1aa' />,
    <FaFileExcel size={24} color='#20b1aa' />
]
const iconSort = (a, b) => a.icon - b.icon;

export default Step