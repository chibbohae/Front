import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import logo from '../images/sentosa-nobg.png';

const Header = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const location = useLocation(); // useLocation 훅 사용

    const handleLogoClick = () =>{
      navigate('/main');
    }
    const handleLoginClick = () => {
      navigate('/login'); // /login 경로로 이동
    };

    // URL 경로에 따라 헤더 내용 변경
    const renderHeaderContent = () => {
        switch (location.pathname) {
            case '/main/partner':
                return <h1 className="text-lg font-bold">파트너 페이지</h1>;
            case '/main/client':
                return <h1 className="text-lg font-bold">클라이언트 페이지</h1>;
            default:
                return <h1 className="text-lg font-bold">홈페이지</h1>;
        }
    };

    return (
      <div>
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 pl-10 pr-10 bg-white border-b">
          <img src={logo} onClick={handleLogoClick} className="w-32 h-16" alt="logo" />
          {renderHeaderContent()} {/* 경로에 따라 헤더 내용 렌더링 */}
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
