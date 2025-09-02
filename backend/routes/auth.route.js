import express from "express"
import {  completeProfile, googleLogin, login, logout, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.js"

const router = express.Router()

router.post("/signup",signUp)
router.post("/signin",login)
router.get("/signout",logout)
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/google-login", googleLogin);
router.post("/complete-profile", authMiddleware, completeProfile);

export default  router 