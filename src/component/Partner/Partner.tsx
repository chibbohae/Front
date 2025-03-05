import React, { useState } from 'react';
import Calender from './Calender';
import CounselCard from './CounselCard';

const Partner: React.FC = () => {
    const [modal, setModal] = useState<string>('main');
    const [selectedCounsel, setSelectedCounsel] = useState<any>(null);

    // 상담 목록 데이터
    const counselData = [
        { 
            date: '2025-03-04', 
            time: '7:00 PM', 
            name: '홍길동', 
            simpleQ: ['자기소개서 작성 방법에 대해 조언 부탁드립니다.', '기술 면접 준비는 어떻게 하는 것이 좋을까요?', '포트폴리오 구성에 대한 피드백을 받고 싶습니다.'],
            imageUrl: '/api/placeholder/100/100'
        },
        { 
            date: '2025-03-05', 
            time: '3:00 PM', 
            name: '김철수', 
            simpleQ: ['비전공자로서 개발자 취업을 위한 조언이 필요합니다.', '코딩테스트 효율적인 준비 방법은 무엇인가요?'],
            imageUrl: '/api/placeholder/100/100'
        },
        { 
            date: '2025-03-07', 
            time: '10:00 AM', 
            name: '이영희', 
            simpleQ: ['대기업 면접 준비 방법에 대해 알고 싶습니다.', '프로젝트 경험을 어떻게 효과적으로 어필할 수 있을까요?', '현업에서 필요한 실무 역량은 무엇인가요?'],
            imageUrl: '/api/placeholder/100/100'
        },
        { 
            date: '2025-03-07', 
            time: '12:00 AM', 
            name: '김영수', 
            simpleQ: ['대기업 면접 준비 방법에 대해 알고 싶습니다.', '프로젝트 경험을 어떻게 효과적으로 어필할 수 있을까요?', '현업에서 필요한 실무 역량은 무엇인가요?'],
            imageUrl: '/api/placeholder/100/100'
        },
    ];

    // 검색 기능
    const handleSearch = () => {
        // 검색 api 호출 로직
    }

    // 상담 카드 클릭
    const handleCardClick = (date: string, time: string, name: string, simpleQ: string[], imageUrl: string) => {
        setSelectedCounsel({ date, time, name, simpleQ, imageUrl });
        setModal('counselDetail');
    }

    // 상담 수락 처리
    const handleAccept = () => {
        // 수락 api 호출 로직
        setModal('main');
        // 성공 메시지 표시 등의 로직 추가 가능
    }

    const renderModal = () => {
        switch (modal) {
            case 'counselDetail':
                return selectedCounsel && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setModal('main')}>
                        <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[50%] min-h-[70%] bg-white rounded-xl shadow-lg z-60 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="p-6 text-white bg-gradient-to-r from-teal-500 to-emerald-600">
                                <h2 className="mb-2 text-2xl font-bold">상담 요청</h2>
                                <div className="flex items-center space-x-2">
                                    <span className="px-3 py-1 text-sm font-medium text-teal-600 bg-white rounded-full">
                                        {selectedCounsel.date}
                                    </span>
                                    <span className="px-3 py-1 text-sm font-medium bg-white rounded-full text-emerald-600">
                                        {selectedCounsel.time}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between flex-grow p-6">
                                <div>
                                    <div className="flex items-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-800">{selectedCounsel.name}</h3>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <h4 className="mb-3 text-lg font-semibold text-gray-700">상담 질문:</h4>
                                        <ul className="pl-5 space-y-2 list-decimal">
                                            {selectedCounsel.simpleQ.map((q: string, index: number) => (
                                                <li key={index} className="text-gray-700">{q}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col space-y-4">
                                    <button 
                                        className="w-full py-2 text-white transition-colors duration-200 bg-teal-500 rounded-md hover:bg-teal-600"
                                        onClick={handleAccept}
                                    >
                                        상담 수락하기
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end p-4 border-t border-gray-200">
                                <button 
                                    className="px-4 py-2 transition-colors duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
                                    onClick={() => setModal('main')}
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <div className='flex flex-col items-center min-h-screen bg-white'>
            {renderModal()}
            
            {/* 헤더 배너 */}
            <div className="flex flex-col items-center w-full px-4 py-12 mb-8 bg-gradient-to-r from-blue-600 to-indigo-700">
                <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">파트너 대시보드</h1>
                <p className="max-w-2xl mb-6 text-center text-blue-100">취업 준비생들의 상담 요청과 일정을 관리하세요</p>
                
                {/* 검색 바 */}
                <div className='relative w-full max-w-2xl mt-4'>
                    <input 
                        type="text" 
                        placeholder='회사명 또는 직무를 검색해보세요' 
                        className='w-full h-12 pl-5 pr-24 border border-blue-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <button 
                        className='absolute h-10 px-5 text-white transition-colors duration-200 bg-blue-600 rounded-full right-1 top-1 hover:bg-blue-700'
                        onClick={handleSearch}
                    >
                        검색하기
                    </button>
                </div>
            </div>
            
            {/* 메인 콘텐츠 */}
            <div className="w-full max-w-6xl px-4">
                {/* 캘린더 섹션 */}
                <div className='mb-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800'>일정 관리</h2>
                        {/* <button className='text-teal-600 hover:text-teal-800'>일정 추가 &gt;</button> */}
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <Calender counselData={counselData} />
                    </div>
                </div>
                
                {/* 상담 요청 섹션 */}
                <div className='mb-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800'>들어온 상담 요청</h2>
                        {/* <button className='text-teal-600 hover:text-teal-800'>전체보기 &gt;</button> */}
                    </div>
                    
                    {/* 상담 카드 그리드 */}
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {counselData.map((item, index) => (
                            <CounselCard 
                                key={index}
                                date={item.date}
                                time={item.time}
                                name={item.name}
                                simpleQ={item.simpleQ}
                                imageUrl={item.imageUrl}
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                </div>
                
                {/* 멘토링 통계 섹션 */}
                <div className='mb-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800'>멘토링 통계</h2>
                        {/* <button className='text-teal-600 hover:text-teal-800'>자세히 &gt;</button> */}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="p-6 text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl">
                            <h3 className="mb-3 text-xl font-bold">이번 달 상담</h3>
                            <p className="mb-1 text-3xl font-bold">12건</p>
                            <p className="text-teal-100">전월 대비 20% 증가</p>
                        </div>
                        <div className="p-6 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                            <h3 className="mb-3 text-xl font-bold">평균 만족도</h3>
                            <p className="mb-1 text-3xl font-bold">4.8/5.0</p>
                            <p className="text-blue-100">상위 10% 멘토</p>
                        </div>
                        <div className="p-6 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                            <h3 className="mb-3 text-xl font-bold">누적 상담</h3>
                            <p className="mb-1 text-3xl font-bold">87건</p>
                            <p className="text-purple-100">지난 6개월 기준</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partner;