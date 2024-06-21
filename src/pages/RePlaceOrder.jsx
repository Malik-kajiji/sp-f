import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { MdContentCopy } from "react-icons/md";
import { FaTelegramPlane,FaRegCheckCircle } from "react-icons/fa";
import { alertActions } from '../redux/AlertController'
import {useLogin} from '../hooks/useLogin'
import { useParams } from 'react-router-dom'
import '../styles/payment.scss'
import { useEffect } from 'react';

const RePlaceOrder = () => {
    const address = useSelector(state => state.addressController)
    const dispatch = useDispatch()
    const [order,setOrder] = useState(null)
    const { _id } = useParams()
    const { showError,showSuccess,showWarrning } = alertActions
    const [currentForm,setCurrentFrom] = useState(0)
    const [walletInput,setWalletInput] = useState('')
    const navigate = useNavigate()

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(`${address.walletId}`)
        .then(() => {
            dispatch(showSuccess({msg:'تم نسخ عنوان المحفظة بنجاح!'}))
        })
        .catch((error) => {
            dispatch(showError({msg:error}))
        });
    }

    const handleCompleted = async (walletId) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/re-place-order`,{
                method:'PUT',
                body:JSON.stringify({_id,walletId}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(!res.ok){
                const msg = await res.json()
                dispatch(showError({msg:msg.message}))
            }else {
                const json = await res.json()
                dispatch(showSuccess({msg:'تم إستلام طلبك بنجاح!'}))
                setCurrentFrom(prev => prev + 1)
                setTimeout(()=>{
                    navigate('/')
                },4000)
            }
        }catch(err) {
            dispatch(showError({msg:err.message}))
        }
    }

    const handleMoveToNext = (e) => {
        e.preventDefault();
        if (walletInput.length < 12) {
            dispatch(showWarrning({msg:'تأكد من ادخال عنوان محفظة صالح'}))
        } else {
            handleCompleted(walletInput)
        }
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-order/${_id}`)
                if(!res.ok){
                    const msg = await res.json()
                    dispatch(showError({msg:msg.message}))
                }else {
                    const json = await res.json()
                    setOrder(json.order)
                }
            }catch(err) {
                dispatch(showError({msg:err.message}))
            }
        }
        getData()
    },[])
    return (
        <section className='payment'>
            <img className='bg-image' src="/images/dark-logo.png" alt="" />
            <article className='not-logged-in'>
                <div className='slider' style={{'--d':currentForm}}>
                    <form className='payment-info'>
                        <h2 className='heading TXT-heading'>الدفع</h2>
                        <img className='line-image' src="/images/line-image.png" alt="" />
                        <p className='TXT-normal exp-txt'>
                            الرجاء تحويل مبلغ
                            <b className='TXT-heading3' dir='ltr'> ( {order?.totalPrice - order?.firstPayment} USDT ) </b>
                            إلى المحفظة الآتية
                        </p>
                        <div className='address' onClick={handleCopyAddress}>
                            <span className='TXT-heading2'>{MdContentCopy({})}</span>
                            <p className='TXT-footer' dir='ltr'>{address.walletId}</p>
                        </div>
                        <h2 className='TXT-heading2 or-txt'>أو</h2>
                        <img className='qr-code-image' src={address.qrCode} alt="" />
                        <input 
                            className='wallet-address TXT-normal' 
                            placeholder='عوان المحفظة الخاص بك!' 
                            type="text" 
                            value={walletInput}
                            onChange={(e)=>setWalletInput(e.target.value)}
                        />
                        <button className='next-btn TXT-heading2' onClick={(e)=>handleMoveToNext(e,'completed')}>
                            تم الدفع!
                        </button>
                    </form>
                    <div className='complete-message'>
                        <h2 className='heading TXT-heading'>الانتهاء</h2>
                        <img className='line-image' src="/images/line-image.png" alt="" />
                        <span className='icon'>
                            {FaRegCheckCircle({})}
                        </span>
                        <h2 className='TXT-heading done-txt'>
                            تم استلام طلبك بنجاح!
                        </h2>
                        <p className='TXT-normal'>
                            تأخذ عملية التحقق مالا يزيد عن 24 ساعة!
                        </p>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default RePlaceOrder