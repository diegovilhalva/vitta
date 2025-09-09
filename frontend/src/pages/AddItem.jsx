import axios from "axios";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { setMyShopData } from "../redux/ownerSlice";


const AddItem = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myShopData } = useSelector((state) => state.owner);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(null);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("veg");
    const [loading, setLoading] = useState(false);

    const categories = [
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
    ]

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        } else {
            toast.error("Por favor, selecione um arquivo de imagem válido.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("category", category)
            formData.append("foodType", foodType)
            formData.append("price", price)

            if (backendImage) {
                formData.append("image", backendImage);
            }

            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/item/add-item`, formData, { withCredentials: true })
            if (res.status === 201) {
                toast.success("Prato adicionado com sucesso!")
                dispatch(setMyShopData(res.data))
                navigate("/")
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
            <div
                className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
                onClick={() => navigate("/")}
            >
                <IoIosArrowRoundBack size={35} className="text-primary" />
            </div>

            <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                        <FaUtensils className="w-16 h-16 text-primary" />
                    </div>
                    <div className="text-3xl font-extrabold text-gray-900">Adicionar prato</div>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            required
                            placeholder="Digite o nome do prato"
                            className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imagem do prato
                        </label>
                        <input
                            onChange={handleImage}
                            type="file"
                            accept="image/*"
                            className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {frontendImage && (
                            <div className="mt-4">
                                <img
                                    src={frontendImage}
                                    alt="Imagem do prato"
                                    className="w-full h-48 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preço
                        </label>
                        <input
                            value={price || ""}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            type="number"
                            min="0"
                            step="0.01"
                            required
                            placeholder="0,00"
                            className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoria
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        >
                            <option value="">Selecione</option>
                            {categories.map((cat, index) => (
                                <option value={cat} key={index}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de prato
                        </label>
                        <select
                            value={foodType}
                            onChange={(e) => setFoodType(e.target.value)}
                            className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        >
                            <option value="veg">Vegano</option>
                            <option value="non-veg">Não vegano</option>
                        </select>
                    </div>

                    <button
                        disabled={loading}
                        className={`mt-8 w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-md 
                       ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-hover-default hover:shadow-lg"} 
                       transition-all duration-200 flex items-center justify-center`}
                    >
                        {loading ? <LuLoaderCircle className="animate-spin" /> : "Salvar"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddItem