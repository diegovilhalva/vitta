import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FaPen, FaUtensils } from 'react-icons/fa6';
import OwnerItemCard from './OwnerItemCard';

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-bg-default flex flex-col items-center">
      <Nav />
      {!myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-primary w-16 h-16 sm:w-20 sm:h-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Adicione sua loja
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Crie sua loja e comece a vender seus pratos favoritos para clientes da sua cidade.

              </p>
              <button
                className="bg-primary text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-hover-default transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                Criar loja
              </button>
            </div>
          </div>
        </div>
      )}

      {myShopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center">
            <FaUtensils className="text-[#ff4d2d] w-14 h-14" />
            Bem vindo ao {myShopData.name}
          </h1>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
            <div
              className="absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
              onClick={() => navigate("/create-edit-shop")}
            >
              <FaPen size={20} />
            </div>
            <img
              src={myShopData.image}
              alt={myShopData.name}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {myShopData.name}
              </h1>
              <p className="text-gray-500">
                {myShopData.city},{myShopData.state}
              </p>
              <p className="text-gray-500 mb-4">{myShopData.address}</p>
            </div>
          </div>

          {myShopData.items.length == 0 && (
            <div className="flex justify-center items-center p-4 sm:p-6">
              <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Adicionar item
                  </h2>
                  <p className="text-gray-600 text-center max-w-2xl">
                    Aqui você pode gerenciar seu cardápio, atualizar as informações da sua loja e acompanhar tudo de um só lugar.
                  </p>

                  <button
                    className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate("/add-item")}
                  >
                    Adicionar prato
                  </button>
                </div>
              </div>
            </div>
          )}
          <h3 className='font-semibold text-2xl text-center'> Menu</h3>


          {myShopData.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
              {myShopData.items.map((item) => (
                <OwnerItemCard key={item._id} item={item} />
              ))}
            </div>
          )}

        </div>
      )}


    </div>
  )
}

export default OwnerDashboard