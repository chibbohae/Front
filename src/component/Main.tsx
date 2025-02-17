import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import Partner from './Partner/Partner';
import Client from './Client/Client';
import PartnerMypage from '../component/Partner/PartnerMypage';
import ClientMypage from './Client/ClientMypage';
import Review from './Client/Review';
import Chat from './CallChat/Chat'; // 채팅 컴포넌트
import Call from './CallChat/Call';   // 전화 컴포넌트

const Main: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    // URL 경로에 따라 다른 내용을 결정합니다.
    const renderContent = () => {
        switch (location.pathname) {
            case '/main/partner':
                return <Partner />;
            case '/main/client':
                return <Client />;
            case '/main/partner/mypage':
                return <PartnerMypage />;
            case '/main/client/mypage':
                return <ClientMypage />;
            case '/main/client/review':
                return <Review />;
            case '/main/client/chat':
                return <Chat onComplete={() => navigate('/main/client/review')} goBack={()=>navigate('/main/client/mypage')}/>;
            case '/main/client/call':
                return <Call onComplete={() => navigate('/main/client/review')} />;
            case '/main/partner/chat':
                return <Chat onComplete={() => navigate('/main/partner')} goBack={()=>navigate('/main/partner/mypage')}/>;
            case '/main/partner/call':
                return <Call onComplete={() => navigate('/main/partner/mypage')} />;
            default:
                return <Home />;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default Main;
