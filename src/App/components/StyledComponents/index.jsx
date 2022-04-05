import { LinearProgress, Paper, styled, Typography } from "@mui/material";

export const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(32),
}))

export const SubTitle = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(16),
}))

export const Legend = styled('legend')(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(16),
}))

export const Desc = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(16),
}))

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    borderRadius: 5,
}));

export const Header = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'none'
    },
    paddingRight: 32,
    paddingLeft: 64,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: -64,
    zIndex: theme.zIndex.drawer + 1,
    background: `linear-gradient(90deg , ${theme.palette.initial.main}, ${theme.palette.final.main})`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% + 50px)`,
    borderRadius: 10,
    color: "#fff"
}))