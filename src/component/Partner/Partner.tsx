import React, { useState } from 'react';
import Calender from './Calender';
import CounselCard from './CounselCard';

const Partner: React.FC = () => {
    const [time, setTime] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [simpleQ, setQ] = useState<{simpleQ: string}[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const counselData = [
        {time: '2025-01-01', name:'홍길동', simpleQ: ['으아', '둥','셋']}
    ]
    // const [counselData, setCounselData] = useState<{ time: string; name: string }[]>([]); // 상담 데이터 상태 추가

    const renderModal = () => {
        return modal ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"> {/* z-index 추가 */}
                <div className="flex flex-col items-center w-64 h-64 p-6 bg-white rounded-lg shadow-lg z-60"> {/* z-index 추가 */}
                    <h2 className="text-lg font-bold text-center">상담 상세정보</h2>
                    <p>시간: {time}</p>
                    <p>이름: {name}</p>
                    {simpleQ.map((Q,index)=>(
                        <p key={index}>Q</p>
                    ))}
                    <p>간단한 질문: {}</p>
                    <button 
                        className="px-4 py-2 mt-4 text-white rounded bg-custom-blue"
                        onClick={() => setModal(false)}>
                        닫기
                    </button>
                </div>
            </div>
        ) : null;
    };
    

    const handleCardClick = (time: string, name: string /*simplrQ: []*/) => {
        setTime(time);
        setName(name);
        //setQ(simpleQ);
        setModal(true);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            {renderModal()}
            <div className='mt-5 mb-20 rounded-lg h-10 shadow-md shadow-custom-blue/50 w-[50%] flex justify-between items-center'>
                <input type="text" placeholder='회사명 & 직무명' className='w-[75%] ml-5'/>
                <button className='w-[15%] mr-3 bg-custom-blue h-[80%] rounded-lg text-white'>검색하기</button>
            </div>
            <Calender/>
            <div className='flex flex-col items-center mt-32'>
                <div className='m-4 text-2xl font-bold'>들어온 상담일정</div>
                <div className='flex flex-row w-[90%] justify-center mb-20'>
                {counselData.map((counsel, index) => (
                        <CounselCard 
                            key={index}
                            time={counsel.time}
                            name={counsel.name}
                            //simpleQ={counsel.simpleQ}
                            onClick={handleCardClick} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Partner;
