import { useState } from "react";
import {
    FaLeaf,
    FaDrumstickBite,
    FaStar,
    FaMinus,
    FaPlus,
    FaShoppingCart,
} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const FoodCard = ({ data }) => {
    const [quantity, setQuantity] = useState(0);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <FaStar key={i} className="text-yellow-500 text-sm" />
                ) : (
                    <FaRegStar key={i} className="text-yellow-500 text-sm" />
                )
            );
        }
        return stars;
    };

    const formatadorBRL = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return (
        <div className="w-full sm:w-[260px] rounded-2xl border border-gray-200 bg-white shadow hover:shadow-lg transition flex flex-col">
            {/* Imagem */}
            <div className="relative w-full h-[180px]">
                <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
                    {data.foodType === "veg" ? (
                        <FaLeaf className="text-green-600 text-lg" />
                    ) : (
                        <FaDrumstickBite className="text-red-500 text-lg" />
                    )}
                </div>
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover rounded-t-2xl"
                />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 flex flex-col p-4">
                <h1 className="font-semibold text-gray-900 text-base truncate">
                    {data.name}
                </h1>

                <div className="flex items-center gap-1 mt-1">
                    {renderStars(data?.rating?.average || 0)}
                    <span className="text-xs text-gray-500">
                        ({data?.rating?.count || 0})
                    </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900 text-lg">
                        {formatadorBRL.format(data.price)}
                    </span>
                </div>
            </div>

            {/* Ações */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                        className="px-2 py-1 hover:bg-gray-100 transition"
                        onClick={() =>
                            setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
                        }
                    >
                        <FaMinus size={12} />
                    </button>
                    <span className="px-3">{quantity}</span>
                    <button
                        className="px-2 py-1 hover:bg-gray-100 transition"
                        onClick={() => setQuantity((prev) => prev + 1)}
                    >
                        <FaPlus size={12} />
                    </button>
                </div>

                <button className="bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-hover-default transition">
                    <FaShoppingCart size={16} /> Comprar
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
