import axios from 'axios';
import { clearToken, getAccessToken, getRefreshToken, setAccessToken } from '../common/Token';

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
    async (error) => {
        if (error.response && error.response.status === 401) {

            if (error.response.data.err === "TokenExpiredError") {
                const accessToken = await getNewAccessToken();
                if (accessToken.status === "SUCCESS") {
                    console.log('test', accessToken.accessToken);
                    await setAccessToken(accessToken.accessToken);
                    window.location.reload();
                } else {
                    clearToken();
                    localStorage.removeItem('User');
                    window.location.href = '/login';
                }
            } else {
                clearToken();
                localStorage.removeItem('User');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

const getNewAccessToken = async () => {
    let responseData;
    await axios.get('http://localhost:3008/api/v1/user-token/refresh-token', {
        headers: {
            "Token": `Bearer ${getRefreshToken()}`
        }
    })
        .then(response => {
            responseData = response.data;
        })
        .catch(error => {
            responseData = error.response.data;
        });
    return responseData;
}

export default api;
