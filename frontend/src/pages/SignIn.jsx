import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { LuLoaderCircle } from "react-icons/lu"
import axios from "axios"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error("Preencha todos os campos.")
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      )

      if (res.status === 200) {
        toast.success(res.data.message)
        dispatch(setUserData(res.data.user))
        setEmail("")
        setPassword("")
        navigate("/") // ou dashboard, depende do fluxo
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao entrar")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/google-login`, {
        email: res.user.email,
        fullName: res.user.displayName
      }, { withCredentials: true })
      if (response.status === 200) {
        toast.success(response.data.message)
        dispatch(setUserData(response.data.user))
        if (response.data.needsProfileCompletion) {
          navigate("/complete-profile") 
        } else {
          navigate("/") 

        }
      }

      console.log(response.data)
      // todo: criar um setUser usando o redux
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-bg-default">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-border-default">
        <h1 className="text-3xl font-bold mb-4 text-primary">Bem-vindo de volta!</h1>
        <p className="text-gray-600 mb-8">Entre com seus dados para continuar</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              type="email"
              id="email"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Senha</label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                aria-label="Mostrar ou ocultar senha"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white hover:bg-hover-default mt-4 flex items-center justify-center gap-2 border-border-default rounded-lg px-4 py-2 transition duration-200 cursor-pointer"
          >
            {loading ? <LuLoaderCircle className="animate-spin" /> : "Entrar"}
          </button>
        </form>
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-primary font-medium hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>


        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OU</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100 active:bg-gray-200"
          onClick={handleGoogleAuth}>
          <FcGoogle size={20} />
          Entrar pelo Google
        </button>

        <p className="text-center mt-6">
          Não tem uma conta?{" "}
          <Link className="text-primary font-medium hover:underline" to="/signup">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
