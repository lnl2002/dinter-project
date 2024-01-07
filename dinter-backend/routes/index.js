const UserRouter = require('./UserRouter');
const RefreshTokenRouter = require('./RefreshTokenRouter');

const routes = (app) => {
    app.use('/api/v1/user', UserRouter)
    app.use('/api/v1/user-token', RefreshTokenRouter)
}

module.exports = routes