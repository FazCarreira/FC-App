import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        initial: { main: "#ffb444" },
        final: { main: "#e5a23d" },
        primary: { main: "#bf8733" },
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