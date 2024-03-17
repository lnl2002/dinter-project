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
  requestMatch: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  attractedBy: String,
  location: {
    type: { type: String, enum: ['Point']},
    coordinates: { type: [Number]}
  }
});

// Create a 2dsphere index on the location field
// Place the index creation line right after you’ve defined the schema and before you compile the schema into a model 
// with mongoose.model. This ensures that the index is created when the model is used for the first time, allowing for 
// efficient geospatial queries on the location field.
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('Users', userSchema);

export default User;
