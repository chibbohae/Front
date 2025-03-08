import React, { useEffect, useState } from 'react'
import { PartnerData, CheckPartnerMypage, UpdatePartnerInfo, UpdatePartnerData } from '../../api/mypageauth'
import INPUT from '../INPUT'

const PartnerMypage = () => {
  const options = [
    "백엔드 개발", "PM", "프론트엔드 개발", "프로덕트 디자인", "AI / ML",
    "데이터 분석", "PO", "인사", "브랜드 마케팅", "영업 관리",
    "경영지원 / 총무", "퍼포먼스 마케팅", "전략 / 기획", "전략컨설턴트",
    "QA", "정보보안", "데이터 엔지니어", "서비스기획", "회계",
    "KICPA 공인회계사", "게임 클라이언트 개발", "B2B 영업", "DevOps",
    "안드로이드 개발", "UX / UI 디자인", "데이터 사이언스", "그로스 마케팅",
    "BI / BX 디자인", "PD"
  ];

  const [data, setData] = useState<PartnerData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UpdatePartnerData>({
    company: '',
    yearsOfExperience: 0,
    bio: '',
    position: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CheckPartnerMypage();
        setData(res);
        setEditData({
          company: res.company,
          yearsOfExperience: res.yearsOfExperience,
          bio: res.bio,
          position: res.position
        });
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  // 입력 필드 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name === 'yearsOfExperience' ? parseInt(value.toString()) || 0 : value
    });
  };

  // 포지션 클릭 처리
  const handlePositionClick = (option: string) => {
    setEditData({
      ...editData,
      position: option
    });
  };

  // 수정 모드 전환
  const toggleEditMode = () => {
    if (isEditing) {
      // 수정 모드에서 나갈 때 원본 데이터로 복원
      if (data) {
        setEditData({
          company: data.company,
          yearsOfExperience: data.yearsOfExperience,
          bio: data.bio,
          position: data.position
        });
      }
    }
    setIsEditing(!isEditing);
  };

  // 데이터 저장
  const handleSave = async () => {
    try {
      await UpdatePartnerInfo(editData);
      const res = await CheckPartnerMypage();
      setData(res);
      setIsEditing(false);
    } catch (error) {
      console.error("데이터 업데이트 실패:", error);
    }
  };

  // 상담 목록 샘플 데이터
  const acceptedCounsels = [
    { 
      date: '2025-03-04', 
      time: '7:00 PM', 
      name: '홍길동', 
      status: '완료',
      topic: '자기소개서 첨삭 및 면접 준비'
    },
    { 
      date: '2025-03-05', 
      time: '3:00 PM', 
      name: '김철수', 
      status: '예정',
      topic: '포트폴리오 검토 및 개발자 취업 전략'
    },
    { 
      date: '2025-03-07', 
      time: '10:00 AM', 
      name: '이영희', 
      status: '예정',
      topic: '대기업 면접 준비 전략'
    }
  ];

  return (
    <div className='flex flex-col items-center min-h-screen bg-white'>
      {/* 헤더 배너 */}
      <div className="flex flex-col items-center w-full px-4 py-12 mb-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">내 프로필</h1>
        <p className="max-w-2xl mb-6 text-center text-blue-100">나의 정보를 관리하고 취업 수기를 공유하세요</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="w-full max-w-4xl px-4 pb-16">
        {/* 프로필 섹션 */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">프로필 정보</h2>
            {isEditing ? (
              <button
                className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-teal-500 rounded-md hover:bg-teal-600"
                onClick={handleSave}
              >
                저장하기
              </button>
            ) : (
              <button
                className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={toggleEditMode}
              >
                수정하기
              </button>
            )}
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="grid gap-6 md:grid-cols-2">
              {/* 기본 정보 */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="mb-4 text-lg font-medium text-gray-700">기본 정보</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">이름</label>
                    <div className="px-3 py-2 font-medium text-gray-800 bg-white rounded-md">{data?.name}</div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">나이</label>
                    <div className="px-3 py-2 font-medium text-gray-800 bg-white rounded-md">{data?.age}살</div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">회사</label>
                    {isEditing ? (
                      <INPUT
                        classname="w-full px-3 py-2 font-medium text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="회사명"
                        value={editData.company}
                        onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'company' } })}
                        type="text"
                      />
                    ) : (
                      <div className="px-3 py-2 font-medium text-gray-800 bg-white rounded-md">{data?.company}</div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">경력</label>
                    {isEditing ? (
                      <INPUT
                        classname="w-full px-3 py-2 font-medium text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="경력 년수"
                        value={editData.yearsOfExperience}
                        onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'yearsOfExperience' } })}
                        type="number"
                      />
                    ) : (
                      <div className="px-3 py-2 font-medium text-gray-800 bg-white rounded-md">{data?.yearsOfExperience}년차</div>
                    )}
                  </div>
                </div>
              </div>
                    
              {/* 직무 정보 */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50">
                <h3 className="mb-4 text-lg font-medium text-gray-700">직무 정보</h3>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">현재 직무</label>
                  {isEditing ? (
                    <div className="p-3 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-48">
                      <div className="flex flex-wrap gap-2">
                        {options.map(option => (
                          <div
                            key={option}
                            onClick={() => handlePositionClick(option)}
                            className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                              editData.position === option 
                                ? 'bg-teal-500 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="inline-block px-4 py-2 text-sm font-medium text-teal-700 bg-teal-100 rounded-full">
                      {data?.position}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 자기소개 섹션 */}
        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">취업 스토리</h2>
          <div className="p-6 bg-white rounded-lg shadow-md">
            {isEditing ? (
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleChange}
                className="w-full h-48 p-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이력서 작성부터 합격까지의 경험과 노하우를 공유해주세요!"
              />
            ) : (
              <div className="p-4 leading-relaxed text-gray-700 whitespace-pre-line rounded-md bg-gradient-to-r from-blue-50 to-indigo-50">
                {data?.bio || "취업 스토리가 작성되지 않았습니다. '수정하기'를 눌러 나만의 취업 성공 스토리를 공유해보세요!"}
              </div>
            )}
          </div>
        </div>

        {/* 상담 목록 섹션 */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-800">수락한 상담 목록</h2>
          <div className="overflow-hidden bg-white rounded-lg shadow-md">
            {acceptedCounsels.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-white bg-gradient-to-r from-blue-600 to-indigo-700">
                    <tr>
                      <th className="px-6 py-3 text-left">날짜</th>
                      <th className="px-6 py-3 text-left">시간</th>
                      <th className="px-6 py-3 text-left">이름</th>
                      <th className="px-6 py-3 text-left">상담 주제</th>
                      <th className="px-6 py-3 text-left">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {acceptedCounsels.map((counsel, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-700">{counsel.date}</td>
                        <td className="px-6 py-4 text-gray-700">{counsel.time}</td>
                        <td className="px-6 py-4 text-gray-700">{counsel.name}</td>
                        <td className="px-6 py-4 text-gray-700">{counsel.topic}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            counsel.status === '완료' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {counsel.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8">
                <p className="text-gray-500">수락한 상담이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerMypage;