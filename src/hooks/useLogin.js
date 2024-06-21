import { useEffect } from "react";
import { alertActions } from '../redux/AlertController'
import { useDispatch } from 'react-redux'
import { userActions } from "../redux/userController";
import { cartActions } from "../redux/CartController";
import { subsActions } from '../redux/subsController'

export const useLogin = () => {
    const dispatch = useDispatch()
    const { showWarrning,showSuccess,showError } = alertActions
    const { userLoggedIn:cartUserLoggedIn,userLoggedOut:cartUserLoggedOut } = cartActions
    const { userLoggedIn,userLoggedOut } = userActions
    const { setSubs } = subsActions

    const login = async (phoneNumber,password,setIsLoading) => {
        if(phoneNumber.length < 8){
            dispatch(showWarrning({msg:'قم بادخال رقم صالح'}))
        }else if(password.length < 8){
            dispatch(showWarrning({msg:'قم بادخال رمز لا يقل عن 8 أحرف'}))
        }else {
            setIsLoading(true)
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-account/login`,{
                    method:'POST',
                    body:JSON.stringify({phoneNumber,password}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if(res.status === 401){
                    dispatch(cartUserLoggedOut())
                }
                if(!res.ok){
                    const msg = await res.json()
                    dispatch(showError({msg:msg.message}))
                }else {
                    const json = await res.json()
                    const { userName,isVerified,token,cartItems,code } = json
                    localStorage.setItem('token',token)
                    dispatch(showSuccess({msg:'تم تسجيل الدخول بنجاح'}))
                    dispatch(cartUserLoggedIn(cartItems))
                    dispatch(userLoggedIn({token,userName,phoneNumber,isVerified,code}))
                }
            }catch(err) {
                dispatch(showError({msg:err.message}))
            }
            setIsLoading(false)
        }
    }

    const signup = async (userName,phoneNumber,password,confirmPassword,isChecked,setIsLoading) => {
        if(userName === ''){
            dispatch(showWarrning({msg:'قم بادخال اسم المستخدم'}))
        }else if(phoneNumber.length < 8){
            dispatch(showWarrning({msg:'قم بادخال رقم صالح'}))
        }else if(password.length < 8){
            dispatch(showWarrning({msg:'قم بادخال رمز لا يقل عن 8 أحرف'}))
        }else if(password !== confirmPassword){
            dispatch(showWarrning({msg:'تأكد من تطابق كلمة العبور'}))
        }else if(!isChecked){
            dispatch(showWarrning({msg:'تأكد من الموافقة على الشروط و الأحكام'}))
        } else {
            setIsLoading(true)
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-account/signup`,{
                    method:'POST',
                    body:JSON.stringify({userName,phoneNumber,password}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if(!res.ok){
                    const msg = await res.json()
                    dispatch(showError({msg:msg.message}))
                }else {
                    const json = await res.json()
                    const { isVerified,token,code } = json
                    localStorage.setItem('token',token)
                    dispatch(showSuccess({msg:'تم إنشاء حساب بنجاح'}))
                    dispatch(cartUserLoggedIn([]))
                    dispatch(userLoggedIn({token,userName,phoneNumber,isVerified,code}))
                }
            }catch(err) {
                dispatch(showError({msg:err.message}))
            }
            setIsLoading(false)
        }
    }

    const paymentSignup = async (userName,phoneNumber,password,isChecked,setCurrentForm,setUserData) => {
        if(userName === ''){
            dispatch(showWarrning({msg:'قم بادخال اسم المستخدم'}))
        }else if(phoneNumber.length < 8){
            dispatch(showWarrning({msg:'قم بادخال رقم صالح'}))
        }else if(password.length < 8){
            dispatch(showWarrning({msg:'قم بادخال رمز لا يقل عن 8 أحرف'}))
        }else if(!isChecked){
            dispatch(showWarrning({msg:'تأكد من الموافقة على الشروط و الأحكام'}))
        } else {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-account/signup`,{
                    method:'POST',
                    body:JSON.stringify({userName,phoneNumber,password}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if(!res.ok){
                    const msg = await res.json()
                    dispatch(showError({msg:msg.message}))
                }else {
                    const json = await res.json()
                    const { isVerified,token,code } = json
                    localStorage.setItem('token',token)
                    dispatch(showSuccess({msg:'تم إنشاء حساب بنجاح'}))
                    setUserData({token,userName,phoneNumber,isVerified,code})
                    // dispatch(userLoggedIn({token,userName,phoneNumber,isVerified,code}))
                    setCurrentForm(2)
                }
            }catch(err) {
                dispatch(showError({msg:err.message}))
            }
        }
    }

    const isUserVerified = async (token,setCurrentForm) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-account/is-user-verified`,{
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`
                }
            })
            if(!res.ok){
                const msg = await res.json()
                dispatch(showError({msg:msg.message}))
            }else {
                const json = await res.json()
                const { isVerified } = json
                if(isVerified){
                    dispatch(showSuccess({msg:'تم التحقق بنجاح'}))
                    setCurrentForm(prev => prev + 1)
                }else {
                    dispatch(showWarrning({msg:'لم تتم عملية التحقق'}))
                }
            }
        }catch(err) {
            dispatch(showError({msg:err.message}))
        }
    }

    const resetPassword = async (phoneNumber) => {
        if(phoneNumber.length < 8){
            dispatch(showWarrning({msg:'قم بادخال رقم صالح'}))
        }else {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-account/send-reset-link`,{
                    method:'POST',
                    body:JSON.stringify({phoneNumber}),
                    headers: {
                        'Content-Type': 'application/json',
                        
                    }
                })
                if(!res.ok){
                    const msg = await res.json()
                    dispatch(showError({msg:msg.message}))
                }else {
                    dispatch(showSuccess({msg:'تم إرسال رابط التجديد على التيليجرام!'}))
                }
            }catch(err) {
                dispatch(showError({msg:err.message}))
            }
        }
    }

    const setData = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token){
                return
            }
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-account/get-data`,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`
                }
            })
            if(res.status === 401){
                logOut()
            }
            if(!res.ok){
                const msg = await res.json()
                dispatch(showError({msg:msg.message}))
            }else {
                const json = await res.json()
                const { userName,phoneNumber,isVerified,cartItems,code,subs } = json
                dispatch(userLoggedIn({token,userName,phoneNumber,isVerified,code}))
                dispatch(cartUserLoggedIn(cartItems))
                dispatch(setSubs(subs))
            }
        }catch(err){
            dispatch(showError({msg:err.message}))
        }
    }

    const logOut = async () => {
        localStorage.removeItem('token')
        dispatch(userLoggedOut())
        dispatch(cartUserLoggedOut())
    }
    return {login,signup,setData,logOut,resetPassword,paymentSignup,isUserVerified}
}