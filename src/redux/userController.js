import { createSlice } from '@reduxjs/toolkit';

export const userController = createSlice({
    name:'userController',
    initialState:{isLoggedIn:false,token:null,userName:'',phoneNumber:'',isVerified:false,code:''},
    reducers: {
        userLoggedIn(state,action){
            const { token,userName,phoneNumber,isVerified,code } = action.payload
            state.isLoggedIn = true
            state.token = token
            state.userName = userName
            state.phoneNumber = phoneNumber
            state.isVerified = isVerified
            state.code = code
        },
        userLoggedOut(state,action){
            state.isLoggedIn = false
            state.token = null
            state.userName = ''
            state.phoneNumber = ''
            state.isVerified = false
            state.code = ''
        },
    }
})

export const userActions = userController.actions