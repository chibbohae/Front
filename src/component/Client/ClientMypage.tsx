import React, { useEffect, useState } from 'react'
import { ClientData, CheckClientMypage, UpdateClientData, UpdateClientInfo } from '../../api/mypageauth'
import INPUT from '../INPUT';

const ClientMypage = () => {
    const options = [
        "백엔드 개발", "PM", "프론트엔드 개발", "프로덕트 디자인", "AI / ML",
        "데이터 분석", "PO", "인사", "브랜드 마케팅", "영업 관리",
        "경영지원 / 총무", "퍼포먼스 마케팅", "전략 / 기획", "전략컨설턴트",
        "QA", "정보보안", "데이터 엔지니어", "서비스기획", "회계",
        "KICPA 공인회계사", "게임 클라이언트 개발", "B2B 영업", "DevOps",
        "안드로이드 개발", "UX / UI 디자인", "데이터 사이언스", "그로스 마케팅",
        "BI / BX 디자인", "PD"
    ];
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState<ClientData | null>(null);
    const [editData, setEditData] = useState<UpdateClientData>({
        university: '',
        major: '',
        interest: ''
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await CheckClientMypage();
                setData(res);
                setEditData({
                    university: res.university,
                    major: res.major,
                    interest: res.interest
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
            [name]: value
        });
    };

    const handlePositionClick = (option: string) => {
        setEditData({
          ...editData,
          interest: option
        });
    };
      
    // 수정 모드 전환
    const toggleEditMode = () => {
        if (isEditing) {
            // 수정 모드에서 나갈 때 원본 데이터로 복원
            if (data) {
                setEditData({
                    university: data.university,
                    major: data.major,
                    interest: data.interest
                });
            }
        }
        setIsEditing(!isEditing);
    };
    
    // 데이터 저장
    const handleSave = async () => {
        try {
            await UpdateClientInfo(editData);
            const res = await CheckClientMypage();
            setData(res);
            setIsEditing(false);
        } catch (error) {
            console.error("데이터 업데이트 실패:", error);
        }
    };

    // 상담 목록 샘플 데이터
    const recentConsultations = [
        { 
            date: '2025-03-04', 
            time: '4:00 PM', 
            name: '김멘토', 
            status: '완료',
            company: '삼성전자',
            position: '프론트엔드 개발'
        },
        { 
            date: '2025-03-06', 
            time: '2:00 PM', 
            name: '박멘토', 
            status: '예정',
            company: '네이버',
            position: 'UX / UI 디자인'
        }
    ];

    // 최근 본 파트너 샘플 데이터
    const recentlyViewedPartners = [
        {
            name: '이멘토',
            company: 'LG전자',
            position: 'AI / ML',
            experience: 5
        },
        {
            name: '최멘토',
            company: '카카오',
            position: '백엔드 개발',
            experience: 7
        },
        {
            name: '정멘토',
            company: '현대자동차',
            position: '데이터 분석',
            experience: 4
        }
    ];

    return (
        <div className='flex flex-col items-center min-h-screen bg-white'>
            {/* 헤더 배너 */}
            <div className="flex flex-col items-center w-full px-4 py-12 mb-8 bg-gradient-to-r from-blue-600 to-indigo-700">
                <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">내 프로필</h1>
                <p className="max-w-2xl mb-6 text-center text-blue-100">나의 정보를 관리하고 멘토링을 신청하세요</p>
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
                                        <label className="block mb-1 text-sm font-medium text-gray-600">학교</label>
                                        {isEditing ? (
                                            <INPUT
                                                classname="w-full px-3 py-2 font-medium text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="학교명"
                                                value={editData.university}
                                                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'university' } })}
                                                type="text"
                                            />
                                        ) : (
                                            <div className="px-3 py-2 font-medium text-gray-800 bg-white rounded-md">{data?.university}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-600">학과</label>
                                        {isEditing ? (
                                            <INPUT
                                                classname="w-full px-3 py-2 font-medium text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="학과명"
                                                value={editData.major}
                                                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'major' } })}
                                                type="text"
                                            />
                                        ) : (
                                            <div className="px-3 py-2 font-medium text-gray-800 bg-white rounded-md">{data?.major}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* 관심 직무 정보 */}
                            <div className="p-4 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50">
                                <h3 className="mb-4 text-lg font-medium text-gray-700">관심 직무</h3>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600">원하는 직종</label>
                                    {isEditing ? (
                                        <div className="p-3 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-48">
                                            <div className="flex flex-wrap gap-2">
                                                {options.map(option => (
                                                    <div
                                                        key={option}
                                                        onClick={() => handlePositionClick(option)}
                                                        className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                                                            editData.interest === option 
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
                                            {data?.interest}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 신청한 상담 목록 섹션 */}
                <div className="mb-10">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">신청한 상담 목록</h2>
                    <div className="overflow-hidden bg-white rounded-lg shadow-md">
                        {recentConsultations.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-white bg-gradient-to-r from-blue-600 to-indigo-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left">날짜</th>
                                            <th className="px-6 py-3 text-left">시간</th>
                                            <th className="px-6 py-3 text-left">멘토</th>
                                            <th className="px-6 py-3 text-left">직무</th>
                                            <th className="px-6 py-3 text-left">상태</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {recentConsultations.map((consultation, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-gray-700">{consultation.date}</td>
                                                <td className="px-6 py-4 text-gray-700">{consultation.time}</td>
                                                <td className="px-6 py-4 text-gray-700">{consultation.name}</td>
                                                <td className="px-6 py-4 text-gray-700">{consultation.position}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                        consultation.status === '완료' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {consultation.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center p-8">
                                <p className="text-gray-500">신청한 상담이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 최근 본 파트너 섹션 */}
                <div>
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">최근 본 파트너</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {recentlyViewedPartners.map((partner, index) => (
                            <div key={index} className="overflow-hidden transition-shadow duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
                                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700">
                                    <h3 className="text-lg font-bold text-white">{partner.name}</h3>
                                    <p className="text-sm text-blue-100">{partner.company}</p>
                                </div>
                                <div className="p-4">
                                    <div className="mb-2">
                                        <span className="px-3 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full">
                                            {partner.position}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">경력 {partner.experience}년</p>
                                    <button className="w-full px-4 py-2 mt-4 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700">
                                        프로필 보기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientMypage;