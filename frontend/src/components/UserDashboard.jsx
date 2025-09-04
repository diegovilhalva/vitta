import React from 'react'
import Nav from './Nav'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const UserDashboard = () => {
    const { city } = useSelector((state) => state.user)
    return (
        <div className="w-screen min-h-screen flex flex-col gap-5 bg-bg-default items-center overflow-y-auto">
            <Nav />
            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
                <h1 className="text-gray-800 text-2xl sm:text-3xl">
                    Texto
                </h1>
                <div className="w-full relative">
                    <button
                        className="absolute top-1/2 left-0 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-hover-default z-10"

                    >
                        <FaCircleChevronLeft />
                    </button>
                    <div className="w-full flex overflow-x-auto gap-4 pb-2">

                    </div>
                    <button
                        className="absolute top-1/2 right-0 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-hover-default z-10"

                    >
                        <FaCircleChevronRight />
                    </button>
                </div>
                <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
                    <h1 className="text-gray-800 text-2xl sm:text-3xl">Melhores restaurantes em {city} </h1>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard