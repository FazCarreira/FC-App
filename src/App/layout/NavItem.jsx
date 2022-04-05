import { useContext } from "react";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { FaArrowLeft, FaDoorOpen, FaPowerOff } from "react-icons/fa";

import { AuthenticationContext } from "../../services/AuthContext";
import { ConstantsContext } from "../../services/ConstantsContext";

import { Drawer, Logo, MobileDrawerButton } from "./styles";
import { Link } from "react-router-dom";

const SideNav = () => {

    const { logout, user } = useContext(AuthenticationContext)
    const { NavItems, open, toggleDrawer, isMobile } = useContext(ConstantsContext)

    const goToSite = () => window.location.assign('https://fazcarreira.com/')

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <MobileDrawerButton onClick={toggleDrawer}>
                    <FaArrowLeft color='white' />
                </MobileDrawerButton>
                <Logo>
                    <Typography variant='h6' sx={{ textTransform: 'uppercase', fontFamily: 'Righteous' }}>
                        Faz Carreira
                    </Typography>
                    <img src="/img/Logo.svg" alt="Logo Faz Carreira"
                        height='20px'
                        style={{ marginLeft: 5 }}
                    />
                </Logo>
            </Toolbar>
            <Divider />
            <List sx={{ color: 'white' }}>
                {NavItems[user?.role].map((item, index) => item?.icon && (
                    <div key={index}>
                        <ListItem
                            component={item?.path ? Link : null}
                            button={!!item?.path}
                            to={item?.path}
                            key={item?.path}
                            onClick={isMobile?(toggleDrawer):(() => false)}
                            sx={{ borderBottom: '1px solid' }}
                        >
                            <ListItemIcon>{item?.icon}</ListItemIcon>
                            <ListItemText primary={item?.title} />
                        </ListItem>
                        <List component="div" disablePadding>
                            {item?.items?.map(i => (
                                <ListItem
                                    component={Link}
                                    to={i?.path}
                                    key={i?.path}
                                    sx={{ pl: 4, borderBottom: '1px solid' }}
                                >
                                    <ListItemIcon>{i?.icon}</ListItemIcon>
                                    <ListItemText primary={i?.title} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                ))}
            </List>
            <Box component="div" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '100%'
            }}>
                <Box component="div">
                    <List>
                        <ListItem
                            button
                            onClick={goToSite}
                            sx={{ borderTop: '1px solid', color: '#c592c7', }}
                        >
                            <ListItemIcon style={{ alignItems: 'end' }}>
                                <FaDoorOpen style={{ marginLeft: '7px' }} color='White' />
                            </ListItemIcon >
                            <ListItemText primary='Site Faz Carreira' sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={logout}
                            sx={{ borderTop: '1px solid', color: '#c592c7', }}
                        >
                            <ListItemIcon style={{ alignItems: 'end' }}>
                                <FaPowerOff style={{ marginLeft: '7px' }} color='White' />
                            </ListItemIcon >
                            <ListItemText primary='Desconectar' sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
}

export default SideNav;