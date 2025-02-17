import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        clerkUserID: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        streamToken: {
            type: String
        },
        jwtToken: {
            type: String
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
