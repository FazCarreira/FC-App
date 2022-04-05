import { List } from "@mui/material";
import RowItem from "../../App/components/RowItem";

const Avisos = () => {
    return (<List>
        {false ? dummy.map(aviso => <RowItem avatar={aviso.img} primary={aviso.title} secondary={aviso.text} />) : <RowItem primary='Você não tem nenhum aviso' />}
    </List>);
}

const dummy = [{
    img: 'https://via.placeholder.com/500/?text=Aviso',
    title: 'Aviso Teste',
    text: 'Nobis ut sit repellendus atque aut consequatur ut sint. Repellendus aliquid placeat dolor. Cupiditate quod praesentium doloremque necessitatibus. Dolores sed iusto autem ut quaerat ut fugiat. Voluptatem commodi est velit velit iure.'
}]

export default Avisos;