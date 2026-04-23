import axios from "axios";
import store from "../store";

const api = axios.create({
    baseURL: '/api',
});

// header에 토큰 추가
api.interceptors.request.use(
    (config) => {
        const token = store.getState().LoggedReducer.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;