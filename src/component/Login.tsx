import React from 'react';
import logo from '../images/sentosa-logo-nobg.png';
import Rarrow from '../images/right-arrow.png'

const Login: React.FC = () => {
    return (
        <div className="flex h-full">
            <div className='flex items-center w-1/3 h-screen'>
                <img src={logo} alt="logo" />
            </div>
            <div className='w-2/3 h-screen '>
                <div className='flex flex-row items-center mt-32 h-1/2 justify-evenly'>
                    <LoginCard mode="partner" />
                    <LoginCard mode="client" />
                </div>
                <div className='justify-center h-20 text-center'>
                    여기에 카카오 로그인 버튼 붙일 예정
                </div>
                <div className='text-center text-custom-blue'>
                    아직 계정이 없으신가요?
                </div>
            </div>
        </div>
    );
}

type LoginCardProps = {
    mode: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ mode }) => {
    return (
        <div className='w-64 h-64 min-w-[250px] min-h-[250px] aspect-w-1 aspect-h-1 rounded-2xl bg-custom-blue flex flex-col items-center justify-evenly shadow-lg shadow-custom-blue'>
            {mode === 'partner' ? 
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
            <button className='flex flex-row items-center justify-center w-1/2 bg-white h-1/6 drop-shadow-xl rounded-3xl text-custom-blue'>
                로그인 <img src={Rarrow} alt="right-arrow" />
            </button>
        </div>
    );
}

export default Login;
