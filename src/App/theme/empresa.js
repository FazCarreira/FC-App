import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        final: { main: "rgb(133,85,162)" },
        initial: { main: "rgb(110,99,174)" },
        primary: { main: "#993399" },
        secondary: { main: "#20b1aa" },
        warning: { main: "#ffa500" },
        info: { main: "#eaf9f6" },
        contrast: {main: '#fff'}
    },
    typography: {
        fontFamily: ['Roboto']
    }
})

export default theme;