import React, { useState } from 'react'
import { FaLocationDot, FaPlus } from 'react-icons/fa6'
import { TbReceipt2 } from "react-icons/tb"
import { IoIosSearch } from 'react-icons/io'
import { RxCross2 } from "react-icons/rx"
import { FiShoppingCart } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router'

const Nav = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/signout`, { withCredentials: true })
      if (res.status === 200) {
        toast.success(res.data.message)
        dispatch(setUserData(null))
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Ocorreu um erro")
    }
  }

  return (
    <nav className="h-[64px] flex items-center justify-between px-5 fixed top-0 z-[9999] bg-bg-default/80 backdrop-blur-md border-b border-gray-200 w-full shadow-sm">

      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-tight text-primary cursor-pointer" onClick={() => navigate("/")}>
        Vitta
      </h1>

      {/* Search (desktop) */}
      {userData.role === "user" && (
        <div className="hidden md:flex md:w-[50%] lg:w-[40%] h-[46px] bg-white shadow-sm rounded-full items-center gap-3 px-4 border border-gray-200">
          <FaLocationDot size={20} className="text-primary" />
          <span className="text-gray-500 truncate w-[25%]">Localização</span>
          <div className="flex items-center gap-2 w-full">
            <IoIosSearch size={20} className="text-primary" />
            <input
              type="text"
              placeholder="Pesquisar restaurantes ou pratos..."
              className="flex-1 text-sm text-gray-700 outline-none"
            />
          </div>
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center gap-4">

        {/* Search (mobile toggle) */}
        {userData.role === "user" &&
          (showSearch ? (
            <RxCross2
              size={22}
              onClick={() => setShowSearch(false)}
              className="text-primary md:hidden cursor-pointer"
            />
          ) : (
            <IoIosSearch
              size={22}
              className="text-primary md:hidden cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
            
          ))}
          

        {/* Owner actions */}
        {userData.role === "owner" ? (
          <>
            <button
              className="hidden md:flex items-center gap-1 px-3 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
              onClick={() => navigate("/add-item")}
            >
              <FaPlus size={18} />
              <span>Adicionar item</span>
            </button>

            <button
              className="md:hidden p-2 rounded-full bg-primary/10 text-primary"
              onClick={() => navigate("/add-item")}
            >
              <FaPlus size={18} />
            </button>

            <div className="relative hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 text-primary cursor-pointer">
              <TbReceipt2 size={18} />
              <span>Meus pedidos</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-primary rounded-full px-[6px] py-[1px]">0</span>
            </div>
          </>
        ) : (
          <>
            <div className="relative cursor-pointer">
              <FiShoppingCart size={22} className="text-primary" />
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-primary rounded-full px-[6px] py-[1px]">0</span>
            </div>
            <button className="hidden md:block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition">
              Meus pedidos
            </button>
          </>
        )}

        {/* User avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white text-lg font-semibold cursor-pointer hover:scale-105 transition"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {/* Dropdown */}
        {showInfo && (
          <div className="absolute top-[70px] right-5 w-[220px] bg-white shadow-xl rounded-xl p-4 flex flex-col gap-3 z-[9999] border border-gray-100">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{userData.fullName}</span>
              <span className="text-xs text-gray-500 truncate">{userData.email}</span>
            </div>

            {userData.role === "user" && (
              <div className="md:hidden text-primary font-medium cursor-pointer">Meus pedidos</div>
            )}

            <div
              className="text-red-500 font-medium cursor-pointer hover:underline"
              onClick={handleLogout}
            >
              Sair
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
