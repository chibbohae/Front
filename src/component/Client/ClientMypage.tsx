
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
    const [data, setData] = useState<ClientData | null>(null); // API로부터 받은 데이터를 저장할 상태
    const [editData, setEditData] = useState<UpdateClientData>({
        university: '',
        major: '',
        interest: ''
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await CheckClientMypage(); // API 호출
                setData(res); // 데이터 저장
                setEditData({
                    university: res.university,
                    major: res.major,
                    interest: res.interest
                });
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };
        fetchData(); // 데이터 가져오기 함수 호출
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    // 입력 필드 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: name === 'yearsOfExperience' ? parseInt(value.toString()) || 0 : value
        });
    };

    const handlePositionClick = (option: string) => {
        // Update position directly in editData
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


    return <div className='w-[100%] flex flex-col items-center'>
        <div className='w-[80%] h-64 mt-16 flex-col flex justify-between'>
            <div className='flex flex-row justify-between px-8 h-[15%]'>
                <div className='text-3xl font-bold'>{data?.name}</div>
                {isEditing ? (
                    <button
                    className='flex items-center justify-center w-32 border text-custom-blue border-custom-blue rounded-2xl'
                    onClick={handleSave}
                    >
                    저장하기
                    </button>
                ) : (
                    <button
                    className='flex items-center justify-center w-32 border text-custom-blue border-custom-blue rounded-2xl'
                    onClick={toggleEditMode}
                    >
                    수정하기
                    </button>
                )}
            </div>
            <div className='flex flex-col border-2 rounded-3xl p-4 border-custom-blue w-[100%] h-[80%]'>
                <div className='flex flex-row w-[100%] h-[30%] items-center'>
                    <div className='w-[20%] flex font-bold text-2xl pl-8'>학교: </div>
                    {isEditing ? (
                        <div className='w-[80%] flex justify-center'>
                            <INPUT
                                classname='w-[80%] text-2xl font-bold text-center p-1'
                                placeholder='학교명'
                                value={editData.university}
                                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'university' } })}
                                type='text'
                            />
                        </div>
                    ) : (
                        <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.university}</div>
                    )}
                </div>
                <div className='flex flex-row w-[100%] h-[30%] items-center'>
                    <div className='w-[20%] flex font-bold text-2xl pl-8'>학과: </div>
                    {isEditing ? (
                        <div className='w-[80%] flex justify-center'>
                            <INPUT
                                classname='w-[80%] text-2xl font-bold text-center p-1'
                                placeholder='학과'
                                value={editData.major}
                                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'major' } })}
                                type='text'
                            />
                        </div>
                    ) : (
                        <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.major}</div>
                    )}
                </div>
                <div className='flex flex-row w-[100%] h-[30%] items-center'>
                    <div className='w-[20%] flex font-bold text-2xl pl-8'>나이: </div>
                    <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.age} 살</div>
                </div>
            </div>
        </div>
        <div className='w-[80%] h-64 mt-16'>
            <div className='w-[100%] flex flex-col justify-between h-[100%]'>
                <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>원하는 직종</div>
                {isEditing ? (
                <div className='w-[100%] h-[80%] flex justify-center'>
                    <div className='flex flex-wrap justify-center w-full p-4 overflow-auto border-2 border-custom-blue rounded-3xl' style={{ maxHeight: '200px' }}>
                        {options.map(option => (
                        <div
                            key={option}
                            onClick={() => handlePositionClick(option)}
                            className={`m-2 p-2 border rounded cursor-pointer flex items-center justify-center ${editData.interest === option ? 'bg-custom-blue text-white' : 'bg-gray-200'}`}
                        >
                            {option}
                        </div>
                        ))}
                    </div>
                </div>
          ) : (
            <div className='w-[100%] border-2 border-custom-blue rounded-2xl font-semibold h-[80%] p-2 text-lg pl-8'>{data?.interest}</div>
          )}
            </div>
        </div>
        <div className='w-[80%] bg-gray-200 h-64 mt-16'>
            <div className='w-[100%] flex flex-col justify-between h-[100%]'>
                <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>신청한 상담 목록</div>
                
            </div>
        </div>
        <div className='w-[80%] bg-gray-200 h-64 mt-16'>
            <div className='w-[100%] flex flex-col justify-between h-[100%]'>
                <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>최근 본 파트너</div>
                
            </div>
        </div>
    </div>
}

export default ClientMypage;