import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/payment.scss'
import { IoIosArrowBack } from "react-icons/io";
import { NotLoggedIn } from '../components/NotLoggedIn';
import { Link } from 'react-router-dom';
import { NotVerifiedPay } from '../components/NotVerifiedPay';
import { VerifiedPay } from '../components/VerifiedPay';


const PaymentPage = () => {
    const { isLoggedIn,isVerified } = useSelector(state => state.userController)
    

    return (
        <section className='payment'>
            <Link to={'/'}>
                <button className='exit-btn'>
                    <p className='txt TXT-heading2'>
                        الخروج
                    </p>
                    <span className='icon TXT-heading'>
                        {IoIosArrowBack({})}
                    </span>
                </button>
            </Link>
            {/* <img className='bg-image' src="/images/Group.png" alt="" /> */}
            <img className='bg-image' src="/images/dark-logo.png" alt="" />
            {!isLoggedIn && <NotLoggedIn />}
            {(isLoggedIn && !isVerified) && <NotVerifiedPay />}
            {isVerified && <VerifiedPay />}
        </section>
    )
}

export default PaymentPage