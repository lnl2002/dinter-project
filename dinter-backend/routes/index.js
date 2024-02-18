const UserRouter = require('./UserRouter');
const RefreshTokenRouter = require('./RefreshTokenRouter');
const ConversationRouter = require('./ConversationRouter');
const MessageRouter = require('./MessageRouter');

const routes = (app) => {
    app.use('/api/v1/user', UserRouter)
    app.use('/api/v1/user-token', RefreshTokenRouter)
    app.use('/api/v1/conversation', ConversationRouter)
    app.use('/api/v1/message', MessageRouter)
}

module.exports = routes