import { createTheme } from "@mui/material/styles";
import { ptBR as corePtBR } from '@mui/material/locale';
import { ptBR } from '@mui/x-data-grid';

const theme = createTheme({
    palette: {
        initial: { main: "rgb(133,85,162)" },
        final: { main: "rgb(110,99,174)" },
        primary: { main: "#993399" },
        secondary: { main: "#20b1aa" },
        warning: { main: "#ffa500" },
        info: { main: "#eaf9f6" },
        contrast: { main: '#fff' }
    },
    typography: {
        fontFamily: ['Roboto']
    }
}, ptBR, corePtBR);

export default theme;