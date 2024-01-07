const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String // Có thể lưu đường dẫn của hình ảnh avatar
  },
  gender: {
    type: String, // Có thể là "male", "female", "other", etc.
    enum: ['male', 'female', 'other']
  },
  hobby: {
    type: [String] // Một mảng các sở thích, ví dụ: ["reading", "traveling"]
  },
//   listFriend: {
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Mảng các đối tượng User là bạn bè
//   },
//   listPost: {
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Mảng các đối tượng Post của người dùng
//   },
//   listMessage: {
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] // Mảng các đối tượng Message
//   },
//   notificationList: {
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }] // Mảng các đối tượng Notification
//   }
}, {
  timestamps: true,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
