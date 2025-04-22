import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  userId:{type:String,required: true,unique:true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  resume:{type:String},
  role: { type: String, default: 'candidate' }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
