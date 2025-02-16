import React, { useState } from 'react'
import Rarrow from '../../images/right-arrow.png';
import kakao from '../../images/KakaoLogin.png';
import INPUT from './INPUT';
import { registerClient, registerPartner } from '../../api/auth'; // API 로직을 가져옵니다.

export enum Gender {
    M = "M",
    F = "F",
    O = "O"
}

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
    const [gender, setGender] = useState<Gender>(Gender.M);
    const [loginId, setLoginId] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [telephone, setTelephone] = useState<string>('');

    // 0 : 기본화면, 1 : P 회원가입-1, 2: P 회원가입-2, 3: C 회원가입-1, 4: C 회원가입-2
    const handleRegModeChange = (num : number) => {
        setMode(num);
    }

    const handlePrevClick = () =>{
        const newMode = registermode%2 === 1 ? 0 : registermode-1;
        handleRegModeChange(newMode);
    }

    const renderRegister = () => {
        switch (registermode) {
            case 1:
                return (
                    <RegInput
                        mode={1}
                        handleRegModeChange={handleRegModeChange}
                        handlePrevClick={handlePrevClick}
                        gender={gender}
                        setGender={setGender}
                        loginId={loginId}
                        setLoginId={setLoginId}
                        loginPassword={loginPassword}
                        setLoginPassword={setLoginPassword}
                        name={name}
                        setName={setName}
                        age={age}
                        setAge={setAge}
                        telephone={telephone}
                        setTelephone={setTelephone}
                    />
                )
            case 2:
                return (
                    <RegDetail
                        mode={2}
                        handleRegModeChange={handleRegModeChange}
                        handleModeChange={handleModeChange}
                        handlePrevClick={handlePrevClick}
                        gender={gender}
                        name={name}
                        age={age}
                        telephone={telephone}
                        loginId={loginId}
                        loginPassword={loginPassword}
                    />
                    )
            case 3:
                return (
                    <RegInput
                        mode={3}
                        handleRegModeChange={handleRegModeChange}
                        handlePrevClick={handlePrevClick}
                        gender={gender}
                        setGender={setGender}
                        loginId={loginId}
                        setLoginId={setLoginId}
                        loginPassword={loginPassword}
                        setLoginPassword={setLoginPassword}
                        name={name}
                        setName={setName}
                        age={age}
                        setAge={setAge}
                        telephone={telephone}
                        setTelephone={setTelephone}
                    />
                )
            case 4:
                return (
                    <RegDetail
                        mode={4}
                        handleRegModeChange={handleRegModeChange}
                        handleModeChange={handleModeChange}
                        handlePrevClick={handlePrevClick}
                        gender={gender}
                        name={name}
                        age={age}
                        telephone={telephone}
                        loginId={loginId}
                        loginPassword={loginPassword}
                    />
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
                        로그인 하러가기
                    </div>
                </div>)
        }
    }
    return(
        renderRegister()
    )
}

//회원가입 입력 화면
type RegInputProps = {
    mode: number;
    handleRegModeChange: (num: number) => void;
    handlePrevClick: () => void;
    gender: Gender;
    setGender: React.Dispatch<React.SetStateAction<Gender>>;
    loginId: string;
    setLoginId: React.Dispatch<React.SetStateAction<string>>;
    loginPassword: string;
    setLoginPassword: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    age: number;
    setAge: React.Dispatch<React.SetStateAction<number>>;
    telephone: string;
    setTelephone: React.Dispatch<React.SetStateAction<string>>;
};
const RegInput: React.FC<RegInputProps> = ({ mode, handleRegModeChange, handlePrevClick, gender, setGender, loginId, setLoginId, loginPassword, setLoginPassword, name, setName, age, setAge, telephone, setTelephone }) => {
    const isloginIdValid = /^[a-zA-Z]+$/.test(loginId); // 영어만 허용
    const isloginPasswordValid = loginPassword.length >= 8; // 8자리 이상
    const isTelephoneValid = /^010-\d{4}-\d{4}$/.test(telephone); // 전화번호 형식 (예: 010-1122-1122)
    const isAgeValid = /^\d+$/.test(String(age)); // 숫자만 허용

    const handleSelect = (gender: Gender) => setGender(gender);

    const handleNextClick = () => {
        // mode 값 업데이트
        const newMode = mode === 1 ? 2 : 4; // 멘토는 2로, 멘티는 4로 변경
        handleRegModeChange(newMode); // 부모 컴포넌트에 mode 변경 요청
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // 숫자만 허용, 그렇지 않으면 빈 값으로 처리
        if (/^\d*$/.test(value)) {
            setAge(Number(value));
        }
    };

    return (
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center w-2/3 shadow-lg shadow-custom-blue h-2/3 bg-custom-blue rounded-3xl'>
                <div className='flex mt-4 text-xl font-bold text-white'>{mode === 1 ? '멘토 / Partner' : '멘티 / Client'}</div>
                <div className='flex flex-col items-center h-64 mt-8 justify-evenly'>
                    <INPUT classname='w-64 h-10' placeholder='아이디' value={loginId} onChange={(e) => setLoginId(e.target.value)}  />
                    {!isloginIdValid && loginId && <span className="text-red-500">아이디는 영어만 입력 가능합니다.</span>}

                    <INPUT classname='w-64 h-10' type='password' placeholder='비밀번호' value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />
                    {!isloginPasswordValid && loginPassword && <span className="text-red-500">비밀번호는 8자리 이상이어야 합니다.</span>}

                    <div className='flex justify-between w-64'>
                        <INPUT classname='h-10 w-[45%]' placeholder='이름' value={name} onChange={(e)=> setName(e.target.value)} />
                        <INPUT 
                            classname='h-10 w-[45%]' 
                            placeholder='나이' 
                            value={age || ''} // 빈 값 처리
                            onChange={handleAgeChange} 
                        />
                        {!isAgeValid && age !== 0 && <span className="text-red-500">나이는 숫자만 입력하십시오</span>}
                    </div>
                    <div className="flex justify-between w-64">
                        <button onClick={() => handleSelect(Gender.M)} className={`w-[45%] h-10 rounded-2xl ${gender === Gender.M ? 'bg-white/30 text-white' : 'bg-gray-200 text-black'}`}>남자</button>
                        <button onClick={() => handleSelect(Gender.F)} className={`w-[45%] h-10 rounded-2xl ml-4 ${gender === Gender.F ? 'bg-white/30 text-white' : 'bg-gray-200 text-black'}`}>여자</button>
                    </div>
                    <INPUT classname='w-64 h-10' placeholder='전화번호 (+82)' value={telephone} onChange={(e)=>setTelephone(e.target.value)} />
                    {!isTelephoneValid && telephone && <span className="text-red-500">전화번호 형식이 올바르지 않습니다. (예: 010-1122-1122)</span>}
                </div>
                <div className='flex flex-row w-[70%] justify-evenly mt-10'>
                    <button onClick={handlePrevClick} className='items-center justify-center w-32 h-10 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        뒤로가기
                    </button>
                    <button onClick={handleNextClick} className='flex flex-row items-center justify-center w-32 h-10 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        다음으로 <img src={Rarrow} alt="right-arrow" />
                    </button>
                </div>
            </div>
        </div>
    );
}

type RegDetailProps = {
    mode: number;
    handleRegModeChange: (num: number) => void;
    handleModeChange: (mode: string) => void;
    handlePrevClick: () => void;
    gender: Gender;
    name: string;
    age: number;
    telephone: string;
    loginId: string;
    loginPassword: string;
};
const RegDetail: React.FC<RegDetailProps> = ({mode, handleRegModeChange, handleModeChange, handlePrevClick, name, gender, age, telephone, loginId, loginPassword}) =>{
    //공통 필요 변수
    const [email, setEmail] = useState<string>('');
    
    //파트너 필요 변수
    const [company, setCompany] = useState<string>('');
    const [yearsOfExperience, setYearsOfExperience] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const handlePositionClick = (option: string) => {
        setPosition(option);
    }
    const [bio, setBio] = useState<string>('');
    
    const iscompanyValid = company.length > 0; // company의 길이가 0 이상인지 체크
    const isyearsOfExperienceValid = /^\d+$/.test(yearsOfExperience); // 숫자만 허용
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // 이메일 형식 검증
    // bio의 최대 길이를 체크하는 함수
    const handlebioChange = (value: string) => {
        if (value.length <= 100) {
            setBio(value); // 100자 이하일 경우 상태 업데이트
        }
    };
    
    //클라이언트 필요 변수
    const [university, setUniversity] = useState<string>('');
    const [major, setMajor] = useState<string>('Computer');
    //const [interest, setInterest] = useState<string[]>([]); // 선택된 항목 상태 관리
    const [interest, setInterest] = useState<string>(''); // 선택된 항목 상태 관리
    const isUniversityValid = university.length > 0; // company의 길이가 0 이상인지 체크
    // const handleOptionClick = (option: string) => {
    //     // 선택된 항목이 이미 선택되어 있다면 제거, 아니면 추가
    //     setInterest(prev => 
    //         prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    //     );
    // };
    const handleOptionClick = (option: string) => {
        setInterest(option);
    }

    // 회원가입 버튼 클릭 시 호출되는 함수
    const handleSignUp = () => {
        if(mode===2){
            if (!iscompanyValid) {
                alert('회사명은 필수 입력사항입니다.'); // 회사명이 유효하지 않을 경우 경고
                return;
            }
            if (!isyearsOfExperienceValid) {
                alert('년차는 숫자만 입력 가능합니다.'); // 년차가 유효하지 않을 경우 경고
                return;
            }
            if (bio.length === 0) {
                alert('소개글은 필수 입력사항입니다.'); // 소개글이 비어있을 경우 경고
                return;
            }
            if(!isEmailValid) {
                alert('이메일을 적어주세요');
                return;
            }
            const userData ={
                name,
                age,
                gender,
                telephone,
                email,
                loginId,
                loginPassword,
                company,
                yearsOfExperience : Number(yearsOfExperience),
                position,
                bio
            }
            registerPartner(userData)  // API 호출
            .then(response => {
                // 성공적인 응답 처리 (예: 로그인 페이지로 이동)
                handleModeChange('login');
            })
            .catch(error => {
                // 에러 처리
                alert(error);
                alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
            });
        }else{
            if(!isUniversityValid){
                alert('마지막으로 다닌 학교를 적어주세요');
                return ;
            }
            if(interest.length == 0){
                alert('원하는 직종 하나를 선택해주세요 !');
                return;
            }
            if(!isEmailValid) {
                alert('이메일을 적어주세요');
                return;
            }
            const userData = {
                name,
                age,
                gender,
                telephone,
                email,
                loginId,
                loginPassword,
                university,
                major,
                interest
            };
            registerClient(userData)  // API 호출
            .then(response => {
                // 성공적인 응답 처리 (예: 로그인 페이지로 이동)
                handleModeChange('login');
            })
            .catch(error => {
                // 에러 처리
                alert(error);
                alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
            });
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
                        <div className='flex flex-col items-center h-[65%] w-[100%] mt-4 justify-between'>
                            <div className='flex flex-row items-center justify-around h-16 w-[60%]'>
                                <INPUT placeholder='회사명' classname='w-32 h-10' value={company} onChange={(e)=>setCompany(e.target.value)}/>
                                <INPUT placeholder='년차' classname='w-32 h-10' value={yearsOfExperience} onChange={(e)=>setYearsOfExperience(e.target.value)}/>
                            </div>
                            <INPUT placeholder='이메일' classname='w-[55%] h-10' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                {!isyearsOfExperienceValid && yearsOfExperience && <span className="text-red-500">년차는 숫자만 입력 가능합니다.</span>}
                            <div className='w-[100%] p-2 flex flex-row justify-around'>
                                <div className='w-[40%] h-[90%] flex flex-col'>
                                    <textarea
                                        placeholder='소개글 (최대 100자)'
                                        className='w-[100%] h-[100%] border resize-none rounded-2xl drop-shadow-xl placeholder-custom-blue' // resize-none으로 크기 조절 방지
                                        value={bio}
                                        onChange={(e) => handlebioChange(e.target.value)} // 문자열을 직접 받는 핸들러
                                        maxLength={100} // 최대 100자 제한
                                    />  
                                    {bio.length === 100 && <span className="text-red-500 h-[5%]">최대 100자까지 입력 가능함.</span>} {/* 100자 초과 경고 */}
                                </div>
                                <div className='flex flex-wrap justify-center w-[55%] overflow-auto bg-white rounded-3xl' style={{ maxHeight: '200px' }}>
                                    {options.map(option => (
                                        <div 
                                            key={option} 
                                            onClick={() => handlePositionClick(option)} 
                                            className={`m-2 p-4 border rounded cursor-pointer flex items-center justify-center w-20 ${position.includes(option) ? 'bg-custom-blue/60 text-white' : 'bg-gray-200'}`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col items-center justify-around'>
                            <div className='flex mt-4 text-xl font-bold text-white'>멘티 / Client</div>
                        </div>
                        <div className='flex flex-col items-center h-64 mt-8 justify-evenly'>
                            <div className='flex flex-row justify-around w-[80%]'>
                                <INPUT placeholder='학교명' classname='w-32 h-10' value={university} onChange={(e)=>setUniversity(e.target.value)}/>
                                <INPUT placeholder='이메일' classname='w-64 h-10' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                {!isyearsOfExperienceValid && yearsOfExperience && <span className="text-red-500">년차는 숫자만 입력 가능합니다.</span>}
                            </div>
                            <div className='flex flex-wrap justify-center mt-4 overflow-auto bg-white w-[90%] rounded-3xl' style={{ maxHeight: '200px' }}>
                                {options.map(option => (
                                    <div 
                                        key={option} 
                                        onClick={() => handleOptionClick(option)} 
                                        className={`m-2 p-4 border rounded cursor-pointer flex items-center justify-center w-20 ${interest.includes(option) ? 'bg-custom-blue/60 text-white' : 'bg-gray-200'}`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>  
                )}
                
                <div className='flex flex-row w-[70%] justify-evenly mt-4'>
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
            {mode === 'partner' ? (
                <>
                    <div className='flex flex-col items-center justify-around'>
                        <div className='flex items-center justify-center w-32 h-32 font-bold bg-white rounded-full text-8xl'>P</div>
                        <div className='flex mt-4 text-xl font-bold text-white'>멘토 / Partner</div>
                    </div>
                    <button
                        onClick={() => handleModeChange(1)}
                        className='flex flex-row items-center justify-center w-32 h-10 mt-5 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        회원가입 <img src={Rarrow} alt="right-arrow" />
                    </button>
                </>
            ) : (
                <>
                    <div className='flex flex-col items-center justify-around'>
                        <div className='flex items-center justify-center w-32 h-32 font-bold bg-white rounded-full text-8xl'>C</div>
                        <div className='flex mt-4 text-xl font-bold text-white'>멘티 / Client</div>
                    </div>
                    <button
                        onClick={() => handleModeChange(3)}
                        className='flex flex-row items-center justify-center w-32 h-10 mt-5 bg-white drop-shadow-xl rounded-3xl text-custom-blue'>
                        회원가입 <img src={Rarrow} alt="right-arrow" />
                    </button>
                </>
            )}
        </div>
    );
}

export default RegisterComp;