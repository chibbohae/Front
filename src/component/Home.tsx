import React from 'react';

type CardProps = {
  title: string;
  description: string;
  icon?: string;
  gradient: string;
};

const FeatureCard: React.FC<CardProps> = ({ title, description, gradient }) => {
  return (
    <div className={`p-6 text-white ${gradient} rounded-xl shadow-lg transition-transform duration-200 hover:scale-105`}>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const features = [
    {
      title: "취업 컨설팅",
      description: "전문 멘토와 함께 취업 준비를 위한 맞춤형 솔루션을 제공합니다.",
      gradient: "bg-gradient-to-r from-teal-500 to-emerald-500"
    },
    {
      title: "이력서 첨삭",
      description: "실무자의 시선에서 이력서와 자기소개서를 검토하고 개선합니다.",
      gradient: "bg-gradient-to-r from-blue-500 to-indigo-500"
    },
    {
      title: "면접 대비",
      description: "실제 면접과 유사한 환경에서 멘토와 함께 면접을 연습합니다.",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className='flex flex-col items-center min-h-screen bg-white'>
      {/* 헤더 배너 */}
      <div className="flex flex-col items-center w-full px-4 py-16 mb-10 bg-gradient-to-r from-blue-600 to-indigo-700">
        <h1 className="mb-4 text-4xl font-bold text-center text-white md:text-5xl">취업 준비의 파트너</h1>
        <p className="max-w-2xl mb-8 text-center text-blue-100">전문가와 함께 취업 준비를 더 효과적으로 진행하세요</p>
        
        {/* 검색 바
        <div className='relative w-full max-w-2xl mt-4'>
          <input 
            type="text" 
            placeholder='관심 있는 직무나 회사를 검색해보세요' 
            className='w-full h-12 pl-5 pr-24 border border-blue-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
          />
          <button 
            className='absolute h-10 px-5 text-white transition-colors duration-200 bg-blue-600 rounded-full right-1 top-1 hover:bg-blue-700'
          >
            검색하기
          </button>
        </div> */}
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="w-full max-w-6xl px-4 mb-16">
        {/* 서비스 소개 섹션 */}
        <div className='mb-16'>
          <div className='mb-10 text-center'>
            <h2 className='mb-3 text-3xl font-bold text-gray-800'>서비스 소개</h2>
            <p className='max-w-2xl mx-auto text-gray-600'>취업 준비생을 위한 맞춤형 서비스를 제공합니다</p>
          </div>
          
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
              />
            ))}
          </div>
        </div>
        
        {/* 멘토 소개 섹션 */}
        <div className='mb-16'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>추천 멘토</h2>
            {/* <button className='text-teal-600 hover:text-teal-800'>더 보기 &gt;</button> */}
          </div>
          
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='overflow-hidden transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md'>
                <div className='flex p-4'>
                  {/* <div className='w-16 h-16 mr-4 overflow-hidden rounded-full'>
                    <img src='/api/placeholder/100/100' alt='멘토 프로필' className='object-cover w-full h-full' />
                  </div> */}
                  <div>
                    <h3 className='font-bold text-gray-800'>홍길동</h3>
                    <p className='text-sm text-gray-600'>ABC 기업 / 소프트웨어 엔지니어</p>
                    <div className='flex items-center mt-1'>
                      <span className='text-yellow-400'>★★★★★</span>
                      <span className='ml-1 text-sm text-gray-600'>5.0</span>
                    </div>
                  </div>
                </div>
                <div className='p-4 border-t border-gray-100'>
                  <p className='text-sm text-gray-700'>웹 개발, 알고리즘, 기술 면접 전문</p>
                </div>
                {/* <div className='p-4 bg-gray-50'>
                  <button className='w-full py-2 text-white transition-colors duration-200 bg-teal-500 rounded-md hover:bg-teal-600'>
                    상담 예약하기
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        
        {/* 통계 섹션 */}
        <div className='mb-16'>
          <div className='mb-10 text-center'>
            <h2 className='mb-3 text-3xl font-bold text-gray-800'>서비스 현황</h2>
            <p className='max-w-2xl mx-auto text-gray-600'>많은 취업 준비생들이 함께하고 있습니다</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-6 text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl">
              <h3 className="mb-3 text-xl font-bold">누적 상담</h3>
              <p className="mb-1 text-3xl font-bold">15,200건</p>
              <p className="text-teal-100">지난 달 대비 15% 증가</p>
            </div>
            <div className="p-6 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
              <h3 className="mb-3 text-xl font-bold">멘토 수</h3>
              <p className="mb-1 text-3xl font-bold">250명</p>
              <p className="text-blue-100">다양한 분야의 전문가</p>
            </div>
            <div className="p-6 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <h3 className="mb-3 text-xl font-bold">취업 성공률</h3>
              <p className="mb-1 text-3xl font-bold">78%</p>
              <p className="text-purple-100">상담 후 6개월 이내</p>
            </div>
          </div>
        </div>
        
        {/* 사용자 후기 섹션 */}
        <div className='mb-16'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>후기</h2>
            {/* <button className='text-teal-600 hover:text-teal-800'>전체보기 &gt;</button> */}
          </div>
          
          <div className='p-6 mb-6 bg-gray-50 rounded-xl'>
            <div className='flex items-center mb-4'>
              {/* <img src='/api/placeholder/50/50' alt='사용자 프로필' className='w-10 h-10 mr-3 rounded-full' /> */}
              <div>
                <h3 className='font-medium text-gray-800'>이영희</h3>
                <p className='text-sm text-gray-500'>3일 전</p>
              </div>
              <div className='flex ml-auto'>
                <span className='text-yellow-400'>★★★★★</span>
              </div>
            </div>
            <p className='text-gray-700'>
              "멘토님의 조언 덕분에 원하던 기업에 합격할 수 있었습니다. 특히 면접 준비 과정에서 현업자의 시선으로 피드백을 받을 수 있어 매우 유익했습니다."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;