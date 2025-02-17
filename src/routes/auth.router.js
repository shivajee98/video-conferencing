import express from "express";
import { verifyOTP } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/verify-otp", verifyOTP);

export default router;
