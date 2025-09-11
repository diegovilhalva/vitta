
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setShopsInMyCity } from "../redux/userSlice"

const useGetShopByCity = () => {
    const dispatch = useDispatch()
    const { city} = useSelector((state) => state.user)
    
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shop/get-by-city/${city}`, { withCredentials: true })
                dispatch(setShopsInMyCity(res.data))
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [city])
}

export default useGetShopByCity