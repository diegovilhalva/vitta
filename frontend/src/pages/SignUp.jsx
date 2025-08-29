import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router"

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const [fullName, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")

    const handleSumbmit = (e) => {
        e.preventDefault()
        console.log(fullName, email, password, role, mobile)
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-bg-default">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-border-default">
                <h1 className="text-3xl font-bold mb-4 text-primary">Crie sua conta no Vitta</h1>
                <p className="text-gray-600 mb-8">Preencha seus dados para começar</p>

                <form className='' onSubmit={handleSumbmit}>
                    <div className="mb-4">
                        <label className='block text-gray-700 font-medium mb-1' htmlFor="fullName">Nome Completo</label>
                        <input onChange={(e) => setFullname(e.target.value)} className='w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary' type="text" id='fullName' placeholder='Digite seu nome' />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 font-medium mb-1' htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary' type="email" id='email' placeholder='Digite seu email' />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 font-medium mb-1' htmlFor="mobile">Telefone</label>
                        <input onChange={(e) => setMobile(e.target.value)} className='w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary' type="text" id='mobile' placeholder='00000-0000' />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 font-medium mb-1' htmlFor="password">Senha</label>
                        <div className="relative">
                            <input onChange={(e) => setPassword(e.target.value)} className='w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary' type={`${showPassword ? 'text' : 'password'}`} id='password' placeholder='Digite sua senha' />
                            <button
                                type="button"
                                aria-label="Mostrar ou ocultar senha"
                                className="absolute right-3 top-3 text-gray-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowPassword((prev) => !prev)
                                }}
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>

                        </div>

                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 font-medium mb-1' htmlFor="role">Entrar como</label>
                        <div className="relative">
                            <select
                                id="role"
                                className="w-full border-border-default border-[1px] rounded-lg px-2 py-2"
                                onChange={(e) => setRole(e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="user">Usuário</option>
                                <option value="owner">Loja</option>
                                <option value="deliveryBoy">Entregador</option>
                            </select>

                        </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white hover:bg-hover-default mt-4 flex items-center justify-center gap-2 border-border-default rounded-lg px-4 py-2 transition duration-200 cursor-pointer">Criar conta</button>
                </form>
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">OU</span>
                    <hr className="flex-grow border-gray-300" />
                </div>


                <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100 active:bg-gray-200">
                    <FcGoogle size={20} />
                    Entrar pelo Google
                </button>
                <p className="text-center mt-6">
                    Já tem uma conta?{" "}
                    <Link className="text-primary font-medium hover:underline" to="/signin">
                        Entrar
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default SignUp