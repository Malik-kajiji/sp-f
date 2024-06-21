import React, { useEffect, useState } from 'react'
import { IoIosClose, IoMdCart, IoMdClose } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/CartController'
import { alertActions } from '../redux/AlertController'
import { Link } from 'react-router-dom'

const Cart = () => {
    const dispatch = useDispatch()
    const { showen,items,totalPrice,isUserLoggedIn } = useSelector(state => state.cartController)
    const { token } = useSelector(state => state.userController)
    const { removeItem,toggleCart } = cartActions
    const { showWarrning } = alertActions

    const handleRemove = (groupId,period,_id) => {
        if(isUserLoggedIn){
            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/remove-item`,{
                method:'DELETE',
                body:JSON.stringify({groupId,periodIndex:period}),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(json => {
                    dispatch(removeItem(json.deletedItem))
                })
                .catch(err => dispatch(alertActions.showError({msg:err.message})))
        }else {
            dispatch(removeItem({_id}))
        }
    }

    return (
        <>
            <button className='show-cart-btn' onClick={()=>dispatch(toggleCart())}>
            <span className='icon TXT-heading'>{IoMdCart({})}</span>
            </button>
            <div className={`cart-ov ${showen && 'showen'}`}>
            <article className='cart'>
                <header className='cart-header'>
                    <h2 className='TXT-heading2 h-heading'>العربة</h2>
                    <span className='icon TXT-heading' onClick={()=>dispatch(toggleCart())}>
                        {IoIosClose({})}
                    </span>
                </header>
                <h2 className='TXT-heading2 c-heading'>العربة</h2>
                <img src="/images/line-image.png" alt="" className='line-img' />
                <ul className='items' role='list'>
                    <li className='heading TXT-heading3'>
                        <p className='txt-w1'>القناة</p>
                        <p className='txt-w2'>المدة</p>
                        <p className='txt-w3'>السعر</p>
                    </li>
                    {items.map((e,i)=><li className={`item TXT-normal ${(i === items.length - 1) && 'no-border'}`} key={i}>
                        <span className='delete-icon TXT-heading2' onClick={()=>handleRemove(e.groupId,e.period,e._id)}>
                            {MdDeleteOutline({})}
                        </span>
                        <div className='txt-w1 channel'>
                            <img src={e.groupImageUrl} alt="" />
                            <p className='name TXT-heading3'>
                                {e.name}
                            </p>
                            <p className='details'>
                                <span className='price TXT-normal'>
                                    {e.periodPrice}$
                                </span> 
                                <span className='period TXT-footer'>
                                    \ {e.isLifeTime ?
                                        'مدى الحياة'
                                        :
                                        `${e.periodName}`
                                    }
                                </span>
                            </p>
                        </div>
                        <p className='txt-w2'>
                            {e.isLifeTime ?
                                'مدى الحياة'
                                :
                                `${e.periodName}`
                            }
                        </p>
                        <p className='txt-w3'>
                            {e.periodPrice}$
                        </p>
                    </li>)
                    }
                </ul>
                <div className='line'></div>
                <div className='total TXT-heading3'>
                    <p className='t-h'>القيمة الإجمالية</p>
                    <p className='price'>{totalPrice} USDT</p>
                </div>
                {items.length > 0?
                    <Link to={'/payment'} onClick={()=>dispatch(toggleCart())}>
                        <button className='complete-btn TXT-heading3' >
                            إتمام الدفع
                        </button>
                    </Link>
                :
                    <button className='complete-btn TXT-heading3' onClick={()=>dispatch(showWarrning({msg:'لا توجد أي عناصر في العربة!'}))}>
                        إتمام الدفع
                    </button>
                }
            </article>
            </div>
        </>
    )
}

export default Cart