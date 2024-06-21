import { createSlice } from '@reduxjs/toolkit';

export const alertController = createSlice({
    name:'alertController',
    initialState:{msg:'', type:'', showen:false},
    reducers: {
        showSuccess(state,action){
            state.msg = action.payload.msg
            state.type = 'success'
            state.showen = true
        },
        showError(state,action){
            state.msg = action.payload.msg
            state.type = 'error'
            state.showen = true
        },
        showWarrning(state,action){
            state.msg = action.payload.msg
            state.type = 'warrning'
            state.showen = true
        },
        hideAlert(state,action){
            state.showen = false
        }
    }
})

export const alertActions = alertController.actions