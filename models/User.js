import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, required: false },
    subscribers: { type: Number, default: 0 },
    subscribedUser: { type: [String] }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);