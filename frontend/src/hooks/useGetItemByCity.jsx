import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity } from '../redux/userSlice'
import axios from 'axios'

const useGetItemByCity = () => {
    const dispatch = useDispatch()
    const { city } = useSelector((state) => state.user)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/item/get-by-city/${city}`, { withCredentials: true })
                dispatch(setItemsInMyCity(res.data))
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [city])


}

export default useGetItemByCity