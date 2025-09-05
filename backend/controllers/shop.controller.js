import Shop from "../models/shop.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body
        let image
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        let shop = await Shop.findOne({ owner: req.userId })

        if (!shop) {
            shop = await Shop.create({
                name,
                city,
                state,
                address,
                image,
                owner: req.userId
            })
        } else {
            shop = await Shop.findByIdAndUpdate(shop._id, {
                name,
                city,
                state,
                address,
                image,
                owner: req.userId,
            },
                { new: true })
        }
        await shop.populate("shop items")
        return res.status(201).json(shop)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message })
    }
}


export const getMyShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.userId }).populate("owner").populate({
            path: "items",
            options: { sort: { updatedAt: -1 } },
        });
        if (!shop) {
            return res.status(404).json({ message: "Loja não encontrada" });
        }
        return res.status(200).json(shop);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message })
    }
}