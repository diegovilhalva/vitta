import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMyShopData } from "../redux/ownerSlice"


const useGetMyShop = () => {
    const dispatch = useDispatch()
     const { userData } = useSelector((state) => state.user)
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
    }, [userData])
}

export default useGetMyShop