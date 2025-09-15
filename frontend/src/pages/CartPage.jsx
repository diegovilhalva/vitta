import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { removeFromCart, updateQuantity } from "../redux/userSlice"


const CartPage = () => {
  const { cartItems,totalAmount } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleIncrease = (id, currentQty) => {
    
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }))
  }

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const formatadorBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return (
    <div className="min-h-screen bg-bg-default flex justify-center p-6">
      <div className="w-full max-w-[800px]">
        <div className="flex items-center gap-[20px] mb-6">
          <div onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={35} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold  text-start">
            Carrinho
          </h1>

        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow border"
                >
                  {/* Left Side: Image & Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatadorBRL.format(item.price)} × {item.quantity}
                      </p>
                      <p className="font-bold text-gray-900">
                        {formatadorBRL.format(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Qty Controls & Remove */}
                  <div className="flex items-center gap-3">
                    <button

                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                      onClick={() => handleDecrease(item.id,item.quantity)}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span>{item.quantity}</span>
                    <button

                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                       onClick={() => handleIncrease(item.id, item.quantity)}
                    >
                      <FaPlus size={12} />
                    </button>
                    <button

                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                       onClick={() => handleRemove(item.id)}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border">
              <h3 className="text-lg font-semibold">Total</h3>
              <span className="text-xl font-bold text-primary">
                {formatadorBRL.format(totalAmount)}
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-hover-default transition" onClick={() => navigate("/checkout")}>
                Prosseguir para o pagamento
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default CartPage