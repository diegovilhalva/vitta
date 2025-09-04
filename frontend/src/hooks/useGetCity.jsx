import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCity } from "../redux/userSlice"


const useGetCity = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector((state) => state.user) 
    const apiKey = import.meta.env.VITE_GEOAPIFY_KEY

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const res = await axios.get( `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&lang=pt&apiKey=${apiKey}`)
            dispatch(setCity(res.data?.results[0]?.city))
            
        })
    }, [userData])
}

export default useGetCity