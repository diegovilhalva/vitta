import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const ShopCard = ({ shop }) => {
  return (
    <div className="min-w-[250px] sm:min-w-[280px] max-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden flex-shrink-0">
      {/* Imagem da loja */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col gap-2">
        {/* Nome */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {shop.name}
        </h2>

        {/* Endereço */}
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary" />
         {shop.address.slice(0,24)} -  {shop.city} 
        </p>

        {/* Item em destaque */}
        {shop.items?.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <img
              src={shop.items[0].image}
              alt={shop.items[0].name}
              className="w-10 h-10 object-cover rounded-lg border"
            />
            <span className="text-sm text-gray-700">
              {shop.items[0].name}
            </span>
          </div>
        )}

        {/* Avaliação fake */}
        <div className="flex items-center gap-1 mt-2 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-xs" />
          ))}
          <span className="text-xs text-gray-500 ml-2">4.9</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
