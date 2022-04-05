import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.fazcarreira.com',
    // baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(err);
    }
);

export default api;