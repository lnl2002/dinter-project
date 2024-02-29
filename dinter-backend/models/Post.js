import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'Users', required: true }],
    images: [{
        type: String,
        required: true
    }],
}, { timestamps: true });

const Post = mongoose.model('Posts', postSchema);
export default Post;