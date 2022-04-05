import { useContext } from "react";
import { Toolbar, Typography } from "@mui/material";
import { FaBars } from "react-icons/fa";

import { ConstantsContext } from "../../services/ConstantsContext";
import { AppBar, Logo, MobileDrawerButton } from "./styles";

const Header = ({ title, disableNav, role }) => {

    const { open, toggleDrawer, customTitle, headerRight, isMobile } = useContext(ConstantsContext);

    return (
        <AppBar position="absolute" open={open} disablenav={disableNav?.toString()}>
            <Toolbar sx={{ pr: '24px' }}>
                <MobileDrawerButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                        ...(disableNav && { display: 'none' }),
                    }}
                >
                    <FaBars />
                </MobileDrawerButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1, fontFamily: 'Righteous', fontSize: 32 }}
                >
                    {title || customTitle}
                </Typography>
                {disableNav && <Logo>
                    <Typography variant='h6' sx={{ textTransform: 'uppercase', fontFamily: 'Righteous' }}>
                        Faz Carreira
                    </Typography>
                    <img src="/img/Logo.svg" alt="Logo Faz Carreira"
                        height='20px'
                        style={{ marginLeft: 5 }}
                    />
                </Logo>}
                {(role === 'aluno' && !isMobile) && headerRight}
            </Toolbar>
        </AppBar>
    );
}

export default Header;