import React, { useState } from 'react'
import '../styles/resetPassword.scss'
import { useDispatch } from 'react-redux'
import { alertActions } from '../redux/AlertController'
import { useNavigate, useParams } from 'react-router-dom'


const ResetPassword = () => {
    const { _id } = useParams()
    const [inputVal,setInputVal] = useState('')
    const dispatch = useDispatch()
    const { showWarrning,showSuccess,showError } = alertActions
    const navigate = useNavigate()

    const handleClick = async () => {
        if(inputVal.length < 8){
            dispatch(showWarrning({msg:'تأكد من ادخال رمز لا يقل عن 8 أحرف'}))
        }else {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-account/reset-password`,{
                    method:'PUT',
                    body:JSON.stringify({_id,newPassword:inputVal}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if(res.ok){
                    const json = await res.json()
                    dispatch(showSuccess({msg:json.message}))
                    navigate('/')
                }else {
                    dispatch(showError({msg:'خطأ أثناء عملية تجديد كلمة المرور!'}))
                }
            }catch(err){
                dispatch(showError({msg:err.message}))
            }
        }
    }
    return (
        <section className='reset-pass'>
            <input 
                type="text" 
                value={inputVal}
                onChange={(e)=>setInputVal(e.target.value)}
                placeholder='ادخل الرمز الجديد'
                className='TXT-normal'
            />
            <button className='save-btn TXT-heading3' onClick={handleClick}>
                حفظ
            </button>
        </section>
    )
}

export default ResetPassword