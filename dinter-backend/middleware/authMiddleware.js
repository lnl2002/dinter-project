import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        console.log(req.headers.token);
        const token = req.headers.token.split(' ')[1];

        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if(err) {
                return res.status(404).json({
                    status: "ERR",
                    message: "The authentication"
                })
            } else {
                console.log(user);
                req.userId = user.id;
                next();
            }
        })
    } catch (err) {
        return res.status(404).json({
            status: "ERR",
            message: "The authentication"
        });
    }

    
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
        if(err) {
            return res.status(404).json({
                status: "ERR",
                message: "The authentication"
            })
        }
        const { payload } = user;
        if(payload?.isAdmin || payload?.id === userId) {
            next();
        } else {
            return res.status(404).json({ 
                status: "ERR",
                message: "The authentication"
            })
        }
    })
}

export {
    authMiddleware
}