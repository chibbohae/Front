import React, { useState } from 'react';
import Calender from './Calender';
import CounselCard from './CounselCard';

const Partner: React.FC = () => {
    const [date, setDate] = useState<string | null>(null);
    const [time,setTime] = useState<string|null> (null);
    const [name, setName] = useState<string | null>(null);
    const [simpleQ, setQ] = useState<string[]>([]); // simpleQ를 string[]으로 선언
    const [modal, setModal] = useState<boolean>(false);
    
    const counselData = [
        { date: '2025-02-17', time:"7pm" ,name: '홍길동', simpleQ: ['으아sdfkk', '둥', '셋'] }
    ];

    const handleSearch = () =>{
        
    }

    const handleAccept = () =>{
        //수락 눌렀을 때 디비에 저장하는 로직 추가
        setModal(false)
    }
    const renderModal = () => {
        return modal ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={()=>setModal(false)}>
                <div className="flex flex-col items-center justify-between w-[30%] min-h-[52%] p-6 bg-white rounded-xl shadow-custom-blue shadow-md z-60"
                    onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-2xl font-bold text-center text-custom-blue">상담 요청</h2>
                    <div className='flex flex-col items-center'>
                        <p className='text-xl font-bold text-custom-blue'>{date}</p>
                        <p className='text-xl font-bold text-custom-blue'>{name}</p>
                    </div>
                    <p className='flex flex-col items-center text-xl font-bold w-[90%] text-custom-blue'>
                        간단한 질문: 
                        <div className='mt-2 flex flex-col items-center w-[100%]'>
                            {simpleQ.map((q, index) => (
                                <div className='flex text-base flex-row justify-start w-[80%]'>
                                    <p key={index} className='w-8'>{index+1}:</p>
                                    <p key={index}>{q}</p>
                                </div>
                                
                            ))}
                        </div>
                        
                    </p>
                    <div className='flex flex-row w-[50%] justify-between'>
                        <button 
                            className="px-4 py-2 mt-4 border rounded-xl border-custom-blue text-custom-blue"
                            onClick={() => setModal(false)}>
                            닫기
                        </button>

                        <button 
                            className="px-4 py-2 mt-4 border rounded-xl border-custom-blue text-custom-blue"
                            onClick={handleAccept}>
                            수락하기
                        </button>
                    </div>
                </div>
            </div>
        ) : null;
    };

    const handleCardClick = (date: string, time:string, name: string, simpleQ: string[]) => {
        setDate(date);
        setTime(time);
        setName(name);
        setQ(simpleQ); // string[]을 그대로 설정
        setModal(true);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            {renderModal()}
            <div className='mt-5 mb-20 rounded-lg h-10 shadow-md shadow-custom-blue/50 w-[50%] flex justify-between items-center'>
                <input type="text" placeholder='회사명 & 직무명' className='w-[75%] ml-5'/>
                <button className='w-[15%] mr-3 bg-custom-blue h-[80%] rounded-lg text-white' 
                    onClick={handleSearch}>검색하기</button>
            </div>
            <Calender counselData={counselData}/>
            <div className='flex flex-col items-center mt-32'>
                <div className='m-4 text-2xl font-bold'>들어온 상담일정</div>
                <div className='flex flex-row w-[90%] justify-center mb-20'>
                    {counselData.map((counsel, index) => (
                        <CounselCard 
                            key={index}
                            date={counsel.date}
                            time={counsel.time}
                            name={counsel.name}
                            simpleQ={counsel.simpleQ} // string[] 타입
                            onClick={() => handleCardClick(counsel.date, counsel.time, counsel.name, counsel.simpleQ)} // 인자 전달
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Partner;
