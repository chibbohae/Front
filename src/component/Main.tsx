import React from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import Partner from './Partner/Partner';
import Client from './Client';

const Main: React.FC = () => {
    const location = useLocation();

    // URL 경로에 따라 다른 내용을 결정합니다.
    const renderContent = () => {
        switch (location.pathname) {
            case '/main/partner':
                return <Partner/>; // 파트너 화면 내용
            case '/main/client':
                return <Client/>; // 클라이언트 화면 내용
            default:
                return <Home/>; // 기본 내용 (선택된 경로가 없을 경우)
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};



export default Main;
