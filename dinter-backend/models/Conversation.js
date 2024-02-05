import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'Users', required: true }]
});

const Conversation = mongoose.model('Conversations', conversationSchema);
export default Conversation;
