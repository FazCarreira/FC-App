import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        initial: { main: "#51a69f" },
        final: { main: "#4e91b7" },
        primary: { main: "#1d9992" },
        fazcarreira: { main: "#993399" },
        warning: { main: "#ffa500" },
        info: { main: "#eaf9f6" },
        contrast: {main: '#fff'}
    },
    typography: {
        fontFamily: ['Roboto']
    }
})

export default theme;