import axios, { AxiosRequestConfig } from "axios";
import store from "@/store";
import { addAlertWithParams } from "@/store/thunks/alertThunks";

export const REACT_APP_API_SERVER = 'http://localhost:5000';

const REACT_APP_SERVER_BASE_URL = '/api/';
const REACT_APP_SERVER_URL = REACT_APP_API_SERVER + REACT_APP_SERVER_BASE_URL;

const axiosInstance = axios.create({
    baseURL: REACT_APP_SERVER_URL
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.data) {
            const { message, subcode } = error.response.data;
            if (subcode !== 10) {
                store.dispatch(addAlertWithParams(message, "error"));
            }
        }
        return Promise.reject(error);
    })

export const getData = async (url: string) => {
    return await axiosInstance.get(url);
}

export const postData = async (url: string, data: Record<string, any>, config: AxiosRequestConfig) => {
    return await axiosInstance.post(`/posts/${url}`, data, config);
}

export const putData = async (url: string, data: Record<string, any>, config: AxiosRequestConfig) => {
    return await axiosInstance.put(`/posts/${url}`, data, config);
}

export const deleteData = async (url: string) => {
    return await axiosInstance.delete(url);
}

export const getAuth = async (url: string, username: string, password: string) => {
    return await axiosInstance.post(`/user/${url}`, { username, password });
}

export const check = async () => {
    return await axiosInstance.get('/user/auth');
}