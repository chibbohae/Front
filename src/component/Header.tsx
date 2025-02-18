import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import logo from '../images/sentosa-nobg.png';
import { CheckPartnerMypage, CheckClientMypage } from '../api/auth'

const Header = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation(); // useLocation 훅 사용
  const token = localStorage.getItem('token');
  
  const handleMyPage = async () =>{
    if(location.pathname === '/main/partner'){
      navigate('/main/partner/mypage');
    }
    else if(location.pathname === '/main/client'){
      navigate('/main/client/mypage');
    }
    else return;
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/main')
    return ;
  }
  
  const handleLogoClick = () => {
    if (location.pathname.startsWith('/main/partner')) {
      navigate('/main/partner'); // /main/partner로 이동
    } else if (location.pathname.startsWith('/main/client')) {
      navigate('/main/client'); // /main/client로 이동
    } else {
      navigate('/main'); // 그 외의 경우 /main으로 이동
    }
  }
  
  const handleLoginClick = () => {
    navigate('/login'); // /login 경로로 이동
  };

  // URL 경로에 따라 헤더 내용 변경 -> 사용자의 타입에 따라 바뀌는 걸로 변경하기
  const renderHeaderContent = () => {
    if (location.pathname.startsWith('/main/partner')) {
        return <div className='flex flex-row w-[50%] justify-evenly'>
          <button className='text-lg font-bold'>추천</button>
          <button className='text-lg font-bold'>글쓰기</button>
          <button className='text-lg font-bold'>리뷰관리</button>
        </div>;
    } else if (location.pathname.startsWith('/main/client')) {
        return <h1 className="text-lg font-bold">클라이언트 페이지</h1>;
    } else {
        return <h1 className="text-lg font-bold w-[50%] text-center">홈페이지</h1>;
    }
  };


  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 pl-10 pr-10 bg-white border-b">
        <img src={logo} onClick={handleLogoClick} className="w-32 h-16" alt="logo" />
        {renderHeaderContent()} {/* 경로에 따라 헤더 내용 렌더링 */}
        {token ? (
          <div className='w-[25%] h-12 min-width-[25%] flex flex-row'>
            <button
                className='w-[45%] h-12 transition-transform transform border-2 hover:scale-105 border-custom-blue rounded-xl text-custom-blue hover:bg-custom-blue/50'
                onClick={handleLogout}>
              로그아웃
            </button>
            <button 
              className="w-[45%] h-12 transition-transform transform border-2 hover:scale-105 border-custom-blue rounded-xl text-custom-blue hover:bg-custom-blue/50"
              onClick={handleMyPage}>
              마이페이지
            </button>
          </div>
          ) : (<button 
            className="w-32 h-12 transition-transform transform border-2 hover:scale-105 border-custom-blue rounded-xl text-custom-blue hover:bg-custom-blue/50"
            onClick={handleLoginClick}> {/* 클릭 시 handleLoginClick 호출 */}
            로그인
          </button>)}
      </header>
      <main className='pt-16'>   
        <Outlet /> 
      </main>
    </div>
  );
}

export default Header;
