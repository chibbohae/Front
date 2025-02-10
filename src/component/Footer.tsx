import React from 'react';
import logo from '../images/sentosa-logo-nobg.png'

const Footer = () => {
    return (
        <div className='flex flex-col items-center justify-center w-screen h-80'> 
            <div className='text-center'>
                <div className='pt-10 text-2xl font-bold'> 
                    취업도우미 사이트 취뽀해 입니다.
                </div>
                <div>
                    자잘한 설명설명설명
                </div>
            </div>
            <div className='flex flex-row items-center w-1/2 mt-4 text-center border-t-2 justify-evenly'>
                <img src={logo} className="w-40 h-32" alt="logo" />
                <div>
                    &copy; 2025 취뽀해 All Right Reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;
