import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   location:{
    lat: null,
    lon: null
   },
   address: null
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setLocation: (state, action)=>{
      const {lat, lon } = action.payload
      state.location.lat = lat
      state.location.lon = lon
    },
    setMyAddress: (state, action)=>{
     state.address = action.payload
    }
  },
})

export const {setLocation, setMyAddress  } = mapSlice.actions

export default mapSlice.reducer