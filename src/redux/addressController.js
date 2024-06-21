import { createSlice } from '@reduxjs/toolkit';

export const addressController = createSlice({
    name:'addressController',
    initialState:{walletId:'',qrCode:''},
    reducers: {
        setAddress(state,action){
            state.walletId = action.payload.walletId
            state.qrCode = action.payload.qrCode
        }
    }
})

export const addressActions = addressController.actions