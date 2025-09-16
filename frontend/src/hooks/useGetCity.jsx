import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAddress, setCity, setState } from "../redux/userSlice"
import { toast } from "sonner"
import { setLocation, setMyAddress } from "../redux/mapSlice"


const useGetCity = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)
    const apiKey = import.meta.env.VITE_GEOAPIFY_KEY

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            dispatch(setLocation({lat:latitude,lon:longitude}))
            const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&lang=pt&apiKey=${apiKey}`)
            console.log(res.data.results[0])
            const result = res.data?.results?.[0];

            dispatch(setCity(res.data?.results[0]?.city))
            dispatch(setState(res.data?.results[0]?.state))
            const street = result.street || "";
            const number = result.housenumber || "";
            const formattedAddress = `${street} ${number}`.trim();

            dispatch(setAddress(formattedAddress || result.formatted));
            dispatch(setMyAddress(formattedAddress || result.formatted))
        },
            (error) => {
                console.error(error);
                toast.error("Não foi possível acessar sua localização. Preencha os campos manualmente.");
            })
    }, [userData])
}

export default useGetCity