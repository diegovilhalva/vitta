import express from "express"
import {authMiddleware} from "../middlewares/auth.js"
import { placeOrder } from "../controllers/order.controller.js"

const router = express.Router()

router.post("/place-order",authMiddleware,placeOrder)


export default router