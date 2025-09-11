import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { FaCircleChevronLeft, FaCircleChevronRight, FaPizzaSlice, FaIceCream, FaLeaf, FaKitchenSet } from 'react-icons/fa6'
import { FaHamburger } from "react-icons/fa"
import { GiNoodles, GiShrimp, GiDonerKebab, GiTacos, GiSushis, GiWrappedSweet, GiBrazilFlag } from "react-icons/gi";
import { LuVegan } from "react-icons/lu"
import { MdOutlineFastfood, MdLocalDrink } from "react-icons/md";
import { useSelector } from 'react-redux'
import ShopCard from './ShopCard';

const categories = [
    { name: "Doces", icon: <GiWrappedSweet className="text-pink-500 text-2xl" /> },
    { name: "Sobremesas", icon: <FaIceCream className="text-purple-500 text-2xl" /> },
    { name: "Pizzas", icon: <FaPizzaSlice className="text-red-500 text-2xl" /> },
    { name: "Hambúrgueres", icon: <FaHamburger className="text-yellow-500 text-2xl" /> },
    { name: "Japonesa", icon: <GiSushis className="text-orange-500 text-2xl" /> },
    { name: "Caseira", icon: <FaKitchenSet className="text-amber-700 text-2xl" /> },
    { name: "Chinesa", icon: <GiNoodles className="text-red-400 text-2xl" /> },
    { name: "Brasileira", icon: <GiBrazilFlag className="text-green-600 text-2xl" /> },
    { name: "Italiana", icon: <FaPizzaSlice className="text-red-600 text-2xl" /> },
    { name: "Árabe", icon: <GiDonerKebab className="text-yellow-600 text-2xl" /> },
    { name: "Saudável", icon: <FaLeaf className="text-green-400 text-2xl" /> },
    { name: "Lanches", icon: <MdOutlineFastfood className="text-orange-400 text-2xl" /> },
    { name: "Bebidas", icon: <MdLocalDrink className="text-blue-500 text-2xl" /> },
    { name: "Vegetariana", icon: <FaLeaf className="text-green-600 text-2xl" /> },
    { name: "Vegana", icon: <LuVegan className="text-emerald-500 text-2xl" /> },
    { name: "Frutos do Mar", icon: <GiShrimp className="text-sky-500 text-2xl" /> },
    { name: "Mexicana", icon: <GiTacos className="text-red-700 text-2xl" /> },
]

const UserDashboard = () => {
    const { city, shopsInMyCity } = useSelector((state) => state.user)
    const cateScrollRef = useRef();
    const shopScrollRef = useRef();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);
    const [showLeftShopButton, setShowLeftShopButton] = useState(false);
    const [showRightShopButton, setShowRightShopButton] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const updateButton = (ref, setLeftButton, setRightButton) => {
        const element = ref.current;
        if (element) {
            setLeftButton(element.scrollLeft > 0);
            setRightButton(
                element.scrollLeft + element.clientWidth < element.scrollWidth
            );
        }
    };
    const scrollHandler = (ref, direction) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: direction == "left" ? -200 : 200,
                behavior: "smooth",
            });
        }
    };
    useEffect(() => {
        if (cateScrollRef.current) {
            updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
            updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
            cateScrollRef.current.addEventListener("scroll", () => {
                updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
            });
            shopScrollRef.current.addEventListener("scroll", () => {
                updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
            });

        }
        return () => {
            cateScrollRef.current?.removeEventListener("scroll", () => {
                updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
            })
            shopScrollRef.current.removeEventListener("scroll", () => {
                updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton);
            })

        }
    }, [categories]);
    return (
        <div className="w-screen min-h-screen flex flex-col gap-5 bg-bg-default items-center overflow-y-auto">
            <Nav />
            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
                <h1 className="text-gray-800 text-2xl sm:text-3xl">
                    O que você quer comer hoje?
                </h1>
                <div className="w-full relative">
                    {showLeftButton && (
                        <button
                            className="absolute top-1/2 left-0 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-hover-default z-10"
                            onClick={() => scrollHandler(cateScrollRef, "left")}
                        >
                            <FaCircleChevronLeft />
                        </button>
                    )}
                    <div className="w-full flex overflow-x-auto gap-4 pb-2 no-scrollbar"
                        ref={cateScrollRef}>
                        {categories.map((cat) => (
                            <div
                                key={cat.name}
                                className={`flex flex-col items-center min-w-[90px] cursor-pointer 
     ${activeCategory === cat.name ? "text-primary/95" : "text-gray-700"}`}
                                onClick={() => setActiveCategory(cat.name)}
                            >
                                <div className={`w-16 h-16 flex items-center justify-center rounded-full shadow-md border transition 
       ${activeCategory === cat.name ? "bg-primary/5 text-white border-primary" : "bg-white"}`}>
                                    {cat.icon}
                                </div>
                                <span className="text-xs mt-2">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                    {showRightButton && (
                        <button
                            className="absolute top-1/2 right-0 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-hover-default z-10"
                            onClick={() => scrollHandler(cateScrollRef, "right")}
                        >
                            <FaCircleChevronRight />
                        </button>)}
                </div>
                <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
                    <h1 className="text-gray-800 text-2xl sm:text-3xl">Melhores restaurantes em {city}</h1>
                    <div className="w-full relative">
                        {showLeftShopButton && (
                            <button
                                className="absolute top-1/2 left-0 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-hover-default z-10"
                                onClick={() => scrollHandler(shopScrollRef, "left")}
                            >
                                <FaCircleChevronLeft />
                            </button>
                        )}
                        <div
                            className="w-full flex overflow-x-auto gap-4 pb-2"
                            ref={shopScrollRef}
                        >
                            {shopsInMyCity.map((shop) => (
                                <ShopCard key={shop._id} shop={shop} />
                            ))}
                        </div>
                        {showRightShopButton && (
                            <button
                                className="absolute top-1/2 left-0 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-hover-default z-10"
                                onClick={() => scrollHandler(shopScrollRef, "right")}
                            >
                                <FaCircleChevronLeft />
                            </button>
                        )}

                    </div>
                </div>
            </div>
            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
                  <h1 className="text-gray-800 text-2xl sm:text-3xl">Pratos em destaque</h1>
                    <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
                        
                    </div>
            </div>
        </div>
    )
}

export default UserDashboard
