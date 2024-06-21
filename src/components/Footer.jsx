import React from 'react'
import { MdEmail,MdPhone } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramLine,RiRobot2Fill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";



const Footer = () => {
    return (
        <footer className='main-footer' id='footer'>
            <div className='line'></div>
            <div className='container footer-container'>
                <article className='holder'>
                    <div className='first-part'>
                        <h2 className='first-part-heading TXT-heading2'>للتواصل</h2>
                        <ul className='methods' role='list'>
                            <li>
                                <span className='method TXT-footer'>Email</span>
                                <p className='adress TXT-normal' dir='ltr'>
                                    <span className='icon TXT-heading2'>{MdEmail({})}</span>
                                    spacetech059@gmail.com
                                </p>
                            </li>
                            <li>
                                <span className='method TXT-footer'>WhatsApp</span>
                                <p className='adress TXT-normal' dir='ltr'>
                                    <span className='icon TXT-heading2'>{MdPhone({})}</span>
                                    (218) 91-1971731
                                </p>
                            </li>
                        </ul>
                        <p className='rights TXT-footer' dir='ltr'>&copy; 2024 Space Tech. All rights reserved.</p>
                    </div>
                    <div className='footer-line'></div>
                    <ul className='media-links' role='list'>
                        <li className='logo-dark'>
                            <img src="/images/space-tech-logo.png" alt="" />
                        </li>
                        <li>
                            <a href={`${process.env.REACT_APP_BOT_URL}`} target='_blank'>
                                <span className='icon TXT-heading3'>{RiRobot2Fill({})}</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/@spacetrading.ly?_t=8moMsD86KhR&_r=1" target='_blank'>
                                <span className='icon TXT-heading3'>{SiTiktok({})}</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/space.tech.1?igsh=MXF4dXc2cjhteGV4Yg==" target='_blank'>
                                <span className='icon TXT-heading3'>{RiInstagramLine({})}</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/profile.php?id=100086986184605&mibextid=LQQJ4d" target='_blank'>
                                <span className='icon TXT-heading3'>{FaFacebookF({})}</span>
                            </a>
                        </li>
                    </ul>
                </article>
            </div>
        </footer>
    )
}

export default Footer