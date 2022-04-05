import { useContext } from "react";
import { Navigate } from "react-router";
import { CircularProgress } from "@mui/material";

import Layout from '../layout'
import { AuthenticationContext } from "../../services/AuthContext";

const PrivateRoute = ({ component: Component, title, role, disableHeader, disableNav, theme, headerRight }) => {
    const { isAuthenticated, isLoading, user } = useContext(AuthenticationContext);

    if (isLoading) return <CircularProgress />;
    if (isAuthenticated && user?.role === role) return (
        <Layout title={title} disableHeader={disableHeader} disableNav={disableNav} theme={theme} role={role} >
            <Component />
        </Layout>
    )

    return <Navigate to="/" />;
};

export default PrivateRoute;