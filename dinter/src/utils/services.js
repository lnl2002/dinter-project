import axios from 'axios';
import { clearToken, getAccessToken } from '../common/Token';

const api = axios.create({
    baseURL: 'http://localhost:3008/api/v1',
});


// Thêm interceptor cho request
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Token = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor cho response
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            clearToken();
            localStorage.removeItem('User');
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

export default api;
