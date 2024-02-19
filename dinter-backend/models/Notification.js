import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamp: true });

const Notification = mongoose.model('Notifications', notificationSchema);
export default Notification; 