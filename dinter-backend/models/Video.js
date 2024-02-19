import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    path: {
        type: String,
        required: true,
        unique: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    liked: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    isHide: Boolean
}, {   timeStamp: true});

const Video = mongoose.model('Videos', videoSchema);
export default Video
