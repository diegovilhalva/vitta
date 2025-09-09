import React, { useState } from 'react'
import { FaUtensils } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from "axios"
import { toast } from 'sonner';
import { LuLoaderCircle } from 'react-icons/lu';
import { setMyShopData } from '../redux/ownerSlice';

const CreateEditShop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myShopData } = useSelector((state) => state.owner);
    const { city: currentCity, state: currentState, address: currentAddress } = useSelector(
        (state) => state.user
    );
    const [name, setName] = useState(myShopData?.name || "");
    const [address, setAddress] = useState(myShopData?.address || currentAddress);
    const [city, setCity] = useState(myShopData?.city || currentCity);
    const [state, setState] = useState(myShopData?.state || currentState);
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
    const [backendImage, setBackendImage] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        } else {
            toast.error("Por favor, selecione um arquivo de imagem válido.");
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("city", city);
            formData.append("state", state);
            formData.append("address", address);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/shop/create-edit`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            if (res.status === 201) {
                dispatch(setMyShopData(res.data))
                toast.success("Operação concluída com sucesso")
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
                    <div className="text-3xl font-extrabold text-gray-900">
                        {myShopData ? "Editar Loja" : "Adicionar Loja"}
                    </div>


                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" placeholder="Digite o nome da loja" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imagem da loja
                        </label>
                        <input onChange={handleImage} type="file" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" accept='image/*' />

                        {frontendImage && (
                            <div className="mt-4">
                                <img
                                    src={frontendImage}
                                    alt="Imagem da loja"
                                    className="w-full h-48 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cidade
                            </label>
                            <input value={city}
                                onChange={(e) => setCity(e.target.value)}
                                type="text" placeholder="Digite a cidade" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <input type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}

                                placeholder="Digite o estado" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Endereço
                        </label>
                        <input type="text" placeholder="Digite o endereço"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
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

export default CreateEditShop