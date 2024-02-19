import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'Users', required: true }],
    image: {
        type: String,
        required: true
    },
    tagList: [{
        type: String
    }]
}, { timestamp: true });

const Post = mongoose.model('Posts', postSchema);
export default Post;