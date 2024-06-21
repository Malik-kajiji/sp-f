import React from 'react'
import '../styles/termsAndCond.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const TermsAndCond = () => {
    const navigate = useNavigate();
return (
    <section className='terms'>
        <button className='exit-btn' onClick={()=>navigate(-1)}>
            <p className='txt TXT-heading2'>
                الخروج
            </p>
            <span className='icon TXT-heading'>
                {IoIosArrowBack({})}
            </span>
        </button>
        <h1 className='TXT-heading2 heading'>شروط و أحكام إستخدام منصة SPACE TECH</h1>
        <ul className='list' role='list'>
            <li className='TXT-normal'>
                <span className='TXT-heading2' dir='ltr'> -1 </span>
                <p>سجل برقم الهاتف المربوط بالتيليجرام</p>
            </li>
            <li className='TXT-normal'>
                <span className='TXT-heading2' dir='ltr'> -2 </span>
                <p>حق للمسؤلين بحظرك وانهاء إشتراكاتك في حال محاولة التلاعب . (تسريب التوصيات ، تسريب الكورسات) التوصيات استخدمها انت شخصيا ولا يحق لك نشرها لأي شخص اخر</p>
            </li>
            <li className='TXT-normal'>
                <span className='TXT-heading2' dir='ltr'> -3 </span>
                <p> اي مبلغ يتم تحويله للمحفظة غير قابل للاسترداد </p>
            </li>
            <li className='TXT-normal'>
                <span className='TXT-heading2' dir='ltr'> -4 </span>
                <p>يحق اطفاء السيرفر (الموقع) لمدة قد تصل الي 48 ساعة لإجراء الصيانة . (مع العلم انه لن يكون هناك اي تأثير على قنواة التوصيات والكورسات)</p>
            </li>
            <li className='TXT-normal'>
                <span className='TXT-heading2' dir='ltr'> -5 </span>
                <p>التحقق من عمليات الدفع يتم بشكل فوري وفي بعض الاحيان يأخد كحد اقصى مدة 12 ساعة حتى يتم إضافتك .</p>
            </li>
            <li className='TXT-normal'>
                <span className='TXT-heading2' dir='ltr'> -6 </span>
                <p>نحن لسنا مسؤلين عن خسارة حسابك في حالة قمت بالطمع وزيادة الرافعة المالية او اللوت (التزم بادارة المخاطر والتعليمات من الخبراء)</p>
            </li>
            <li className='TXT-normal'>
                <span className='TXT-heading2' dir='ltr'> -7 </span>
                <p>لانضم نسبة نجاح الصفقات 100‎%‎ . (لاكن نظمنو لك  مجموع نجاح الصفقات يصل الي 85‎%‎ وتحقيق ارباح ممتازة)</p>
            </li>
        </ul>
    </section>
  )
}

export default TermsAndCond