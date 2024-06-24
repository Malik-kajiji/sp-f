import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { MdContentCopy } from "react-icons/md";
import { FaTelegramPlane,FaRegCheckCircle } from "react-icons/fa";
import { alertActions } from '../redux/AlertController'
import {useLogin} from '../hooks/useLogin'


export const NotLoggedIn = () => {
    const address = useSelector(state => state.addressController)
    const dispatch = useDispatch()
    const [userData,setUserData] = useState(null)
    const { paymentSignup,isUserVerified,setData } = useLogin()
    const { showError,showSuccess,showWarrning } = alertActions
    const { items,totalPrice } = useSelector(state => state.cartController)
    const [currentForm,setCurrentFrom] = useState(0)
    const [createAccData,setcreateAccData] = useState({name:'',phoneNumber:'',password:'',agreement:false})
    const [walletInput,setWalletInput] = useState('')
    const navigate = useNavigate()

    const handleChangeCreateAcc = (e) => {
        const { name,value } = e.target
        if(name === 'agreement'){
            setcreateAccData(prev => ({...prev,agreement:!prev.agreement}))
        }else {
            setcreateAccData(prev => ({...prev,[name]:value}))
        }
    }

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
                setCurrentFrom(4)
                setTimeout(()=>{
                    setData()
                    navigate('/')
                },4000)
                // const { isVerified,token,code } = json
                // localStorage.setItem('token',token)
                // dispatch(showSuccess({msg:'تم إنشاء حساب بنجاح'}))
                // dispatch(cartUserLoggedIn([]))
                // dispatch(userLoggedIn({token,userName,phoneNumber,isVerified,code}))
            }
        }catch(err) {
            dispatch(showError({msg:err.message}))
        }
    }

    const handleMoveToNext = (e,to) => {
        e.preventDefault();
        if(to === 'create-acc'){
            setCurrentFrom(1)
        }else if(to === 'verification') {
            const { name,phoneNumber,password,agreement } = createAccData
            paymentSignup(name,phoneNumber,password,agreement,setCurrentFrom,setUserData)
        }else if(to === 'payment-info') {
            const { token } = userData
            isUserVerified(token,setCurrentFrom)
        }else {
            if (walletInput.length === 0) {
                dispatch(showWarrning({msg:'تأكد من ادخال عنوان محفظة صالح'}))
            } else {
                handleCompleted(items,totalPrice,walletInput,userData?.token)
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
                    <button className='next-btn TXT-heading2' onClick={(e)=>handleMoveToNext(e,'create-acc')}>
                        التالي
                    </button>
                </form>
                <form className='creat-account'>
                    <h2 className='heading TXT-heading'>إنشاء حساب</h2>
                    <img className='line-image' src="/images/line-image.png" alt="" />
                    <input 
                        className='acc-input TXT-normal'
                        type="text"
                        name='name'
                        value={createAccData.name}
                        onChange={handleChangeCreateAcc}
                        placeholder='الاسم'
                    />
                    <input 
                        className='acc-input TXT-normal'
                        type="text"
                        name='phoneNumber'
                        value={createAccData.phoneNumber}
                        onChange={handleChangeCreateAcc}
                        placeholder='الرقم'
                    />
                    <input 
                        className='acc-input TXT-normal'
                        type="text"
                        name='password'
                        value={createAccData.password}
                        onChange={handleChangeCreateAcc}
                        placeholder='الرمز'
                    />
                    <div className='agreement'>
                        <input 
                            type="checkbox"
                            name='agreement'
                            className='check'
                            onChange={handleChangeCreateAcc}
                        />
                        <p className='TXT-footer'>
                            بالإستمرار فأنت توافق على جميع <Link to={'/'}>
                            شروط و أحكام المنصة
                            </Link>
                        </p>
                    </div>
                    <button className='next-btn TXT-heading2' onClick={(e)=>handleMoveToNext(e,'verification')}>
                        الاستمرار
                    </button>
                </form>
                <form className='verification'>
                    <h2 className='heading TXT-heading'>التحقق</h2>
                    <img className='line-image' src="/images/line-image.png" alt="" />
                    <p className='TXT-normal exp-txt'>الرجاء اتمام عملية التحقق كما هو موضح</p>
                    <div className='code' onClick={()=>handleCopy(userData?.code)}>
                        <span className='TXT-heading2'>{MdContentCopy({})}</span>
                        <p className='TXT-normal' dir='ltr'>
                            {`/link ${userData?.code}`}
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