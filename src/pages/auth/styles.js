import { makeStyles } from "@mui/styles";

const style = makeStyles((theme) => ({
    backgroundMobile: {
        backgroundColor: theme.palette.primary.main,
        background: `linear-gradient(to top right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        height: '100%',
    },
    background: {
        backgroundColor: theme.palette.primary.main,
        background: `linear-gradient(to top right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    invalid: {
        borderColor: theme.palette.warning.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        fontSize: 18,
        fontFamily: 'Righteous'
    },
    img404: {
        width: '80%',
        height: 'auto',
        margin: 'auto auto'
    }
}))

export default style;