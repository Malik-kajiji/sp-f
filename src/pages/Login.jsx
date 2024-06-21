import React, { useEffect, useState } from 'react'
import '../styles/login.scss'
import { useLogin } from '../hooks/useLogin'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Login = () => {
    const { isLoggedIn } = useSelector(state => state.userController)
    const navgate = useNavigate()
    const {pathname} = useLocation()
    const [isLoading,setIsLoading] = useState(false)

    const { signup,login,resetPassword } = useLogin()
    const [currentPage,setCurrentPage] = useState('login')
    const [pageToHide,setPageToHide] = useState('signup')
    const [loginForm,setLoginForm] = useState({phoneNumber:'',password:''})
    const [signUpForm,setSignUpForm] = useState({username:'',phoneNumber:'',password:'',confirmPassword:'',isChecked:false})
    const [isResetShowen,setIsResetShowen] = useState(false)
    const [resetPass,setResetPass] = useState('')

    const toggleReset = () => {
        setResetPass('')
        setIsResetShowen(prev => !prev)
    }

    const handleResetPassword = (e) => {
        e.preventDefault()
        resetPassword(resetPass)
    }
    
    const handleLoginChange = (e) => {
        const { name,value } = e.target
        setLoginForm(prev => ({...prev,[name]:value}))
    }

    const handleSignupChange = (e) => {
        const { name,value } = e.target
        if(name === 'agreement'){
            setSignUpForm(prev => ({...prev,isChecked:!prev.isChecked}))
        }else {
            setSignUpForm(prev => ({...prev,[name]:value}))
        }
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        const { phoneNumber,password } = loginForm
        login(phoneNumber,password,setIsLoading)
    }

    const handleSubmitSignup = (e) => {
        e.preventDefault()
        const { username,phoneNumber,password,confirmPassword,isChecked } = signUpForm
        signup(username,phoneNumber,password,confirmPassword,isChecked,setIsLoading)
    }

    const togglePage = () => {
        setLoginForm({phoneNumber:'',password:''})
        setSignUpForm({username:'',phoneNumber:'',password:'',confirmPassword:'',isChecked:false})
        setCurrentPage(prev => prev === 'login'?'signup':'login')
    }

    useEffect(()=>{
        if(isLoggedIn){
            navgate('/my-account')
        }
    },[pathname,isLoggedIn])


    useEffect(()=>{
        setTimeout(()=>{
            if(currentPage === 'login'){
                setPageToHide('signup')
            }else {
                setPageToHide('login')
            }
        },500)
    },[currentPage])

    return (
        <section className='login-page'>
            <article className='holder'>
                <div className={`forget-password-ov ${isResetShowen && 'showen'}`}>
                    <form className='forgot-pass-form' action="">
                        <input 
                            type="text"
                            className='phone-number TXT-normal'
                            placeholder='رقم الهاتف' 
                            value={resetPass}
                            onChange={(e)=>setResetPass(e.target.value)}
                        />
                        <button className='TXT-heading3' onClick={handleResetPassword}>إرسال</button>
                    </form>
                    <p className='close-txt TXT-footer' onClick={toggleReset}>إغلاق</p>
                </div>
                <div className={`slider ${currentPage} ${pageToHide === 'login'?'hide-login':'hide-signup'}`}>
                    <form action="" className='signup-from'>
                        <h2 className='form-heading TXT-heading'>حساب جديد</h2>
                        <p className='welcome-txt TXT-normal'>خطوتك الأولى نحو مجال التداول</p>
                        <input 
                            type="text"
                            className='name TXT-normal'
                            placeholder='الاسم'
                            name='username'
                            value={signUpForm.username}
                            onChange={handleSignupChange}
                        />
                        <input 
                            type="text"
                            className='phone-number TXT-normal'
                            placeholder='رقم الهاتف'
                            name='phoneNumber'
                            value={signUpForm.phoneNumber}
                            onChange={handleSignupChange}
                        />
                        <input 
                            type="password"
                            className='password TXT-normal'
                            placeholder='كلمة السر'
                            name='password'
                            value={signUpForm.password}
                            onChange={handleSignupChange}
                            autoComplete='off'
                        />
                        <input 
                            type="password"
                            className='passwordConfirm TXT-normal'
                            placeholder='تأكيد كلمة السر'
                            name='confirmPassword'
                            value={signUpForm.confirmPassword}
                            onChange={handleSignupChange}
                            autoComplete='off'
                        />
                        <div className='agreement'>
                            <input 
                                type='checkbox'
                                className='checkbox'
                                name='agreement'
                                onChange={handleSignupChange}
                            />
                            <p className='TXT-footer'>
                                بالإستمرار فأنت توافق على جميع <Link to={'/terms'}>الشروط و الأحكام</Link>
                            </p>
                        </div>
                        {isLoading?
                            <button className='login-btn loading-btn TXT-heading3' onClick={handleSubmitSignup}>
                                
                            </button>
                        :
                            <button className='login-btn TXT-heading3' onClick={handleSubmitSignup}>
                                انشاء حساب
                            </button>
                        }
                    </form>
                    <div className='switch-bg'>
                        <div className={`no-account ${currentPage === 'login' && 'showen'}`}>
                            <h2 className='switch-heading TXT-heading2'>ليس لديك حساب!</h2>
                            <p className='switch-txt TXT-normal'>قم بالإنضمام معنا الآن!</p>
                            <button className='switch-btn TXT-heading3' onClick={togglePage}>
                                إنشاء حساب
                            </button>
                        </div>
                        <div className={`no-account ${currentPage === 'signup' && 'showen'}`}>
                            <h2 className='switch-heading TXT-heading2'>لديك حساب بالفعل!</h2>
                            <p className='switch-txt TXT-normal'>قم بالدخول من هنا!</p>
                            <button className='switch-btn TXT-heading3' onClick={togglePage}>
                                تسجيل الدخول
                            </button>
                        </div>
                    </div>
                    <form className='login-from'>
                        <h2 className='form-heading TXT-heading'>تسجيل الدخول</h2>
                        <p className='welcome-txt TXT-normal'>مرحبا بعودتك 😊  </p>
                        <input 
                            type="text"
                            className='phone-number TXT-normal'
                            placeholder='رقم الهاتف'
                            name='phoneNumber'
                            value={loginForm.phoneNumber}
                            onChange={handleLoginChange}
                        />
                        <input 
                            type="password"
                            className='password TXT-normal'
                            placeholder='كلمة السر'
                            name='password'
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            autoComplete='off'
                        />
                        <p className='forgot-password TXT-footer' onClick={toggleReset}>
                            هل نسيت كلمة المرور؟
                        </p>
                        {isLoading?
                            <button className='login-btn loading-btn TXT-heading3' onClick={handleSubmitSignup}>
                                
                            </button>
                        :
                            <button className='login-btn TXT-heading3' onClick={handleSubmitLogin}>
                                تسجيل الدخول
                            </button>
                        }
                    </form>
                </div>
            </article>
        </section>
    )
}

export default Login