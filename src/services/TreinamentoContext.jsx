import React, { useState, createContext, useContext } from 'react';

import { ToolsContext } from './ToolsContext';
import api from '../utils/api';

export const TreinamentoContext = createContext();

export const TreinamentoContextProvider = ({ children }) => {

    const { addAlert, setLoading } = useContext(ToolsContext);

    const [treinamentos, setTreinamentos] = useState();

    const errCatch = (err) => {
        if (err.response) {
            const errors = err.response.data.errors;
            errors?.forEach(error => addAlert(error.msg, 'warning'));
        }
    }

    const createTreinamentos = async (body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/treinamento`, body);
            addAlert(data, 'success');
            await getTreinamentos();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const getTreinamentos = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/treinamento`);
            setTreinamentos(data);
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const updateTreinamentos = async (body) => {
        setLoading(true);
        try {
            console.log(body._id, body);
            const { data } = await api.put(`/treinamento/${body._id}`, body);
            addAlert(data, 'success');
            await getTreinamentos();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const deleteTreinamento = async (id) => {
        try {
            const { data } = await api.delete(`/treinamento/${id}`);
            addAlert(data, 'success');
            await getTreinamentos();
        } catch (err) {
            errCatch(err);
            await getTreinamentos();
        }
    }

    const participarTreinamentos = async (id, etapa) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/treinamento/${id}/${etapa}`);
            addAlert(data, 'success');
            await getTreinamentos();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    return (
        <TreinamentoContext.Provider
            value={{
                treinamentos, createTreinamentos, getTreinamentos, updateTreinamentos, deleteTreinamento, participarTreinamentos
            }}
        >
            {children}
        </TreinamentoContext.Provider>
    );
};
