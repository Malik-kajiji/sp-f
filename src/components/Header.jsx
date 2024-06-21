import React, { useState } from 'react'
import { IoMdMenu,IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Header = () => {
    const { isLoggedIn } = useSelector(state => state.userController)
    const [isShowen,setIsShowen] = useState(false);
    return (
        <>
            <div className={`header-gap ${isShowen && 'gap-showen'}`}></div>
            <header className={`main-header ${isShowen && 'list-showen'}`}>
                <nav className={`holder`}>
                    <div className='logo'>
                        <img src="/images/space-tech-logo.png" alt="" className='logo-image' />
                        <h2 className='logo-txt TXT-heading3'>SPACE TECH</h2>
                    </div>
                    {isShowen?
                        <span className='menu-icon' onClick={()=>setIsShowen(false)}>{IoMdClose({})}</span>
                    :
                        <span className='menu-icon' onClick={()=>setIsShowen(true)}>{IoMdMenu({})}</span>
                    }
                    {isLoggedIn?
                        <ul className={`tabs-list ${!isShowen && 'hide'}`} role='list' onClick={()=>setIsShowen(false)}>
                            <li>
                                <Link to={'/'}>
                                    <p className='TXT-heading3'>
                                        الرئيسية
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <a href="/#section4">
                                    <p className='TXT-heading3'>
                                        القنوات
                                    </p>
                                </a>
                            </li>
                            <li>
                                <Link to={'/my-account'}>
                                    <p className='TXT-heading3'>
                                        حسابي
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <a href={'/#footer'}>
                                    <p className='TXT-heading3'>
                                        التواصل
                                    </p>
                                </a>
                            </li>
                        </ul>
                    :
                        <ul className={`tabs-list ${!isShowen && 'hide'}`} role='list' onClick={()=>setIsShowen(false)}>
                            <li>
                                <Link to={'/'}>
                                    <p className='TXT-heading3'>
                                        الرئيسية
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <a href="#section4">
                                    <p className='TXT-heading3'>
                                        القنوات
                                    </p>
                                </a>
                            </li>
                            <li>
                                <a href={'#footer'}>
                                    <p className='TXT-heading3'>
                                        التواصل
                                    </p>
                                </a>
                            </li>
                            <li className='btn-li'>
                                <Link to={'/login'}>
                                    <button>
                                        <p className='TXT-heading3'>تسجيل الدخول</p>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    }
                </nav>
            </header>
        </>
    )
}

export default Header
