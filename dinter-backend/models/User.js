import mongoose, {Schema}  from "mongoose";

const userSchema = new Schema({
  username: {
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
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  dateOfBirth: {
    type: Date,
  },
  avatar: String,
  bio: String,
  address: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  isAdmin: Boolean,
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobbies' }],
  isSetUpProfile: {
    type: Boolean,
  },
  attractedBy: String,
  location: {
    lat: Number,
    lng: Number
  }
});

const User = mongoose.model('Users', userSchema);

export default User;
