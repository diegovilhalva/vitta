import { FaMapMarkerAlt, FaSearch } from "react-icons/fa"
import { FaCrosshairs } from "react-icons/fa6"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import { useDispatch, useSelector } from "react-redux"
import "leaflet/dist/leaflet.css"
import { setLocation, setMyAddress } from "../redux/mapSlice"
import axios from "axios"

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
  const { location, address:myAddress } = useSelector((state) => state.map)

  const onDragEnd = async (e) => {
    
    const { lat, lng } = e.target._latlng
    dispatch(setLocation({ lat, lon: lng }))
    getAddressByLatLng(lat, lng)

  }

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&lang=pt&apiKey=${apiKey}`)
      console.log(res.data.results[0].formatted)
      setMyAddress(res.data.results[0].formatted)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(myAddress)
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
            <input type="text" className="flex-1 border border-gray-300 rounded-lg  p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Digite o endereço de entrega" value={myAddress} />
            <button className="bg-primary hover:bg-hover-default text-white px-3 py-2 rounded-lg flex items-center justify-center">
              <FaSearch />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center"
              title="Usar minha localização atual">
              <FaCrosshairs />
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full items-center justify-center">
              <MapContainer className={"w-full h-full"} center={[location?.lat, location?.lon]}
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
      </div>


    </div>
  )
}

export default Checkout