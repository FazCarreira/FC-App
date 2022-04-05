import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#993399" },
        secondary: { main: "#20b1aa" },
        warning: { main: "#ffa500" },
        info: { main: "#eaf9f6" },
    },
    typography: {
        fontFamily: ['Roboto']
    }
})

export default theme;