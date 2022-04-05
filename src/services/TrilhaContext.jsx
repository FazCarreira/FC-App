import React, { useState, createContext, useContext } from 'react';

import { ToolsContext } from './ToolsContext';
import api from '../utils/api';
import { UserContext } from './UserContext';

export const TrilhaContext = createContext();

export const TrilhaContextProvider = ({ children }) => {

    const { addAlert, setLoading } = useContext(ToolsContext);
    const { getAlunos } = useContext(UserContext)

    const [trilhas, setTrilhas] = useState();
    const [turma, setTurma] = useState();

    const errCatch = (err) => {
        if (err.response) {
            const errors = err.response.data.errors;
            errors?.forEach(error => addAlert(error.msg, 'warning'));
        }
    }

    const createTrilhas = async (body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/trilha`, body);
            addAlert(data, 'success');
            await getTrilhas();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const getTrilhas = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/trilha`);
            setTrilhas(data);
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const updateTrilhas = async (body) => {
        setLoading(true);
        try {
            const { data } = await api.put(`/trilha/${body._id}`, body);
            addAlert(data, 'success');
            await getTrilhas();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const deleteTrilha = async (id) => {
        try {
            const { data } = await api.delete(`/trilha/${id}`);
            addAlert(data, 'success');
            await getTrilhas();
        } catch (err) {
            errCatch(err);
        }
    }

    const createTurma = async (body, id) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/turma/${id}`, body);
            addAlert(data, 'success');
            await getTrilhas();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const getTurma = async (id) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/turma/${id}`);
            setTurma({ ...data });
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const updateTurma = async (body, id) => {
        setLoading(true);
        try {
            const { data } = await api.put(`/turma/${id}`, body);
            addAlert(data, 'success');
            await getTrilhas();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const deleteTurma = async (id) => {
        try {
            const { data } = await api.delete(`/turma/${id}`);
            addAlert(data, 'success');
            await getTrilhas();
        } catch (err) {
            errCatch(err);
        }
    }

    const updateModulo = async (body, id) => {
        setLoading(true);
        try {
            const { data } = await api.put(`/turma/modulo/${id}`, body);
            addAlert(data, 'success');
            await getTrilhas();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const addAlunoTurma = async (aluno, turma_id) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/turma/add/${aluno}/${turma_id}`);
            addAlert(data, 'success');
            getAlunos(turma.numero);
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const remAlunoTurma = async (aluno) => {
        setLoading(true);
        try {
            const { data } = await api.delete(`/turma/rem/${aluno}`);
            addAlert(data, 'success');
            getAlunos(turma.numero);
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const getTurmaUser = async (user) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/${user.role}/curso/${user._id}`);
            setTurma(data);
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    return (
        <TrilhaContext.Provider
            value={{
                trilhas, turma, getTurmaUser,
                createTrilhas, getTrilhas, updateTrilhas, deleteTrilha,
                createTurma, getTurma, updateTurma, deleteTurma,
                updateModulo,
                addAlunoTurma, remAlunoTurma
            }}
        >
            {children}
        </TrilhaContext.Provider>
    );
};
