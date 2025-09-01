import express from "express"
import { login, logout, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup",signUp)
router.post("/signin",login)
router.get("/signout",logout)
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default  router 