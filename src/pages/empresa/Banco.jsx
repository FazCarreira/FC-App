import { List } from "@mui/material";
import { FaSmileWink } from "react-icons/fa";
import RowItem from "../../App/components/RowItem";

const BancoDeTalentos = () => {
    return (<List>
        <RowItem
            avatar={<FaSmileWink size={32} color='#993399' />}
            primary="EM PROGRESSO!"
            secondary={`Em breve novas possibilidades para você!`}
        />
    </List>);
}

export default BancoDeTalentos;