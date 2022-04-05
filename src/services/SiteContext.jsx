import React, { createContext, useContext, useState } from 'react';
import api from '../utils/api';
import { ToolsContext } from './ToolsContext';

export const SiteContext = createContext();

export const SiteContextProvider = ({ children }) => {

    const { addAlert, setLoading } = useContext(ToolsContext);
    // const [posts, setPosts] = useState([]);
    // const [post, setPost] = useState({});

    const [site, setSite] = useState({});

    // const [file, setFile] = useState({});

    const errCatch = (err) => {
        if (err.response) {
            const errors = err.response.data.errors;
            errors?.forEach(error => addAlert(error.msg, 'warning'));
        }
    }

    const getSite = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/site');
            setSite(data);
        } catch (err) {
            errCatch(err);
        }
        setLoading(false);
    }

    const editSite = async (body) => {
        try {
            const { data } = await api.post('/site', body);
            addAlert(data, 'success');
            getSite();
        } catch (err) {
            errCatch(err);
        }
    }

    // const getPosts = async () => {
    //     try {
    //         if (!posts) setLoading(true);
    //         const { data } = await api.get(`/post`);
    //         setPosts(data);
    //         setLoading(false);
    //     } catch (err) {
    //         if (err.response) {
    //             const errors = err.response.data.errors;
    //             errors?.forEach(error => addAlert(error.msg, 'warning'));
    //         }
    //         setLoading(false);
    //         return false;
    //     }
    // }

    // const getPost = async (id) => {
    //     try {
    //         if (!post) setLoading(true);
    //         const { data } = await api.get(`/post/${id}`);
    //         setPost(data);
    //         setLoading(false);
    //     } catch (err) {
    //         if (err.response) {
    //             const errors = err.response.data.errors;
    //             errors?.forEach(error => addAlert(error.msg, 'warning'));
    //         }
    //         setLoading(false);
    //         return false;
    //     }
    // }

    // const createPost = async (body) => {
    //     try {
    //         setLoading(true);
    //         const { data } = await api.post(`/post`, body);
    //         addAlert(data, 'success');
    //         getPosts();
    //         setLoading(false);
    //         return true;
    //     } catch (err) {
    //         if (err.response) {
    //             const errors = err.response.data.errors;
    //             errors?.forEach(error => addAlert(error.msg, 'warning'));
    //         }
    //         setLoading(false);
    //         return false;
    //     }
    // }

    // const updatePost = async (id, body) => {
    //     try {
    //         setLoading(true);
    //         const { data } = await api.put(`/post/${id}`, body);
    //         addAlert(data, 'success');
    //         getPosts();
    //         setLoading(false);
    //         return true;
    //     } catch (err) {
    //         if (err.response) {
    //             const errors = err.response.data.errors;
    //             errors?.forEach(error => addAlert(error.msg, 'warning'));
    //         }
    //         setLoading(false);
    //         return false;
    //     }
    // }

    // const deletePost = async (id) => {
    //     try {
    //         setLoading(true);
    //         const { data } = await api.delete(`/post/${id}`);
    //         addAlert(data, 'success');
    //         getPosts();
    //         setLoading(false);
    //         return true;
    //     } catch (err) {
    //         if (err.response) {
    //             const errors = err.response.data.errors;
    //             errors?.forEach(error => addAlert(error.msg, 'warning'));
    //         }
    //         setLoading(false);
    //         return false;
    //     }
    // }

    return (
        <SiteContext.Provider
            value={{
                site, getSite, editSite
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};