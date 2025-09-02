import express from "express"
import { authMiddleware } from "../middlewares/auth.js"
import { getCurrentUser } from "../controllers/user.controller.js"


const router = express.Router()

router.get("/current",authMiddleware,getCurrentUser)

export default router