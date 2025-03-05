import React, { useState } from 'react';
import EmploymentMemoir from './EmploymentMemoir';
import PartnerCard from './PartnerCard';

const Client: React.FC = () => {
    const [modal, setModal] = useState<string>('main');
    const [selectedMemoir, setSelectedMemoir] = useState<any>(null);
    const [selectedPartner, setSelectedPartner] = useState<any>(null);

    const memoirData = [
        { 
            name: '세한', 
            memoir: '세한의 취업수기 - 개발자로서의 첫 걸음을 내딛는 과정에서 겪었던 다양한 경험들과 도전들을 공유합니다.',
            company: '네이버', 
            position: '프론트엔드 개발자', 
            imageUrl: '/api/placeholder/120/120' 
        },
        { 
            name: '민지', 
            memoir: '신입 개발자의 취업 여정 - 비전공자로서 개발 공부를 시작하여 대기업에 취업하기까지의 과정을 담았습니다.',
            company: '카카오', 
            position: '백엔드 개발자', 
            imageUrl: '/api/placeholder/120/120' 
        },
        { 
            name: '지수', 
            memoir: '비전공자의 개발자 취업기 - 독학으로 코딩을 배우고 포트폴리오를 준비하여 스타트업에 취업한 이야기입니다.',
            company: '라인', 
            position: '풀스택 개발자', 
            imageUrl: '/api/placeholder/120/120' 
        },
        { 
            name: '현우', 
            memoir: '대기업 취업을 위한 나만의 전략 - 코딩테스트부터 기술면접까지 준비하는 과정과 노하우를 공유합니다.',
            company: '삼성전자', 
            position: 'SW 엔지니어', 
            imageUrl: '/api/placeholder/120/120' 
        },
        { 
            name: '소영', 
            memoir: '스타트업 취업 경험담 - 스타트업 환경에서 일하기 위해 필요한 역량과 면접 준비 과정을 소개합니다.',
            company: '토스', 
            position: '모바일 개발자', 
            imageUrl: '/api/placeholder/120/120' 
        },
        { 
            name: '준호', 
            memoir: '해외 취업 도전기 - 글로벌 기업에 지원하는 방법과 영어 면접을 준비한 경험을 나눕니다.',
            company: '구글', 
            position: 'UX 엔지니어', 
            imageUrl: '/api/placeholder/120/120' 
        },
        { 
            name: '지민', 
            memoir: '신입 개발자의 포트폴리오 준비 과정 - 취업에 성공한 프로젝트 구성과 이력서 작성 팁을 공유합니다.',
            company: '쿠팡', 
            position: 'DevOps 엔지니어', 
            imageUrl: '/api/placeholder/120/120' 
        },
        { 
            name: '서연', 
            memoir: '자기소개서 작성 노하우 - 합격한 자기소개서의 구성과 면접관의 시선을 사로잡는 방법을 알려드립니다.',
            company: 'LG전자', 
            position: '데이터 엔지니어', 
            imageUrl: '/api/placeholder/120/120' 
        },
    ];
    
    const partnerData = [
        { 
            name: '김멘토', 
            bio: '신입 개발자 멘토링 전문가입니다. 이력서 첨삭부터 기술 면접 대비까지 도와드립니다.', 
            company: '네이버', 
            year: '5', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '이코치', 
            bio: '이력서 첨삭 & 면접 코칭을 전문으로 합니다. 대기업 면접관 경험을 바탕으로 조언해드립니다.', 
            company: '카카오', 
            year: '7', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '박튜터', 
            bio: '코딩테스트 대비 전략과 실전 문제 풀이 방법을 알려드립니다.', 
            company: '라인', 
            year: '4', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '최어드바이저', 
            bio: '포트폴리오 컨설팅과 프로젝트 기획을 도와드립니다. 채용 담당자의 눈에 띄는 포트폴리오 제작 노하우를 알려드립니다.', 
            company: '쿠팡', 
            year: '6', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '정선배', 
            bio: '신입 개발자 커리어 상담과 기술 스택 설계를 도와드립니다.', 
            company: '토스', 
            year: '3', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '한멘토', 
            bio: '프론트엔드 전문 멘토링을 제공합니다. React, Vue 등 최신 기술 강의와 코드 리뷰를 도와드립니다.', 
            company: '배민', 
            year: '5', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '유코치', 
            bio: '백엔드 개발 멘토링과 시스템 설계 컨설팅을 제공합니다. 대용량 트래픽 처리 경험을 공유합니다.', 
            company: 'SK', 
            year: '8', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '신어드바이저', 
            bio: '자소서 작성 전략 컨설팅과 인성 면접 준비를 도와드립니다.', 
            company: 'LG', 
            year: '4', 
            imageUrl: '/api/placeholder/100/100' 
        },
        { 
            name: '강선배', 
            bio: '취업 인터뷰 전문 코치입니다. 모의 면접과 피드백을 통해 면접 실력을 향상시켜 드립니다.', 
            company: '현대', 
            year: '6', 
            imageUrl: '/api/placeholder/100/100' 
        },
    ];

    // 검색 기능
    const handleSearch = () => {
        //검색 api
    }

    // 취업수기 카드 클릭
    const handleMemoirClick = (name: string, memoir: string, company?: string, position?: string) => {
        setSelectedMemoir({ name, memoir, company, position });
        setModal('memoir');
    }
    
    // 파트너 카드 클릭
    const handleCardClick = (name: string, bio: string, company: string, year: string) => {
        setSelectedPartner({ name, bio, company, year });
        setModal('partner');
    }

    const renderModal = () => {
        switch (modal) {
            case 'memoir':
                return selectedMemoir && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setModal('main')}>
                        <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[50%] min-h-[70%] bg-white rounded-xl shadow-lg z-60 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="p-6 text-white bg-gradient-to-r from-blue-500 to-indigo-600">
                                <h2 className="mb-2 text-2xl font-bold">{selectedMemoir.name}의 취업 이야기</h2>
                                <div className="flex items-center space-x-2">
                                    {selectedMemoir.company && (
                                        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-white rounded-full">
                                            {selectedMemoir.company}
                                        </span>
                                    )}
                                    {selectedMemoir.position && (
                                        <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-white rounded-full">
                                            {selectedMemoir.position}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow p-6 overflow-y-auto">
                                <p className="leading-relaxed text-gray-700">{selectedMemoir.memoir}</p>
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
            case 'partner':
                return selectedPartner && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setModal('main')}>
                        <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[50%] min-h-[70%] bg-white rounded-xl shadow-lg z-60 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="p-6 text-white bg-gradient-to-r from-teal-500 to-emerald-600">
                                <h2 className="mb-2 text-2xl font-bold">{selectedPartner.name} 파트너</h2>
                                <div className="flex items-center space-x-2">
                                    <span className="px-3 py-1 text-sm font-medium text-teal-600 bg-white rounded-full">
                                        {selectedPartner.company}
                                    </span>
                                    <span className="px-3 py-1 text-sm font-medium bg-white rounded-full text-emerald-600">
                                        {selectedPartner.year}년 경력
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between flex-grow p-6">
                                <p className="mb-6 leading-relaxed text-gray-700">{selectedPartner.bio}</p>
                                <div className="flex flex-col space-y-4">
                                    <button className="w-full py-2 text-white transition-colors duration-200 bg-teal-500 rounded-md hover:bg-teal-600">
                                        멘토링 요청하기
                                    </button>
                                    {/* <button className="w-full py-2 text-gray-700 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200">
                                        프로필 더 보기
                                    </button> */}
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
                <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">취업 스토리</h1>
                <p className="max-w-2xl mb-6 text-center text-blue-100">선배들의 취업 경험을 통해 나만의 취업 전략을 세워보세요</p>
                
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
                {/* 취업수기 섹션 */}
                <div className='mb-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800'>취업 수기</h2>
                        <button className='text-blue-600 hover:text-blue-800'>더보기 &gt;</button>
                    </div>
                    
                    {/* 취업수기 카드 그리드 */}
                    <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {memoirData.slice(0,6).map((item, index) => (
                            <EmploymentMemoir 
                                key={index}
                                name={item.name}
                                memoir={item.memoir}
                                company={item.company}
                                position={item.position}
                                imageUrl={item.imageUrl}
                                handleMemoirClick={handleMemoirClick}
                            />
                        ))}
                    </div>
                </div>
                
                {/* 인기 파트너 섹션 */}
                <div className='mb-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800'>인기 파트너</h2>
                        <button className='text-teal-600 hover:text-teal-800'>더보기 &gt;</button>
                    </div>
                    
                    {/* 파트너 카드 그리드 */}
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {partnerData.slice(0, 6).map((item, index) => (
                            <PartnerCard 
                                key={index} 
                                name={item.name}
                                bio={item.bio}
                                company={item.company}
                                year={item.year}
                                imageUrl={item.imageUrl}
                                handleCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                </div>
                
                {/* 추가 섹션: 취업 팁 *
                <div className='mb-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-800'>취업 성공 팁</h2>
                        <button className='text-purple-600 hover:text-purple-800'>더보기 &gt;</button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="p-6 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                            <h3 className="mb-3 text-xl font-bold">자기소개서 작성법</h3>
                            <p className="mb-4 text-purple-100">채용담당자의 마음을 사로잡는 자기소개서 작성의 핵심 팁</p>
                            <button className="px-4 py-2 font-medium text-purple-600 bg-white rounded-lg">가이드 보기</button>
                        </div>
                        <div className="p-6 text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                            <h3 className="mb-3 text-xl font-bold">면접 준비하기</h3>
                            <p className="mb-4 text-amber-100">기술 면접부터 인성 면접까지 완벽하게 준비하는 방법</p>
                            <button className="px-4 py-2 font-medium bg-white rounded-lg text-amber-600">팁 확인하기</button>
                        </div>
                        <div className="p-6 text-white bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl">
                            <h3 className="mb-3 text-xl font-bold">포트폴리오 만들기</h3>
                            <p className="mb-4 text-sky-100">당신의 역량을 효과적으로 보여주는 포트폴리오 제작 방법</p>
                            <button className="px-4 py-2 font-medium bg-white rounded-lg text-sky-600">강의 보기</button>
                        </div>
                    </div>
                </div>
                */}
            </div>
        </div>
    )
}

export default Client;