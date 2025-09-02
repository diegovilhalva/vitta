import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router"

const CompleteProfile = () => {
  const [role, setRole] = useState("")
  const [mobile, setMobile] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!role || !mobile) {
      return toast.error("Preencha todos os campos")
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/complete-profile`,
        { role, mobile },
        { withCredentials: true }
      )
      if (res.status === 200) {
        toast.success("Perfil atualizado com sucesso!")
        navigate("/")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao atualizar perfil")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg-default">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Complete seu perfil</h1>

        <div className="mb-4">
          <label htmlFor="mobile" className="block mb-1">Telefone</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block mb-1">Entrar como</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border-[1px] border-border-default rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
          >
            <option value="">Selecione</option>
            <option value="user">Usuário</option>
            <option value="owner">Loja</option>
            <option value="deliveryBoy">Entregador</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-hover-default w-full"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}

export default CompleteProfile
