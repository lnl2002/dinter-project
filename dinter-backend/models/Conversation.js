import mongoose, { Schema } from 'mongoose';
import User from './User.js';


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

export default Conversations;