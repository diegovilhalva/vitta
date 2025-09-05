import Shop from "../models/shop.model.js"
import Item from "../models/item.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"


export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body
        let image
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const shop = await Shop.findOne({ owner: req.userId });

        if (!shop) {
            return res.status(400).json({ message: "Loja não encontrada" });
        }
        const item = await Item.create({
            name,
            category,
            foodType,
            price,
            image,
            shop: shop._id,
        });
        shop.items.push(item._id)
        await shop.save()
        await shop.populate("owner")
        await shop.populate({
            path: "items",
            options: { sort: { updatedAt: -1 } },
        })

        return res.status(201).json(shop)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message })
    }
}

export const editItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const { name, category, foodType, price } = req.body
        let image
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const item = await Item.findByIdAndUpdate(itemId, {
            name,
            category,
            foodType,
            price,
            image,
        },
            { new: true })

        if (!item) {
            return res.status(404).json({ message: "item não encontrado" });
        }

        const shop = await Shop.findOne({ owner: req.userId }).populate({
            path: "items",
            options: { sort: { updatedAt: -1 } },
        })

        return res.status(200).json(shop)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message })
    }
}


export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId

        const item = await Item.findById(itemId)
        if (!item) {
            return res.status(404).json({ message: "Item não encontrado" });
        }
        return res.status(200).json(item)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message })
    }
}

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await Item.findByIdAndDelete(itemId);

        if (!item) {
            return res.status(404).json({ message: "Item não encontrado" });
        }

        const shop = await Shop.findOne({ owner: req.userId });
        shop.items = shop.items.filter((i) => i._id != item._id);
        await shop.save();
        await shop.populate({
            path: "items",
            options: { sort: { updatedAt: -1 } },
        });
        return res.status(200).json(shop);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message })
    }

} 