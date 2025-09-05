import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setMyShopData } from "../redux/ownerSlice"


const useGetMyShop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shop/my-shop`,{
                    withCredentials:true
                })
                dispatch(setMyShopData(res.data))

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
}

export default useGetMyShop