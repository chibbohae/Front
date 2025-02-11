import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Login from './component/Login/LoginScreen';

import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Main from './component/Main'; // Main 컴포넌트 가져오기

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainWrapper />
    </BrowserRouter>
  );
}

const MainWrapper: React.FC = () => {
  const location = useLocation();

  // 로그인 화면일 경우 헤더와 푸터를 제외합니다.
  const isAuthRoute = location.pathname === '/login';

  return (
    <div className="flex flex-col h-full">
      {!isAuthRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main/*" element={<Main />} /> {/* /main 경로로 Main 컴포넌트에 전달 */}
        {/**여기에 라우터 화면 추가 */}
      </Routes>
      {!isAuthRoute && <Footer />}
    </div>
  );
}

export default App;
