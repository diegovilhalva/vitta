import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from 'react-router';
import { LuLoaderCircle } from "react-icons/lu"
const ForgotPassword = () => {
    const [step, setStep] = useState(3)
    const [email, setEmail] = useState("");
    const [Otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    return (
        <div className="flex w-full items-center justify-center min-h-screen p-4 bg-bg-default">
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4'>
                    <IoIosArrowBack size={20} className='text-primary' />
                    <h1 className='text-3xl font-bold text-center text-primary'>Esqueceu sua senha?</h1>

                </div>
                {step == 1 && (
                    <div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                                type="email"
                                id="email"
                                placeholder="Digite seu email"
                                required
                            />
                        </div>
                        <button

                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`}
                            disabled={loading}
                        >
                            {loading ? <LuLoaderCircle className="animate-spin" /> : "Enviar código"}
                        </button>
                    </div>
                )}
                {step == 2 && (
                    <div>
                        <div className="mb-6">
                            <label
                                htmlFor="otp"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                OTP
                            </label>
                            <input
                                type="email"
                                onChange={(e) => setOtp(e.target.value)}
                                value={Otp}
                                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                                placeholder="Digite o código"
                                required
                            />
                        </div>
                        <button

                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`}
                            disabled={loading}
                        >
                            {loading ? <LuLoaderCircle className="animate-spin" /> : "Verificar código"}
                        </button>
                    </div>
                )}
                {step == 3 && (
                    <div>
                        <div className="mb-6">
                            <label
                                htmlFor="newPassword"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Nova Senha
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                                placeholder="Digite sua nova senha"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Confirme a nova senha
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                                placeholder="Confirme sua senha "
                                required
                            />
                        </div>
                         <button

                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`}
                            disabled={loading}
                        >
                            {loading ? <LuLoaderCircle className="animate-spin" /> : "Alterar senha"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword