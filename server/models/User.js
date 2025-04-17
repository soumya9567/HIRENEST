import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    resume: { type: String },
    image: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
