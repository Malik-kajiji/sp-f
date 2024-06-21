import { createSlice } from '@reduxjs/toolkit';

export const cartController = createSlice({
    name:'cartController',
    initialState:{showen:false,items:[],isUserLoggedIn:false,totalPrice:0},
    reducers: {
        userLoggedIn(state,action){
            state.isUserLoggedIn = true
            state.items = action.payload
            
            let newTotalPrice = 0;
            state.items.forEach(e => {
                newTotalPrice+=parseInt(e.periodPrice)
            })

            state.totalPrice = newTotalPrice
        },
        userLoggedOut(state,action){
            state.isUserLoggedIn = false
            state.items = []
            state.totalPrice = 0
        },
        clearItems(state,action){
            state.items = []
            window.localStorage.setItem('cart',JSON.stringify([]))
            state.totalPrice = 0
        },
        toggleCart(state,action){
            state.showen = !state.showen
        },
        addItem(state,action){
            if(state.isUserLoggedIn){
                let newItems = [...state.items,action.payload]
                state.items = newItems
            } else {
                const sameG = state.items.filter(e => (e._id === action.payload._id)).length > 0
                const sameP = state.items.filter(e => (e.periodName === action.payload.periodName)).length > 0

                if(sameG && sameP){
                }else if(sameG){
                    let filteredCart = state.items.filter(e => e._id !== action.payload._id)
                    filteredCart.push(action.payload)
                    state.items = filteredCart
                }else {
                    let newItems = [...state.items,action.payload]
                    state.items = newItems
                }
                window.localStorage.setItem('cart',JSON.stringify(state.items))
            }

            let newTotalPrice = 0;
            state.items.forEach(e => {
                newTotalPrice+=parseInt(e.periodPrice)
            })

            state.totalPrice = newTotalPrice
        },
        switchPeriod(state,action){
            let newItems = state.items.map(e => {
                if(e.groupId === action.payload.groupId){
                    return action.payload
                }else {
                    return e
                }
            })

            state.items = newItems

            let newTotalPrice = 0;
            state.items.forEach(e => {
                newTotalPrice+=parseInt(e.periodPrice)
            })

            state.totalPrice = newTotalPrice
        },
        removeItem(state,action){
            if(state.isUserLoggedIn){
                let newItems = state.items.filter(e => (e.groupId !== action.payload.groupId && e.period !== action.payload.period))
                state.items = [...newItems]
            } else {
                let newItems = state.items.filter(e => e._id !== action.payload._id)
                state.items = [...newItems]

                window.localStorage.setItem('cart',JSON.stringify(newItems))
            }

            let newTotalPrice = 0;
            state.items.forEach(e => {
                newTotalPrice+=parseInt(e.periodPrice)
            })

            state.totalPrice = newTotalPrice
        },
        setItems(state,action){
            const items = JSON.parse(localStorage.getItem('cart'))
            if(items){
                state.items = [...items]
            }

            let newTotalPrice = 0;
            state.items.forEach(e => {
                newTotalPrice+=parseInt(e.periodPrice)
            })

            state.totalPrice = newTotalPrice
        }
    }
})

export const cartActions = cartController.actions