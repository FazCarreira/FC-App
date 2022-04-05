import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    opDivider: {
        border: `1px solid ${theme.palette.primary.main}`,
    },
    details: {
        overflow: 'auto'
    },
}))

export default useStyles