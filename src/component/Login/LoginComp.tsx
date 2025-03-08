import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Rarrow from '../../images/right-arrow.png';
import kakao from '../../images/KakaoLogin.png';
import { loginPartner, loginClient, LoginRequest, initiateKakaoLogin} from "../../api/loginauth";
import INPUT from '../INPUT';

type LoginComponentProps = {
    handleModeChange : ( mode : string)=>void;
}
const LoginComp:React.FC<LoginComponentProps> = ({handleModeChange}) => {
    const [loginmode, setMode] = useState<number>(0);
    const handleLoginModeChange = (num : number) => {
        setMode(num);
    };
    const handleKakaoLogin = () => {
        // Default to partner login if no mode selected
        const userType = loginmode === 2 ? 'client' : 'partner';
        initiateKakaoLogin(userType);
    };


    const renderLogin = () => {
        switch (loginmode) {
            case 1:
                return (
                    <LoginInput mode={1} handleLoginModeChange={handleLoginModeChange}/>
                )
            case 2:
                return (
                    <LoginInput mode={2} handleLoginModeChange={handleLoginModeChange}/>
                )
            default :
            return (
                <div className='w-[80%]'>
                    <div className={`flex flex-row mt-32 h-1/2 justify-evenly items-center`}>
                        <LoginCard mode="partner" handleLoginModeChange={handleLoginModeChange} />
                        <LoginCard mode="client" handleLoginModeChange={handleLoginModeChange}/>
                    </div>
                    <div className='flex justify-center h-20'>
                        {/* 카카오 로그인 */}
                        <img 
                            src={kakao} 
                            alt="kakao" 
                            className='w-64 h-16 cursor-pointer rounded-3xl'
                            onClick={handleKakaoLogin}
                        />
                    </div>
                    <div onClick={() => handleModeChange('register')} className='text-center cursor-pointer text-custom-blue'>
                        아직 계정이 없으신가요?
                    </div>
                </div>)
        }
    }
    return(
        renderLogin()
    )
}

type LoginInputProps = {
    mode : number
    handleLoginModeChange: (num:number)=>void;
}
const LoginInput:React.FC<LoginInputProps> = ({mode, handleLoginModeChange}) => {
    const [loginId, setUsesrId] = useState<string>('');
    const [loginPassword, setloginPassword] = useState<string>('');
    const navigate = useNavigate(); // useNavigate 훅 사용
    
    const handleLoginClick = async () => {
        if (!loginId.match(/^[a-zA-Z]+$/)) {
            alert("아이디를 입력하십시오!");
            return;
        }
        if (loginPassword.length < 8) {
            alert("비밀번호를 확인하세요! 8자리 이상입니다.");
            return;
        }
    
        try {
            const requestData: LoginRequest = { loginId, loginPassword };
            let response;
        
            if (mode === 1) {
                // 멘토 로그인 API 호출
                response = await loginPartner(requestData);
            } else {
                // 멘티 로그인 API 호출
                response = await loginClient(requestData);
            }
        
            // 토큰 저장
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);

            // 아이디 저장
            localStorage.setItem("userId", loginId);
    
            // 역할에 따라 이동
            if (mode === 1) {
                navigate("/main/partner");
            } else {
                navigate("/main/client");
            }
        } catch (error) {
            alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
            console.error("로그인 오류:", error);
        }
    };

    return (
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center w-2/3 shadow-lg shadow-custom-blue h-2/3 bg-custom-blue rounded-3xl'>
                {mode === 1  ? 
                    (
                        <div className='flex flex-col items-center justify-around'>
                            <div className='flex items-center justify-center w-32 h-32 font-bold bg-white rounded-full text-8xl'>P</div>
                            <div className='flex mt-4 text-xl font-bold text-white'>멘토 / Partner</div>
                        </div>
                    )
                    : <div className='flex flex-col items-center justify-around'>
                    <div className='flex items-center justify-center w-32 h-32 font-bold bg-white rounded-full text-8xl'>C</div>
                    <div className='flex mt-4 text-xl font-bold text-white'> 멘티 / Client</div>
                </div>
                }
                <div className='flex flex-col items-center h-32 justify-evenly'>
                    <INPUT placeholder='아이디' classname='w-64 h-10' value={loginId} onChange={(e)=>setUsesrId(e.target.value)} />
                    <INPUT placeholder='비밀번호' classname='w-64 h-10' value={loginPassword} onChange={(e)=>setloginPassword(e.target.value)} type='password'/>
                </div>
                <div className='flex flex-row w-[70%] justify-evenly mt-10'>
                    <button onClick={()=>handleLoginModeChange(0)} className='items-center justify-center w-32 h-12 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        뒤로가기</button>
                    <button onClick={handleLoginClick} className='items-center justify-center w-32 h-12 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        로그인</button>
                </div>
            </div>
        </div>
    )
}

type LoginCardProps = {
    mode: string;
    handleLoginModeChange: (num :number)=>void;
}
const LoginCard: React.FC<LoginCardProps> = ({ mode ,handleLoginModeChange}) => {
    return (
        <div className='w-64 h-64 min-w-[250px] min-h-[250px] aspect-w-1 aspect-h-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex flex-col items-center justify-around shadow-lg shadow-gray'>
            {mode === 'partner' ? 
                (
                    <div>
                        <div className='flex flex-col items-center justify-around'>
                            <div className='flex items-center justify-center w-32 h-32 font-bold bg-white rounded-full text-8xl'>P</div>
                            <div className='flex mt-4 text-xl font-bold text-white'>멘토 / Partner</div>
                        </div>
                        <button 
                            onClick={()=>handleLoginModeChange(1)}
                            className='flex flex-row items-center justify-center w-32 h-10 mt-5 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                            로그인 <img src={Rarrow} alt="right-arrow" />
                        </button>
                    </div>
                )
                : <div>
                    <div className='flex flex-col items-center justify-around'>
                        <div className='flex items-center justify-center w-32 h-32 font-bold bg-white rounded-full text-8xl'>C</div>
                        <div className='flex mt-4 text-xl font-bold text-white'>멘티 / Client</div>
                    </div>
                    <button 
                        onClick={()=>handleLoginModeChange(2)}
                        className='flex flex-row items-center justify-center w-32 h-10 mt-5 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        로그인 <img src={Rarrow} alt="right-arrow" />
                    </button>
                </div>
            }
        </div>
    );
}

export default LoginComp;