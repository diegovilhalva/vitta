import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    category: {
        type: String,
        enum: [
            "Doces",
            "Sobremesas",
            "Pizzas",
            "Hambúrgueres",
            "Japonesa",
            "Caseira",
            "Chinesa",
            "Brasileira",
            "Italiana",
            "Árabe",
            "Saudável",
            "Lanches",
            "Bebidas",
            "Vegetariana",
            "Vegana",
            "Frutos do Mar",
            "Mexicana"
        ],
        required: true,
    },
    price: { type: Number, min: 0, required: true },
    foodType: { type: String, enum: ["veg", "non-veg"], required: true },
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;
