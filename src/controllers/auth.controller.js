import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { verifyClerkSession } from "../services/clerk.service.js";
import { generateStreamToken } from "../services/stream.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const verifyOTP = async (req, res, next) => {
    try {
        const { sessionToken, email } = req.body;
        if (!sessionToken || !email) return next(new ApiError(400, "Missing sessionToken or email"));

        // 🔍 Validate Clerk Session
        const clerkUserID = await verifyClerkSession(sessionToken);
        if (!clerkUserID) return next(new ApiError(401, "Invalid Clerk session"));

        // 🔑 Generate Stream Token
        const streamToken = generateStreamToken(clerkUserID);

        // 🔑 Generate JWT Token for User Authentication
        const jwtToken = jwt.sign({ clerkUserID, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // 📌 Store User in Database
        let user = await User.findOne({ clerkUserID });
        if (!user) {
            user = await User.create({ clerkUserID, email, streamToken, jwtToken });
        } else {
            user.jwtToken = jwtToken;
            await user.save();
        }

        res.json(new ApiResponse(200, "OTP Verified", { streamToken, jwtToken, user }));
    } catch (error) {
        next(new ApiError(500, "OTP verification failed", error));
    }
};
