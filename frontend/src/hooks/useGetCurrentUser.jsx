import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"


const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (async() => {
           try {
             const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/current`,{
                withCredentials:true
            })
            dispatch(setUserData(res.data.user))
           } catch (error) {
            console.log(error)
           }
        })()
    },[])
}

export default useGetCurrentUser