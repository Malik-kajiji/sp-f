import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { MdContentCopy } from "react-icons/md";
import { FaTelegramPlane,FaRegCheckCircle } from "react-icons/fa";
import { alertActions } from '../redux/AlertController'
import {useLogin} from '../hooks/useLogin'
import { cartActions } from '../redux/CartController';


export const NotVerifiedPay = () => {
    const address = useSelector(state => state.addressController)
    const dispatch = useDispatch()
    const { token,code } = useSelector(state => state.userController)
    const { isUserVerified,setData } = useLogin()
    const { showError,showSuccess,showWarrning } = alertActions
    const { items,totalPrice } = useSelector(state => state.cartController)
    const [currentForm,setCurrentFrom] = useState(0)
    const [walletInput,setWalletInput] = useState('')
    const navigate = useNavigate()


    const handleCopy = (code) => {
        navigator.clipboard.writeText(`/link ${code}`)
        .then(() => {
            dispatch(showSuccess({msg:'تم نسخ الكود بنجاح!'}))
        })
        .catch((error) => {
            dispatch(showError({msg:error}))
        });
    }

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(`${address.walletId}`)
        .then(() => {
            dispatch(showSuccess({msg:'تم نسخ عنوان المحفظة بنجاح!'}))
        })
        .catch((error) => {
            dispatch(showError({msg:error}))
        });
    }

    const handleCompleted = async (addedItems,totalPrice,walletId,token) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/place-order`,{
                method:'POST',
                body:JSON.stringify({addedItems,totalPrice,walletId}),
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
                dispatch(showSuccess({msg:'تم إستلام طلبك بنجاح!'}))
                setCurrentFrom(prev => prev + 1)
                setTimeout(()=>{
                    setData()
                    navigate('/')
                },4000)
            }
        }catch(err) {
            dispatch(showError({msg:err.message}))
        }
    }

    const handleMoveToNext = (e,to) => {
        e.preventDefault();
        if(to === 'verification'){
            setCurrentFrom(1)
        }else if(to === 'payment-info') {
            isUserVerified(token,setCurrentFrom)
        }else {
            if (walletInput.length === 0) {
                dispatch(showWarrning({msg:'تأكد من ادخال عنوان محفظة صالح'}))
            } else {
                handleCompleted(items,totalPrice,walletInput,token)
            }
        }
    }
    return (
        <article className='not-logged-in'>
            <div className='slider' style={{'--d':currentForm}}>
                <form className='cart'>
                    <h2 className='heading TXT-heading'>القنوات</h2>
                    <img className='line-image' src="/images/line-image.png" alt="" />
                    <ul className='channels' role='list'>
                        {items.map((e,i)=><li className='channel' key={i}>
                            <div className='name'>
                                <img src={e.groupImageUrl} alt="" />
                                <h2 className='TXT-heading3'>{e.name}</h2>
                            </div>
                            <p className='TXT-normal period'>
                                {e.periodName}
                            </p>
                            <p className='TXT-normal price'>
                                {e.periodPrice}$
                            </p>
                        </li>)
                        }
                    </ul>
                    <div className='total-price'>
                        <p className='TXT-heading3'>
                            القيمة الإجماية
                        </p>
                        <span className='TXT-heading3'>
                            {`${totalPrice} USDT`} 
                        </span>
                    </div>
                    <button className='next-btn TXT-heading2' onClick={(e)=>handleMoveToNext(e,'verification')}>
                        التالي
                    </button>
                </form>
                <form className='verification'>
                    <h2 className='heading TXT-heading'>التحقق</h2>
                    <img className='line-image' src="/images/line-image.png" alt="" />
                    <p className='TXT-normal exp-txt'>الرجاء اتمام عملية التحقق كما هو موضح</p>
                    <div className='code' onClick={()=>handleCopy(code)}>
                        <span className='TXT-heading2'>{MdContentCopy({})}</span>
                        <p className='TXT-normal' dir='ltr'>
                            {`/link ${code}`}
                        </p>
                    </div>
                    <a href={`${process.env.REACT_APP_BOT_URL}`} target='_blank' className='telegram-icon'>
                        {FaTelegramPlane({})}
                    </a>
                    <img src='/images/exp-video.gif' className='gif-video TXT-heading2' />
                    <button className='next-btn TXT-heading2' onClick={(e)=>handleMoveToNext(e,'payment-info')}>
                        تم التحقق!
                    </button>
                </form>
                <form className='payment-info'>
                    <h2 className='heading TXT-heading'>الدفع</h2>
                    <img className='line-image' src="/images/line-image.png" alt="" />
                    <p className='TXT-normal exp-txt'>
                        الرجاء تحويل مبلغ
                        <b className='TXT-heading3' dir='ltr'> ( {totalPrice} USDT ) </b>
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
    )
}