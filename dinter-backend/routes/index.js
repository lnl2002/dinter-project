// const UserRouter = require('./UserRouter');
// const RefreshTokenRouter = require('./RefreshTokenRouter');
// const ConversationRouter = require('./ConversationRouter');
// const MessageRouter = require('./MessageRouter');

import UserRouter from './UserRouter.js';
import RefreshTokenRouter from './RefreshTokenRouter.js';
import ConversationRouter from './ConversationRouter.js';
import MessageRouter from './MessageRouter.js';
import PostRouter from './PostRouter.js'

const routes = (app) => {
    app.use('/api/v1/user', UserRouter)
    app.use('/api/v1/user-token', RefreshTokenRouter)
    app.use('/api/v1/conversation', ConversationRouter)
    app.use('/api/v1/message', MessageRouter)
    app.use('/api/v1/post', PostRouter)
}

export default routes;