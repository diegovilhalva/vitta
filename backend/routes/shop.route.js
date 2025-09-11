import express from "express"
import {authMiddleware} from "../middlewares/auth.js"
import { upload } from "../middlewares/multer.js"
import { createShop, getMyShop, getShopByCity } from "../controllers/shop.controller.js"
const router = express.Router()

router.post("/create-edit",authMiddleware,upload.single('image'),createShop)
router.get("/my-shop",authMiddleware,getMyShop)
router.get("/get-by-city/:city",authMiddleware,getShopByCity)
export default router