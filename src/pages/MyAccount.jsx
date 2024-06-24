import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import '../styles/myAccount.scss'
import { BiErrorCircle } from 'react-icons/bi'
import { MdContentCopy } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { alertActions } from '../redux/AlertController'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from 'react'
import { SubsComp } from '../components'
import { CiLogout } from "react-icons/ci";





const MyAccount = () => {
  const dispatch = useDispatch()
  const { showSuccess,showError } = alertActions
  const { code,isVerified,isLoggedIn,userName } = useSelector(state => state.userController)
  const navgate = useNavigate()
  const {pathname} = useLocation()
  const { logOut } = useLogin()
  const subs = useSelector(state => state.subsController.subs)


  const handleCopy = () => {
    navigator.clipboard.writeText(`/link ${code}`)
    .then(() => {
      dispatch(showSuccess({msg:'تم نسخ الكود بنجاح!'}))
    })
    .catch((error) => {
      dispatch(showError({msg:error}))
    });
  }

  useEffect(()=>{
    if(!isLoggedIn){
      navgate('/login')
    }
},[pathname,isLoggedIn])
  return (
    <section className='my-account'>
      <header className='my-acc-header'>
        <div className='container header-container'>
          <ul className='holder' role='list'>
            <li className='user-image'></li>
            <li className='user-name TXT-heading3'>
              {userName}
            </li>
          </ul>
          <span className='logout-icon--5 TXT-heading' onClick={()=>logOut()}>
            {CiLogout({})}
          </span>
        </div>
      </header>
      {!isVerified ?
      <div className='container verify-container'>
        <article className='holder'>
          <p className='warrning-txt TXT-normal'>
            <span className='TXT-heading2'>{BiErrorCircle({})}</span>
            الرجاء اتمام عملية التحقق من رقم التيليجرام للإستفادة الكاملة من المنصة !
          </p>
          <div className='code-holder'>
            <p className='code TXT-heading3' onClick={handleCopy}>
              <span className='TXT-heading2'>{MdContentCopy({})}</span>
              link {code}/ 
            </p>
            <p className='txt-to-explain TXT-normal'>
              قم بنسخ الكود ثم توجه الى التيليجرام
            </p>
            <a href={`${process.env.REACT_APP_BOT_URL}`} target='_blank' className='telegram-icon TXT-heading2'>
              {FaTelegramPlane({})}
            </a>
          </div>
          <img src='/images/exp-video.gif' className='gif-explain TXT-heading2' />
        </article>
      </div>
      :
      <div className='container subs-container'>
        <article className='my-subs'>
          <h2 className='my-subs-heading TXT-heading'>اشتراكاتي</h2>
          <img className='line-image' src="/images/line-image.png" alt="" />
          {subs.length === 0 ?
            <div className='no-subs'>
              <h2 className='TXT-heading'>لا توجد أي اشتراكات سابقة</h2>
            </div>
          :
            <ul className='list' role='list'>
              <li className='heading'>
                <p className='TXT-heading2 name'>القناة</p>
                <p className='TXT-heading2 left-time-heading'>المدة المتبقية</p>
                <p className='TXT-heading2 state-heading'>حالة القناة</p>
              </li>
              {subs.map((e,i)=><SubsComp e={e} i={i}/>)}
            </ul>
          }
        </article>
      </div>
      }
    </section>
  )
}

export default MyAccount