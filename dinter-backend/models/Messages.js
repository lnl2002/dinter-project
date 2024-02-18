const mongoose = require('mongoose');
const Conversations = require('./Conversations');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Conversations
    },
    senderId: String,
    text: String
},{
    timestamps: true,
})

const messages = mongoose.model('Messages', messageSchema);

module.exports = messages;