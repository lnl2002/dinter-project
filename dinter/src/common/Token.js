import Cookies from 'js-cookie'

const setTokenToCookies = (accessToken, refreshToken) => {
    // Access token
    Cookies.set('access_token', accessToken);

    // Refresh token
    Cookies.set('refresh_token', refreshToken);
}

const getAccessToken = () => {
    return Cookies.get('access_token');
}

const getRefreshToken = () => {
    return Cookies.get('refresh_token');
}

export {
    setTokenToCookies, 
    getAccessToken, 
    getRefreshToken
}