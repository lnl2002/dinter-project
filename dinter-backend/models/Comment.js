import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Posts', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    content: {
        type: String,
        required: true
    },

    liked: [{ type: Schema.Types.ObjectId, ref: 'Users', required: true }]
}, {
    timestamp: true,
});

const Comment = mongoose.model('Comments', commentSchema);
export default Comment;