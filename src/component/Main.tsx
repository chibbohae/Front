import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import Partner from './Partner/Partner';
import Client from './Client/Client';
import PartnerMypage from './Partner/PartnerMypage';
import ClientMypage from './Client/ClientMypage';
import Review from './Client/Review';
import Chat from './CallChat/Chat'; // 채팅 컴포넌트
import Call from './CallChat/Call';   // 전화 컴포넌트
import Calltest from './CallChat/Calltest';
import AIreview from './Client/AISummary';
import AISUmmary from './Client/AISummary';
import CallComponent from './CallChat/CallComponent';
import VideoCall from './CallChat/VideoCall';

import { Routes, Route } from 'react-router-dom';

const Main: React.FC = () => {

    const navigate = useNavigate(); // useNavigate 훅 사용
    return (
        <Routes>
            <Route path="partner" element={<Partner />} />
            <Route path="client" element={<Client />} />
            <Route path="partner/mypage" element={<PartnerMypage />} />
            <Route path="client/mypage" element={<ClientMypage />} />
            <Route path="client/review" element={<Review />} />
            {/* <Route path="client/chat" element={<Chat onComplete={() => navigate('/client/review')} goBack={() => navigate('/main/client/mypage')} />} />
            <Route path="partner/chat" element={<Chat onComplete={() => navigate('/main/partner')} goBack={() => navigate('/main/partner/mypage')} />} /> */}
            {/* <Route path="client/call" element={<VideoCall  />} />
            <Route path="partner/call" element={<VideoCall />} /> */}
            <Route path="client/call" element={<Calltest />} />
            <Route path="partner/call" element={<Calltest />} />
            
            {/* <Route path="client/aisummary" element={<AISummary />} /> */}
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default Main;
