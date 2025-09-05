import express from "express"
import {authMiddleware} from "../middlewares/auth.js"
import { upload } from "../middlewares/multer.js"
import { addItem, deleteItem, editItem, getItemById } from "../controllers/item.controller.js"

const router = express.Router()

router.post("/add-item",authMiddleware,upload.single('image'),addItem)
router.post("/edit-item/:itemId",authMiddleware,upload.single('image'),editItem)
router.get("/get/:itemId",authMiddleware,getItemById)
router.delete("/delete/:itemId",authMiddleware,deleteItem)

export default router