import { List } from "@mui/material";
import { FaSmileWink } from "react-icons/fa";

import RowItem from "../../App/components/RowItem";

const Fill = ({ aulas }) => (
    <List>
        <RowItem
            avatar={<FaSmileWink size={32} color='#20b1aa' />}
            primary="Termine o Curso da Faz Carreira para ter acesso a este recurso!"
            secondary={`Faltam apenas ${aulas || 'algumas'} aulas`}
        />
    </List>
);


export default Fill;