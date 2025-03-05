import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/sentosa-nobg.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  // 반응형 디자인을 위한 state
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 화면 크기 변화 감지하는 useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 813);
      if (window.innerWidth >= 813) {
        setIsMenuOpen(false);
      }
    };
    
    // 초기 로드 시 한 번 실행
    handleResize();
    
    // 화면 크기 변화 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMyPage = async () => {
    if (location.pathname === '/main/partner') {
      navigate('/main/partner/mypage');
    } else if (location.pathname === '/main/client') {
      navigate('/main/client/mypage');
    } else return;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('kakaoLoginUserType');
    navigate('/main');
    return;
  };

  const handleLogoClick = () => {
    if (location.pathname.startsWith('/main/partner')) {
      navigate('/main/partner');
    } else if (location.pathname.startsWith('/main/client')) {
      navigate('/main/client');
    } else {
      navigate('/main');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  // 현재 위치에 따라 네비게이션 항목 활성화 여부 결정
  const isActive = (path: string) => {
    return location.pathname.includes(path) ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600';
  };

  // URL 경로에 따라 헤더 내용 변경
  const renderHeaderContent = () => {
    if (location.pathname.startsWith('/main/partner')) {
      return (
        <div className={`${isMobile ? (isMenuOpen ? 'flex flex-col absolute top-20 left-0 w-full bg-white shadow-lg z-50 py-4 gap-4' : 'hidden') : 'flex flex-row w-auto gap-8'}`}>
          <button className={`text-lg font-bold px-4 py-2 transition-colors duration-200 ${isActive('recommend')}`}>추천</button>
          <button className={`text-lg font-bold px-4 py-2 transition-colors duration-200 ${isActive('write')}`}>글쓰기</button>
          <button className={`text-lg font-bold px-4 py-2 transition-colors duration-200 ${isActive('review')}`}>리뷰관리</button>
        </div>
      );
    } else if (location.pathname.startsWith('/main/client')) {
      return (
        <div className={`${isMobile ? (isMenuOpen ? 'flex flex-col absolute top-20 left-0 w-full bg-white shadow-lg z-50 py-4 gap-4' : 'hidden') : 'flex flex-row w-auto gap-8'}`}>
          <button className={`text-lg font-bold px-4 py-2 transition-colors duration-200 ${isActive('recommend')}`}>추천</button>
          <button className={`text-lg font-bold px-4 py-2 transition-colors duration-200 ${isActive('explore')}`}>탐색</button>
        </div>
      );
    } else {
      return (
        <div className={`${isMobile ? 'hidden' : 'flex items-center justify-center'}`}>
          <h1 className="text-lg font-bold text-gray-800">홈페이지</h1>
        </div>
      );
    }
  };
  
  // 로그인/로그아웃 버튼 렌더링
  const renderAuthButtons = () => {
    if (token) {
      return (
        <div className={`${isMobile ? (isMenuOpen ? 'flex justify-between mt-4 gap-3 px-4 pb-4' : 'hidden') : 'flex flex-row items-center gap-4'}`}>
          <button
            className={`${isMenuOpen ? "flex-1":""} min-w-[100px] px-4 py-2 text-blue-600 transition-colors duration-200 bg-white border border-blue-600 rounded-lg hover:bg-blue-50`}
            onClick={handleMyPage}
          >
            마이페이지
          </button>
          <button
            className={`${isMenuOpen ? "flex-1":""} min-w-[100px] px-4 py-2 text-blue-600 transition-colors duration-200 bg-white border border-blue-600 rounded-lg hover:bg-blue-50`}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="px-4 py-2 text-white transition-colors duration-200 rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          onClick={handleLoginClick}
        >
          로그인
        </button>
      );
    }
  };



  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between h-20 px-4 mx-auto md:px-8 lg:px-16 max-w-7xl">
          {/* 로고 */}
          <div className="flex items-center">
            <img 
              src={logo} 
              onClick={handleLogoClick} 
              className="w-32 h-16 cursor-pointer" 
              alt="logo" 
            />
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          {isMobile && (
            <button 
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}

          {/* 데스크톱 네비게이션 */}
          {!isMobile && (
            <>
              <div className="flex justify-center flex-grow">
                {renderHeaderContent()}
              </div>
              <div className="flex items-center">
                {renderAuthButtons()}
              </div>
            </>
          )}
        </div>

        {/* 모바일 메뉴 */}
        {isMobile && isMenuOpen && (
          <div className="absolute left-0 z-50 w-full bg-white border-t border-gray-200 shadow-lg top-20">
            <div className="flex flex-col py-4">
              {renderHeaderContent()}
              {renderAuthButtons()}
            </div>
          </div>
        )}

      </header>
      
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;