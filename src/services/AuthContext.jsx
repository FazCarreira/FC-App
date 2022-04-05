import React, { useState, createContext, useContext } from 'react';

import { ToolsContext } from './ToolsContext';
import setAuthToken from '../utils/setAuthToken'
import api from '../utils/api';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {

    const { addAlert, setLoading } = useContext(ToolsContext);

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const loadUser = async () => {
        if (localStorage.token) setAuthToken(localStorage.token);
        setLoading(true);
        try {
            const { data } = await api.get('/auth');
            setUser(data);
            setProfile(data.profile);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const body = { email, password };
        setLoading(true);

        try {
            const { data } = await api.post('/auth', body);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            loadUser();
            setLoading(false);
        } catch (err) {
            if (err.response) {
                const errors = err.response.data.errors;
                errors?.forEach(error => addAlert(error.msg, 'warning'));
            }
            setLoading(false);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const register = async (email, password, role, name, phone) => {
        const body = { email, password, role, name, phone };
        setLoading(true);

        try {
            const { data } = await api.put('/auth', body);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            loadUser();
            setLoading(false);
        } catch (err) {
            if (err.response) {
                const errors = err.response.data.errors;
                errors?.forEach(error => addAlert(error.msg, 'warning'));
            }
            setLoading(false);
            logout();
        }

    }

    const createProfile = async (body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/profile`, body);
            addAlert(data, 'success');
            loadUser();
        } catch (err) {
            if (err.response) {
                const errors = err.response.data.errors;
                errors?.forEach(error => addAlert(error.msg, 'warning'));
            }
        }
        setLoading(false);
    }

    const changePass = async (pass) => {
        setLoading(true);
        try {
            const { data } = await api.post('/user/trocar_senha', pass);
            addAlert(data, 'success');
        } catch (err) {
            if (err.response) {
                const errors = err.response.data.errors;
                errors?.forEach(error => addAlert(error.msg, 'warning'));
            }
        }
        setLoading(false);
    }

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user, token,profile,
                login, register, logout,
                loadUser,
                createProfile, changePass
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
