import Cookies from 'js-cookie'

const setTokenToCookies = (accessToken, refreshToken) => {
    // Access token
    Cookies.set('access_token', accessToken, { expires: 7 });

    // Refresh token
    Cookies.set('refresh_token', refreshToken, { expires: 365 });
}

const setAccessToken = async(accessToken) => {
    // Access token
    Cookies.set('access_token', accessToken, { expires: 7 });
}

const getAccessToken = () => {
    return Cookies.get('access_token');
}

const getRefreshToken = () => {
    return Cookies.get('refresh_token');
}

const clearToken = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
}

export {
    setTokenToCookies, 
    getAccessToken, 
    getRefreshToken,
    clearToken,
    setAccessToken
}