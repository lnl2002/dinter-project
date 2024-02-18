const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User.js');

const conversationSchema = new mongoose.Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ]
},{
    timestamps: true,
})

const Conversations = mongoose.model('Conversations', conversationSchema);

module.exports = Conversations;