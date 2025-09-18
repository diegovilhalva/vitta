import { FaMapMarkerAlt, FaSearch } from "react-icons/fa"
import { FaCreditCard, FaCrosshairs, FaMobileScreenButton } from "react-icons/fa6"
import { IoIosArrowRoundBack } from "react-icons/io"
import { MdDeliveryDining } from "react-icons/md"
import { useNavigate } from "react-router"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import { useDispatch, useSelector } from "react-redux"
import "leaflet/dist/leaflet.css"
import { setLocation, setMyAddress } from "../redux/mapSlice"
import axios from "axios"
import { useEffect, useState } from "react"

const RecenterMap = ({ location }) => {
  if (location.lat && location.lon) {
    const map = useMap()
    map.setView([location.lat, location.lon], 16, { animate: true })
  }
  return null

}

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const apiKey = import.meta.env.VITE_GEOAPIFY_KEY
  const { cartItems, userData, totalAmount } = useSelector((s) => s.user)
  const { location, address: myAddress } = useSelector((state) => state.map)
  const [addressInput, setAdddressInput] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const subtotal = cartItems.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0)
  const deliveryFee = totalAmount > 50 ? 0 : 10
  const total = subtotal + deliveryFee

  const onDragEnd = async (e) => {

    const { lat, lng } = e.target._latlng
    dispatch(setLocation({ lat, lon: lng }))
    getAddressByLatLng(lat, lng)

  }

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&lang=pt&apiKey=${apiKey}`)

      dispatch(setMyAddress(res.data.results[0].formatted))
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      dispatch(setLocation({ lat: latitude, lon: longitude }))
      getAddressByLatLng(latitude, longitude)
    })
  }


  const getALocationByAddress = async () => {
    try {
      const res = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&lang=pt&apiKey=${apiKey}`)
      console.log(res.data.features[0].properties.formatted)
      const { lat, lon } = res.data.features[0].properties
      dispatch(setLocation({ lat, lon }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setAdddressInput(myAddress)
  }, [myAddress])


  const formatadorBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })



  return (
    <div className="min-h-screen bg-bg-default flex items-center justify-center p-6">
      <div className=" absolute top-[20px] left-[20px] z-[10]" onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={35} className="text-primary" />
      </div>
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Pagamento</h1>
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-primary" /> Endereço de Entrega
          </h2>
          <div className="flex gap-2 mb-3">
            <input type="text" className="flex-1 border border-gray-300 rounded-lg  p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Digite o endereço de entrega" value={addressInput} onChange={(e) => setAdddressInput(e.target.value)} />
            <button className="bg-primary hover:bg-hover-default text-white px-3 py-2 rounded-lg flex items-center justify-center" onClick={getALocationByAddress} >
              <FaSearch />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center"
              title="Usar minha localização atual" onClick={getCurrentLocation}>
              <FaCrosshairs />
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full items-center justify-center">
              <MapContainer className={"w-full h-full"}   center={[location?.lat || -15.8267, location?.lon || -47.9218]}
                zoom={16}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker position={[location.lat, location.lon]} draggable eventHandlers={{ dragend: onDragEnd }} />
              </MapContainer>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Forma de Pagamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "cod" ? "border-primary bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`} onClick={() => setPaymentMethod("cod")}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <MdDeliveryDining className="text-green-600 text-xl" />
              </span>
              <div className="">
                <p className="font-medium text-gray-800">Pagar na entrega</p>
                <p className="text-xs text-gray-500">Pague quando sua encomenda chegar</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-primary bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`} onClick={() => setPaymentMethod("online")}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100"><FaMobileScreenButton className="text-purple-700 text-lg" /></span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100"><FaCreditCard className="text-blue-700 text-lg" /></span>
              <div>
                <p className="font-medium text-gray-800">Pagamento online</p>
                <p className="text-xs text-gray-500">pague usando cartão de crédito ou pix</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Resumo do pedido</h2>
          <div className="rounded-xl border border-border-default bg-gray-50 p-4 space-y-2">
            {cartItems.map((it) => (
              <div key={it.id} className="flex justify-between text-sm text-gray-700">
                <span>
                  {it.name} × {it.quantity}
                </span>
                <span>{formatadorBRL.format(it.price * it.quantity)}</span>
              </div>
            ))}
            <hr className="border-gray-200 my-2" />
            <div className="flex justify-between text-sm text-gray-700">
              <span>Frete</span>
              <span>{deliveryFee === 0 ? "Grátis": formatadorBRL.format(deliveryFee)}</span>
            </div>
             <div className="flex justify-between text-lg font-bold text-primary pt-2">
                <span>Total</span>
                <span>{formatadorBRL.format(total)}</span>
             </div>
          </div>
        </section>
          <button
          className="w-full bg-primary hover:bg-hover-default text-white py-3 rounded-xl font-semibold">
            {paymentMethod === "cod" ? "Criar pedido": "Criar pedido e pagar"  }
          </button>
      </div>
    </div>
  )
}

export default Checkout