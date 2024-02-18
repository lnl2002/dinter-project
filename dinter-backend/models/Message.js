import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversations', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    content: {
        type: String,
        required: true
    }
}, { timestamp: true });

const Message = mongoose.model('Messages', messageSchema);
export default Message