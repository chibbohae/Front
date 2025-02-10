import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';  // useNavigate import 추가
import logo from '../images/sentosa-nobg.png';

const Header = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleLoginClick = () => {
      navigate('/login'); // /login 경로로 이동
    };

    return (
      <div>
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 pl-10 pr-10 bg-white">
          <img src={logo} className="w-32 h-16" alt="logo" />
          <button 
            className="w-32 h-12 border-2 border-custom-blue rounded-xl text-custom-blue"
            onClick={handleLoginClick}> {/* 클릭 시 handleLoginClick 호출 */}
            로그인
          </button>
        </header>
        <main className='pt-16'>   
          <Outlet /> 
        </main>
      </div>
    );
}

export default Header;
