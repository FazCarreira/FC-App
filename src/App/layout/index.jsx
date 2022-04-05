import {
  CircularProgress,
  CssBaseline,
  Dialog,
  Hidden,
  ThemeProvider,
  Toolbar
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ConstantsContext } from "../../services/ConstantsContext";
import { ToolsContext } from "../../services/ToolsContext";

import Header from "./Header";
import SideNav from "./NavItem";
import { Container } from "./styles";

const Layout = ({ title, disableNav, disableHeader, children, theme, role }) => {

  const { loading } = useContext(ToolsContext);
  const { isMobile } = useContext(ConstantsContext);

  // const main = loading ? (<CircularProgress sx={{ position: 'absolute', top: '25%', left: '50%' }} />) : (children);

  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Hidden smUp={disableHeader}>
          <Header title={title} disableNav={disableNav} role={role} />
        </Hidden>
        {!disableNav && <SideNav />}
        <Box
          component="main"
          sx={{
            ml: isMobile ? 0 : '240px',
            width: '100%',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container>
            {children}
          </Container>
        </Box>
      </ThemeProvider>
      <Dialog
        open={loading}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%'
          },
        }}
      >
        <CircularProgress size={64} />
      </Dialog>
    </Box>
  );
}

export default Layout;