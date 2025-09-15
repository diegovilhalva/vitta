import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        city: null,
        state: null,
        address: null,
        shopsInMyCity: null,
        itemsInMyCity: null,
        cartItems: [],
        totalAmount: 0
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setState: (state, action) => {
            state.state = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setShopsInMyCity: (state, action) => {
            state.shopsInMyCity = action.payload;
        },
        setItemsInMyCity: (state, action) => {
            state.itemsInMyCity = action.payload;
        },
        addToCart: (state, action) => {
            const cartItem = action.payload
            const existing = state.cartItems.some((i) => i.id === cartItem.id)
            if (existing) {
                existing.quantity += cartItem.quantity
            } else {
                state.cartItems.push(cartItem)
            }

            state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.cartItems.find(i => i.id === id)
            if (item) {
                item.quantity = quantity;
            }

            state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
            state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        }
    }
})

export const { setUserData, setCity, setState, setAddress, setShopsInMyCity, setItemsInMyCity, addToCart,updateQuantity,removeFromCart } = userSlice.actions

export default userSlice.reducer