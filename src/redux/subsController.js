import { createSlice } from '@reduxjs/toolkit';

export const subsController = createSlice({
    name:'subsController',
    initialState:{subs:[]},
    reducers: {
        setSubs(state,action){
            state.subs = action.payload
        }
    }
})

export const subsActions = subsController.actions