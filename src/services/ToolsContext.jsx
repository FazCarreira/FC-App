import React, { createContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import api from '../utils/api';

export const ToolsContext = createContext();

export const ToolsContextProvider = ({ children }) => {

    const [alert, setAlert] = useState({
        open: false,
        autoHideDuration: 5000,
        message: "",
        severity: "success",
    });

    const [loading, setLoading] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ open: false });
    };

    const uploadImage = async (file) => {
        try {
            const { data } = await api.post('/file/image', file);
            return { id: data._id, src: data.src };
        } catch (err) {
            if (err.response) {
                const errors = err.response.data.errors;
                errors?.forEach(error => addAlert(error.msg, 'warning'));
                console.warn(err.response.data.pre);
            }
        }
    }

    const uploadVideo = async (file) => {
        setLoading(true);
        try {
            const { data } = await api.post('/file/video', file);
            setLoading(false);
            return { id: data._id, src: data.src };
        } catch (err) {
            if (err.response) {
                const errors = err.response.data.errors;
                errors?.forEach(error => addAlert(error.msg, 'warning'));
                console.warn(err.response.data.pre);
            }
        }
    }

    const addAlert = (msg, alertType = "error", timeout = 2000) => setAlert({
        open: true,
        autoHideDuration: timeout,
        message: msg,
        severity: alertType,
    });

    return (
        <ToolsContext.Provider
            value={{
                addAlert,
                loading, setLoading,
                uploadImage, uploadVideo
            }}
        >
            {children}
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: 'center' }} open={alert.open} autoHideDuration={alert.autoHideDuration} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </ToolsContext.Provider>
    );
};