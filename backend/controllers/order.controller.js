import Shop from "../models/shop.model.js";

import Order from "../models/order.model.js"
import User from "../models/user.model.js";


export const placeOrder = async (req, res) => {
    try {
       
        const { cartItems, deliveryAddress, paymentMethod } = req.body

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "O carrinho está vazio" })
        }

        if (
            !deliveryAddress ||
            !deliveryAddress.text ||
            !deliveryAddress.latitude ||
            !deliveryAddress.longitude
        ) {
            return res.status(400).json({ message: "Por favor, informe seu endereço" })
        }

        // agrupar por loja
        const groupedByShop = {}
        cartItems.forEach((item) => {
            const shopId = item.shop
            if (!groupedByShop[shopId]) groupedByShop[shopId] = []
            groupedByShop[shopId].push(item)
        })

        // criar subpedidos
        const shopOrders = await Promise.all(
            Object.keys(groupedByShop).map(async (shopId) => {
                const shop = await Shop.findById(shopId).populate("owner")
                if (!shop) throw new Error(`Loja não encontrada: ${shopId}`)

                const items = groupedByShop[shopId]
                const subtotal = items.reduce(
                    (sum, i) => sum + Number(i.price) * Number(i.quantity),
                    0
                )

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    shopOrderItems: items.map((i) => ({
                        item: i.id,
                        name: i.name,
                        price: Number(i.price),
                        quantity: Number(i.quantity),
                    })),
                    subtotal,
                }
            })
        )

        let totalAmount = shopOrders.reduce((sum, so) => sum + so.subtotal, 0)

        const newOrder = new Order({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrder: shopOrders,

        })

        await newOrder.save()

        res.status(201).json({ order: newOrder })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message })
    }
}
