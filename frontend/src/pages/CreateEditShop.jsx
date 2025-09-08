import React from 'react'
import { FaUtensils } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const CreateEditShop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myShopData } = useSelector((state) => state.owner);
    const { currentCity, currentState, currentAddress } = useSelector(
        (state) => state.user
    );
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
                <form className="">
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </label>
                        <input type="text" placeholder="Digite o nome da loja" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imagem da loja
                        </label>
                        <input type="file" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        {/* Todo: criar preview da imagem */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cidade
                            </label>
                            <input type="text" placeholder="Digite a cidade" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <input type="text" placeholder="Digite o estado" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Endereço
                        </label>
                        <input type="text" placeholder="Digite o endereço" className="w-full px-4 py-2 border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                     <button className="mt-8 w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-hover-default hover:shadow-lg transition-all duration-200 cursor-pointer" >
                        Salvar
                     </button>
                </form>
            </div>

        </div>
    )
}

export default CreateEditShop