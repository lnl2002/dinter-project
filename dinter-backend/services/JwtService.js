const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.PRIVATE_KEY, {
        expiresIn: '7d',
        algorithm: "HS256"
    })
    
    return accessToken;
}

const generalRefreshToken = (payload) => {
    const refreshToken = jwt.sign({
        payload
    }, process.env.PRIVATE_KEY_REFRESH, {
        expiresIn: '365d',
        algorithm: "HS256"
    })
    
    return refreshToken;
}

const refreshToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('token', token);
            jwt.verify(token, process.env.PRIVATE_KEY_REFRESH, (err, user) => {
                if (err) {
                    resolve({
                        status: "ERR",
                        message: "The authentication"
                    })
                } 

                const {payload} = user;
                const accessToken = generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                });

                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    accessToken: accessToken
                })
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshToken
};