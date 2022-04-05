import { AppBar as MuiAppBar, Container as MuiContainer, IconButton, Drawer as MuiDrawer, Button, } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DRAWER_WIDTH = 240;

export const Logo = styled(Button)({
    color: 'white',
    margin: 'auto'
})

export const Container = styled(MuiContainer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    ...(open && {
        width: '0%'
    }),
    [theme.breakpoints.up('md')]: {
        // marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH/4}px)`,
        marginBottom: 64,
        marginTop: 20,
    }
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, disablenav }) => ({
    background: `linear-gradient(90deg , ${theme.palette.initial.main}, ${theme.palette.final.main})`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: disablenav ? 'auto' : DRAWER_WIDTH,
        width: '0%',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    [theme.breakpoints.up('md')]: {
        // marginLeft: DRAWER_WIDTH,
        width: disablenav ? '95%' : `calc(100% - ${DRAWER_WIDTH}px - 50px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginTop: 20,
    }
}));

export const MobileDrawerButton = styled(IconButton)(({ theme }) => ({
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}))

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            background: `linear-gradient(125deg , ${theme.palette.initial.main}, ${theme.palette.final.main})`,
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(0),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
            [theme.breakpoints.down('md')]: {
                ...(open && { width: '100vw' })
            },
        },
    }),
);