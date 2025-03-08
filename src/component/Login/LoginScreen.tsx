import React, { useEffect, useState } from 'react';
import logo from '../../images/sentosa-logo-nobg.png';
import LoginComp from './LoginComp';
import RegisterComp from './RegisterComp';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const [mode, setMode] = useState<string>('login');
    const [fadeIn, setFadeIn] = useState<boolean>(false); // fade-in 상태
    const navigate = useNavigate(); // useNavigate 훅 사용
    
    useEffect(() => {
        setFadeIn(true); // 컴포넌트가 마운트될 때 fade-in 활성화
    }, []);

    const handleModeChange = (newMode: string) => {
        setFadeIn(false); // 애니메이션을 위해 fadeIn 상태를 false로 설정
        setTimeout(() => {
            setMode(newMode); // 상태를 변경
            setFadeIn(true); // 애니메이션을 다시 활성화
        }, 500); // 애니메이션 시간과 일치하도록 설정
    };

    const handleLogoClick = () =>{
        navigate('/');
    }

    return (
        <div className="flex h-full">
            <div className='flex items-center justify-center w-1/2 h-screen'>
                <img src={logo} alt="logo" onClick={handleLogoClick}/>
            </div>
            <div className={`w-1/2 flex justify-center align-center h-screen transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                {mode === 'login' ? (
                    <LoginComp handleModeChange={() => handleModeChange("register")}/>
                ) : (
                    <RegisterComp handleModeChange={() => handleModeChange("login")}/>
                )}
            </div>
        </div>
    );
}

export default Login;
