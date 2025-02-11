import React, { useState } from 'react'
import Rarrow from '../../images/right-arrow.png';
import kakao from '../../images/KakaoLogin.png';

const options = [
    "백엔드 개발", "PM", "프론트엔드 개발", "프로덕트 디자인", "AI / ML", 
    "데이터 분석", "PO", "인사", "브랜드 마케팅", "영업 관리", 
    "경영지원 / 총무", "퍼포먼스 마케팅", "전략 / 기획", "전략컨설턴트", 
    "QA", "정보보안", "데이터 엔지니어", "서비스기획", "회계", 
    "KICPA 공인회계사", "게임 클라이언트 개발", "B2B 영업", "DevOps", 
    "안드로이드 개발", "UX / UI 디자인", "데이터 사이언스", "그로스 마케팅", 
    "BI / BX 디자인", "PD"
];

type RegisterComponentProps = {
    handleModeChange : ( mode : string)=>void;
}
const RegisterComp:React.FC<RegisterComponentProps> = ({handleModeChange}) => {
    const [registermode, setMode] = useState<number>(0); 
    // 0 : 기본화면, 1 : P 회원가입-1, 2: P 회원가입-2, 3: C 회원가입-1, 4: C 회원가입-2
    const handleRegModeChange = (num : number) => {
        setMode(num);
    }

    const handlePrevClick = () =>{
        const newMode = registermode%2 === 1 ? 0 : registermode-1;
        handleRegModeChange(newMode);
    }

    const renderLogin = () => {
        switch (registermode) {
            case 1:
                return (
                    <RegInput mode={1} handleRegModeChange={handleRegModeChange} handlePrevClick={handlePrevClick}/>
                )
            case 2:
                return (
                    <RegDetail mode={2} handleRegModeChange={handleRegModeChange} handleModeChange={handleModeChange} handlePrevClick={handlePrevClick}/>
                    )
            case 3:
                return (
                    <RegInput mode={3} handleRegModeChange={handleRegModeChange} handlePrevClick={handlePrevClick}/>
                )
            case 4:
                return (
                    <RegDetail mode={4} handleRegModeChange={handleRegModeChange} handleModeChange={handleModeChange} handlePrevClick={handlePrevClick} />
                )
            default :
            return (
                <div className='w-[80%]'>
                    <div className={`flex flex-row mt-32 h-1/2 justify-evenly items-center`}>
                        <RegisterCard mode="partner" handleModeChange={handleRegModeChange} />
                        <RegisterCard mode="client" handleModeChange={handleRegModeChange}/>
                    </div>
                    <div className='flex justify-center h-20'>
                        <img src={kakao} alt="kakao" className='w-64 h-16 cursor-pointer rounded-3xl'/>
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

//입력 컴포넌트
type INPUTProps = {
    placeholder: string;
    classname: string;
    value: string; // 현재 입력값
    onChange: (value: string) => void; // 입력값 변경 핸들러
    type ?: string
};
const INPUT: React.FC<INPUTProps> = ({ placeholder, classname, value, onChange, type='text'}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`${classname} border rounded-2xl drop-shadow-xl placeholder-custom-blue`}
            value={value}
            onChange={(e) => onChange(e.target.value)} // 입력값 변경 시 호출
        />
    );
};

//회원가입 입력 화면
type RegInputProps = {
    mode: number;
    handleRegModeChange: (num: number) => void;
    handlePrevClick : ()=>void;
};
const RegInput: React.FC<RegInputProps> = ({ mode, handleRegModeChange,handlePrevClick }) => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null); // 선택된 성별 상태
    const [userId, setUserId] = useState<string>(''); // 아이디
    const [password, setPassword] = useState<string>(''); // 비밀번호
    const [username, setUserName] = useState<string>(''); //이름
    const [age, setAge] = useState<string>(''); // 나이
    const [phone, setPhone] = useState<string>(''); // 전화번호

    const isUserIdValid = /^[a-zA-Z]+$/.test(userId); // 영어만 허용
    const isPasswordValid = password.length >= 8; // 8자리 이상
    const isAgeValid = /^\d+$/.test(age); // 숫자만 허용
    const isPhoneValid = /^010-\d{4}-\d{4}$/.test(phone); // 전화번호 형식 (예: 010-1122-1122)

    const handleSelect = (gender: string) => {
        setSelectedGender(gender); // 선택된 성별 업데이트
    };

    const handleNextClick = () => {
        // mode 값 업데이트
        const newMode = mode === 1 ? 2 : 4; // 멘토는 2로, 멘티는 4로 변경
        handleRegModeChange(newMode); // 부모 컴포넌트에 mode 변경 요청
    };

    return (
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center w-2/3 shadow-lg shadow-custom-blue h-2/3 bg-custom-blue rounded-3xl'>
                {mode === 1 ? (
                    <div className='flex flex-col items-center justify-around'>
                        <div className='flex mt-4 text-xl font-bold text-white'>멘토 / Partner</div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-around'>
                        <div className='flex mt-4 text-xl font-bold text-white'>멘티 / Client</div>
                    </div>
                )}
                <div className='flex flex-col items-center h-64 mt-8 justify-evenly'>
                    <INPUT classname='w-64 h-10' placeholder='아이디' value={userId} onChange={setUserId} />
                    {!isUserIdValid && userId && <span className="text-red-500">아이디는 영어만 입력 가능합니다.</span>}
                    
                    <INPUT classname='w-64 h-10' type='password' placeholder='비밀번호' value={password} onChange={setPassword} />
                    {!isPasswordValid && password && <span className="text-red-500">비밀번호는 8자리 이상이어야 합니다.</span>}
                    
                    <div className='flex justify-between w-64'>
                        <INPUT classname='h-10 w-[45%]' placeholder='이름' value={username} onChange={setUserName} />
                        <INPUT classname='h-10 w-[45%]' placeholder='나이' value={age} onChange={setAge} />
                        {!isAgeValid && age && <span className="text-red-500">나이는 숫자만 입력 가능합니다.</span>}
                    
                    </div>
                    <div className="flex justify-between w-64">
                        <button
                            onClick={() => handleSelect('male')}
                            className={`w-[45%] h-10 rounded-2xl ${selectedGender === 'male' ? 'bg-white/30 text-white' : 'bg-gray-200 text-black'}`}>
                            남자
                        </button>
                        <button
                            onClick={() => handleSelect('female')}
                            className={`w-[45%] h-10 rounded-2xl ml-4 ${selectedGender === 'female' ? 'bg-white/30 text-white' : 'bg-gray-200 text-black'}`}>
                            여자
                        </button>
                    </div>
                    <INPUT classname='w-64 h-10' placeholder='전화번호 (+82)' value={phone} onChange={setPhone} />
                    {!isPhoneValid && phone && <span className="text-red-500">전화번호 형식이 올바르지 않습니다. (예: +82-10-1234-5678)</span>}
                </div>
                <div className='flex flex-row w-[70%] justify-evenly mt-10'>
                    <button onClick={handlePrevClick} className='items-center justify-center w-32 h-10 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        뒤로가기
                    </button>
                    <button onClick={() => handleNextClick()} className='flex flex-row items-center justify-center w-32 h-10 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        다음으로 <img src={Rarrow} alt="right-arrow" />
                    </button>
                </div>
            </div>
        </div>
    );
};
const RegDetail: React.FC<RegInputProps & {handleModeChange :(mode: string)=>void}> = ({mode, handleRegModeChange, handleModeChange, handlePrevClick}) =>{    
    //파트너 필요 변수
    const [componey, setComponey] = useState<string>('');
    const [compyear, setCompYear] = useState<string>('');
    const [introduce, setIntroduce] = useState<string>('');
    const isComponeyValid = componey.length > 0; // componey의 길이가 0 이상인지 체크
    const isCompYearValid = /^\d+$/.test(compyear); // 숫자만 허용
    // introduce의 최대 길이를 체크하는 함수
    const handleIntroduceChange = (value: string) => {
        if (value.length <= 10) {
            setIntroduce(value); // 100자 이하일 경우 상태 업데이트
        }
    };
    
    //클라이언트 필요 변수
    const [university, setUniversity] = useState<string>('');
    const [college, setCollege] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 선택된 항목 상태 관리
    const isUniversityValid = university.length > 0; // componey의 길이가 0 이상인지 체크
    const handleOptionClick = (option: string) => {
        // 선택된 항목이 이미 선택되어 있다면 제거, 아니면 추가
        setSelectedOptions(prev => 
            prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
        );
    };

    // 회원가입 버튼 클릭 시 호출되는 함수
    const handleSignUp = () => {
        if(mode===2){
            if (!isComponeyValid) {
                alert('회사명은 필수 입력사항입니다.'); // 회사명이 유효하지 않을 경우 경고
                return;
            }
            if (!isCompYearValid) {
                alert('년차는 숫자만 입력 가능합니다.'); // 년차가 유효하지 않을 경우 경고
                return;
            }
            if (introduce.length === 0) {
                alert('소개글은 필수 입력사항입니다.'); // 소개글이 비어있을 경우 경고
                return;
            }
        }else{
            if(!isUniversityValid){
                alert('마지막으로 다닌 학교를 적어주세요');
                return ;
            }
            if(selectedOptions.length == 0){
                alert('원하는 직종 하나를 선택해주세요 !');
                return;
            }
        }

        // 모든 입력이 유효한 경우 다음 작업 수행
        handleModeChange('login'); // 예시: 로그인 모드로 변경
    };
    
    return (
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center w-2/3 shadow-lg shadow-custom-blue h-2/3 bg-custom-blue rounded-3xl'>
                {mode === 2 ? (
                    <>
                        <div className='flex flex-col items-center justify-around'>
                            <div className='flex mt-4 text-xl font-bold text-white'>멘토 / Partner</div>
                        </div>
                        <div className='flex flex-col items-center w-[50%] h-64 mt-8 justify-between'>
                            <INPUT placeholder='회사명' classname='w-[100%] h-10' value={componey} onChange={setComponey}/>
                            <INPUT placeholder='년차' classname='w-[100%] h-10' value={compyear} onChange={setCompYear}/>
                            {!isCompYearValid && compyear && <span className="text-red-500">년차는 숫자만 입력 가능합니다.</span>}
                            <INPUT 
                                placeholder='소개글 (최대 100자)' 
                                classname='w-[100%] h-[60%]' 
                                value={introduce} 
                                onChange={handleIntroduceChange} // 문자열을 직접 받는 핸들러
                            />
                            {introduce.length === 100 && <span className="text-red-500">최대 100자까지 입력 가능합니다.</span>} {/* 100자 초과 경고 */}
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col items-center justify-around'>
                            <div className='flex mt-4 text-xl font-bold text-white'>멘티 / Client</div>
                        </div>
                        <div className='flex flex-col items-center h-64 mt-8 justify-evenly'>
                            <INPUT placeholder='학교명' classname='w-64 h-10' value={university} onChange={setUniversity}/>
                            <div className='flex flex-wrap justify-center mt-4 overflow-auto bg-white w-[90%] rounded-3xl' style={{ maxHeight: '200px' }}>
                                {options.map(option => (
                                    <div 
                                        key={option} 
                                        onClick={() => handleOptionClick(option)} 
                                        className={`m-2 p-4 border rounded cursor-pointer flex items-center justify-center w-20 ${selectedOptions.includes(option) ? 'bg-custom-blue/60 text-white' : 'bg-gray-200'}`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>  
                )}
                
                <div className='flex flex-row w-[70%] justify-evenly mt-10'>
                    <button onClick={handlePrevClick} className='items-center justify-center w-32 h-10 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        뒤로가기
                    </button>
                    <button onClick={handleSignUp} className='flex flex-row items-center justify-center w-32 h-10 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        회원가입 
                    </button>
                </div>
            </div>
        </div>
    )
}


type RegisterCardProps = {
    mode: string;
    handleModeChange: (mode : number)=>void;
}
const RegisterCard: React.FC<RegisterCardProps> = ({ mode,handleModeChange }) => {
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
                            onClick={()=>handleModeChange(1)}
                            className='flex flex-row items-center justify-center w-32 h-10 mt-5 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                            회원가입 <img src={Rarrow} alt="right-arrow" />
                        </button>
                    </div>
                )
                : <div>
                    <div className='flex flex-col items-center justify-around'>
                        <div className='flex items-center justify-center w-32 h-32 font-bold bg-white rounded-full text-8xl'>C</div>
                        <div className='flex mt-4 text-xl font-bold text-white'>멘티 / Client</div>
                    </div>
                    <button 
                        onClick={()=>handleModeChange(3)}
                        className='flex flex-row items-center justify-center w-32 h-10 mt-5 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        회원가입 <img src={Rarrow} alt="right-arrow" />
                    </button>
                </div>
            }
        </div>
    );
}

export default RegisterComp;