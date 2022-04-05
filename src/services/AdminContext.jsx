import React, { useState, createContext, useContext } from 'react';

import { ToolsContext } from './ToolsContext';
import api from '../utils/api';

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const { addAlert, setLoading } = useContext(ToolsContext);

    const [alunos, setAlunos] = useState();
    const [parceiros, setParceiros] = useState();
    const [empresa, setEmpresa] = useState();

    const [posts, setPosts] = useState();
    const [post, setPost] = useState();

    const [user, setUser] = useState();

    const errCatch = (err) => {
        if (err.response) {
            const errors = err.response.data.errors;
            errors?.forEach(error => addAlert(error.msg, 'warning'));
        }
    }

    const getUsers = async (role) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/user/${role}`);
            switch (role) {
                case 'aluno':
                    setAlunos(data);
                    break;
                case 'facilitador':
                    setParceiros(data);
                    break;
                case 'empresa':
                    setEmpresa(data);
                    break;
                default:
                    break;
            }
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const getUser = async (id) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/user/${id}`);
            setUser(data);
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const editUser = async (id, body) => {
        try {
            const { data } = await api.put(`/user/${id}`, body);
            addAlert(data, 'success');
            await getUser(id);
        } catch (err) { errCatch(err); }
    }
    const editProfile = async (id, body) => {
        try {
            const { data } = await api.put(`/profile/${id}`, body);
            addAlert(data, 'success');
            await getUser(id);
        } catch (err) { errCatch(err); }
    }

    const deleteUser = async (id, role) => {
        try {
            const { data } = await api.delete(`/user/${id}`);
            addAlert(data, 'success');
            await getUsers(role);
        } catch (err) { errCatch(err); }
    }

    const editCurriculo = async (id, body) => {
        if (!id) addAlert('Este aluno não possui perfil', 'warning');
        try {
            const { data } = await api.put(`/profile/curriculo/${id}`, body);
            addAlert(data, 'success');
        } catch (err) { errCatch(err); }
    }


    const getPosts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/post`);
            setPosts(data);
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const getPost = async (id) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/post/${id}`);
            setPost(data);
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const createPost = async (body) => {
        setLoading(true);
        try {
            const { data } = await api.post(`/post`, body);
            addAlert(data, 'success');
            getPosts();
            return true;
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const updatePost = async (id, body) => {
        setLoading(true);
        try {
            const { data } = await api.put(`/post/${id}`, body);
            addAlert(data, 'success');
            getPosts();
            setLoading(false);
            return true;
        } catch (err) { errCatch(err); }
        setLoading(false);
    }

    const deletePost = async (id) => {
        setLoading(true);
        try {
            const { data } = await api.delete(`/post/${id}`);
            addAlert(data, 'success');
            getPosts();
            setLoading(false);
            return true;
        } catch (err) { errCatch(err); }
        setLoading(false);
    }


    return (
        <AdminContext.Provider
            value={{
                getUsers, getUser, deleteUser, editUser, user,
                editProfile,
                alunos, parceiros, empresa,
                editCurriculo,
                getPosts, getPost, createPost, updatePost, deletePost, posts, post
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
