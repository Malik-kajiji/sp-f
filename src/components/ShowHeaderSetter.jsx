import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { useSelector,useDispatch } from 'react-redux'
import { alertActions } from '../redux/AlertController'
import { addressActions } from '../redux/addressController'

const ShowHeaderSetter = ({setShowHeader,setShowCart}) => {
    const { setData } = useLogin()
    const {pathname} = useLocation()
    const { showError,showSuccess,showWarrning } = alertActions
    const { setAddress } = addressActions
    const dispatch = useDispatch()

    useEffect(()=>{
        if(pathname.startsWith('/group/') || pathname.startsWith('/payment') || pathname.startsWith('/terms')|| pathname.startsWith('/reset/')|| pathname.startsWith('/complete-payment/')){
            setShowHeader(false)
        }else {
            setShowHeader(true)
        }
        if(pathname.startsWith('/login') || pathname.startsWith('/payment') || pathname.startsWith('/terms')|| pathname.startsWith('/reset/')|| pathname.startsWith('/complete-payment/')){
            setShowCart(false)
        }else {
            setShowCart(true)
        }
    },[pathname])
    useEffect(()=>{
        setData()
        const setAddressFn = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/home-page/get-address`)
                if(!res.ok){
                    const msg = await res.json()
                    dispatch(showError({msg:msg.message}))
                }else {
                    const json = await res.json()
                    const { walletId,qrCode } = json.address
                    dispatch(setAddress({walletId,qrCode}))
                }
            }catch(err) {
                dispatch(showError({msg:err.message}))
            }
        }
        setAddressFn()
    },[])
    return (
        <></>
    )
}

export default ShowHeaderSetter