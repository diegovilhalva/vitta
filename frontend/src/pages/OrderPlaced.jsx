import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const OrderPlaced = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#fff9f6] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Pedido feito com sucesso!</h1>
            <p className="text-gray-600 max-w-md mb-6">
                Obrigado pela sua confiança! 🎉 Seu pedido já está sendo preparado.
                Para acompanhar o status em tempo real, acesse a página <strong>Meus Pedidos</strong>.
            </p>

            <button
                onClick={() => navigate("/my-orders")}
                className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
                Voltar para meus pedidos
            </button>


        </div>
    )
}

export default OrderPlaced