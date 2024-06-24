import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound = ({setShowHeader,setShowCart}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        setShowHeader(false)
        setShowCart(false)
        setTimeout(()=>{
            navigate('/')
        },2500)
    },[])
    return (
        <div style={{width:'100%',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img src="/images/not-found.png" alt="" />
            <h1 className='TXT-heading'>
                غير موجود
            </h1>
        </div>
    )
}
