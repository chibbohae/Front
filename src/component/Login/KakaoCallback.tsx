import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginKakaoPartner, loginKakaoClient } from '../../api/loginauth';

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        // Get the 'code' parameter from the URL
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          alert('카카오 로그인에 실패했습니다. 인증 코드가 없습니다.');
          navigate('/login');
          return;
        }

        // Get the user type from localStorage
        const userType = localStorage.getItem('kakaoLoginUserType') || 'partner';
        
        // Call the appropriate API based on user type
        let response;
        if (userType === 'partner') {
          response = await loginKakaoPartner(code);
          navigate('/main/partner');
        } else {
          response = await loginKakaoClient(code);
          navigate('/main/client');
        }

        // Clear the user type from localStorage
        localStorage.removeItem('kakaoLoginUserType');
        
      } catch (error) {
        console.error('카카오 로그인 오류:', error);
        alert('카카오 로그인 처리 중 오류가 발생했습니다.');
        navigate('/login');
      }
    };

    processKakaoLogin();
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-xl font-bold text-custom-blue">카카오 로그인 처리 중...</div>
    </div>
  );
};

export default KakaoCallback;