import React, {useState} from 'react'
import Rarrow from '../../images/right-arrow.png';

type LoginComponentProps = {
    handleModeChange : ( mode : string)=>void;
}
const LoginComp:React.FC<LoginComponentProps> = ({handleModeChange}) => {
    const [loginmode, setMode] = useState<number>(0);
    const handleLoginModeChange = (num : number) => {
        setMode(num);
    }

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
                    <div className='justify-center h-20 text-center'>
                        여기에 카카오 로그인 버튼 붙일 예정
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
                    <input 
                        type="text" 
                        className='w-64 h-10 border rounded-2xl drop-shadow-xl placeholder-custom-blue' placeholder='아이디'/>
                    <input 
                        type="text" 
                        className='w-64 h-10 border rounded-2xl drop-shadow-xl placeholder-custom-blue' placeholder='비밀번호'/>
                </div>
                <div className='flex flex-row w-[70%] justify-evenly mt-10'>
                    <button onClick={()=>handleLoginModeChange(0)} className='items-center justify-center w-32 h-12 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        뒤로가기</button>
                    <button onClick={()=>handleLoginModeChange(0)} className='items-center justify-center w-32 h-12 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
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
        <div className='w-64 h-64 min-w-[250px] min-h-[250px] aspect-w-1 aspect-h-1 rounded-2xl bg-custom-blue flex flex-col items-center justify-evenly shadow-lg shadow-custom-blue'>
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