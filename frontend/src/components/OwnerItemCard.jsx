import axios from 'axios';
import React, { useState } from 'react'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { setMyShopData } from '../redux/ownerSlice';
import { toast } from 'sonner';
import ConfirmDialog from './ConfirmDialog';

const OwnerItemCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleDeleteItem = async () => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/api/item/delete/${item._id}`,
                { withCredentials: true }
            );
            dispatch(setMyShopData(res.data));
            toast.success("Item removido com sucesso!");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Erro ao deletar item");
        }
    }

    const formatadorBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
            {/* Imagem */}
            <div className="relative w-full h-40">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />

                {/* Ações no canto superior direito */}
                <div className="absolute top-2 right-2 flex gap-2">
                    <button
                        className="p-2 rounded-full bg-white shadow hover:bg-gray-100 text-primary"
                        onClick={() => navigate(`/edit-item/${item._id}`)}
                        title="Editar"
                    >
                        <FaPen size={14} />
                    </button>
                    <button
                        className="p-2 rounded-full bg-white shadow hover:bg-gray-100 text-red-500"
                        title="Remover"
                        onClick={() => setOpenConfirm(true)}
                    >
                        <FaTrashAlt size={14} />
                    </button>

                    <ConfirmDialog
                        open={openConfirm}
                        onClose={() => setOpenConfirm(false)}
                        onConfirm={handleDeleteItem}
                        message={`Tem certeza que deseja excluir "${item.name}"?`}
                    />
                </div>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h2>

                {/* Badges */}
                <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600 font-medium">
                        {item.category}
                    </span>
                    <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${item.foodType === "veg"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                            }`}
                    >
                        {item.foodType === "veg" ? "Vegano" : "Não vegano"}
                    </span>
                </div>

                {/* Preço */}
                <div className="text-lg font-semibold text-primary">
                    {formatadorBRL.format(item.price)}
                </div>
            </div>
        </div>
    )
}

export default OwnerItemCard
