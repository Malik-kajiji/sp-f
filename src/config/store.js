import { alertController } from '../redux/AlertController';
import { cartController } from '../redux/CartController';
import { userController } from '../redux/userController';
import { subsController } from '../redux/subsController';
import { addressController } from '../redux/addressController';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer:{
        [alertController.name]:alertController.reducer,
        [cartController.name]:cartController.reducer,
        [userController.name]:userController.reducer,
        [subsController.name]:subsController.reducer,
        [addressController.name]:addressController.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});