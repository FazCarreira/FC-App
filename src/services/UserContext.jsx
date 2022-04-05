import React, { useState, createContext, useContext } from 'react';

import { ToolsContext } from './ToolsContext';
import api from '../utils/api';
import { AuthenticationContext } from './AuthContext';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const { user, loadUser } = useContext(AuthenticationContext);
    const { addAlert, setLoading } = useContext(ToolsContext);

    const [turma, setTurma] = useState();
    const [alunos, setAlunos] = useState();
    const [curriculo, setCurriculo] = useState();

    const errCatch = (err) => {
        if (err.response) {
            const errors = err.response.data.errors;
            errors?.forEach(error => addAlert(error.msg, 'warning'));
        }
    }

    const editUser = async (data) => {
        delete data.password;
        delete data.role;

        const body = data;

        setLoading(true);
        try {
            const { data } = await api.put(`/user`, body);
            addAlert(data, 'success');
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const getTurma = async (role) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/${user.role}/curso`);
            setTurma(data);
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const getAlunos = async (numero) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/facilitador/turma/${numero}`);
            setAlunos(data);
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const salvarChamada = async (id, body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/facilitador/chamada/${id}`, body);
            addAlert(data, 'success');
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const sendMsg = async (id, body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/turma/forum/${id}`, body);
            addAlert(data, 'success');
            getTurma();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const deleteMsg = async (id, comment) => {
        setLoading(true);
        try {
            const { data } = await api.delete(`/turma/forum/${id}/${comment}`);
            addAlert(data, 'success');
            getTurma();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const postMaterial = async (id, aula, body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/facilitador/materiais/${id}`, body);
            addAlert(data, 'success');
            getTurma();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const deleteMaterial = async (id, material) => {
        setLoading(true);
        try {
            const { data } = await api.delete(`/facilitador/materiais/${id}/${material}/`);
            addAlert(data, 'success');
            getTurma();
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const setAvaliacao = async (id, body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/facilitador/avaliacao/${id}`, body);
            addAlert(data, 'success');
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const getCurriculo = async (id) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/profile/curriculo/${id}`);
            setCurriculo(data);
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const setCurrículo = async (body) => {
        setLoading(true);
        try {
            const { data } = await api.put(`/profile/curriculo`, body);
            await loadUser();
            addAlert(data, 'success');
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const setOpiniao = async (body) => {
        setLoading(true);
        try {
            const { data } = await api.put(`/aluno/opiniao`, body);
            await getTurma('aluno');
            addAlert(data, 'success');
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    return (
        <UserContext.Provider
            value={{
                editUser, salvarChamada, setAvaliacao,
                getTurma, turma,
                getAlunos, alunos,
                getCurriculo, setCurrículo, curriculo,
                sendMsg, deleteMsg,
                postMaterial, deleteMaterial,
                setOpiniao
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
