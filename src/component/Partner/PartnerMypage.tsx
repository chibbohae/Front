import React, { useEffect, useState } from 'react'
import { PartnerData, CheckPartnerMypage, UpdatePartnerData, UpdatePartnerInfo } from '../../api/mypageauth'
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
    // Update position directly in editData
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

  return (
    <div className='w-[100%] flex flex-col items-center'>
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
            <div className='w-[20%] flex font-bold text-2xl pl-8'>회사: </div>
            {isEditing ? (
              <div className='w-[80%] flex justify-center'>
                <INPUT
                  classname='w-[80%] text-2xl font-bold text-center p-1'
                  placeholder='회사명'
                  value={editData.company}
                  onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'company' } })}
                  type='text'
                />
              </div>
            ) : (
              <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.company}</div>
            )}
          </div>
          <div className='flex flex-row w-[100%] h-[30%] items-center'>
            <div className='w-[20%] flex font-bold text-2xl pl-8'>년차: </div>
            {isEditing ? (
              <div className='w-[80%] flex justify-center'>
                <INPUT
                  classname='w-[80%] text-2xl font-bold text-center p-1'
                  placeholder='경력 년수'
                  value={editData.yearsOfExperience}
                  onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'yearsOfExperience' } })}
                  type='number'
                />
              </div>
            ) : (
              <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.yearsOfExperience} 년차</div>
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
          <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>간단한 소개</div>
          {isEditing ? (
            <textarea
              name="bio"
              value={editData.bio}
              onChange={handleChange}
              className='w-[100%] border-2 border-custom-blue rounded-2xl h-[80%] p-2 text-lg pl-8 font-semibold drop-shadow-xl drop-shadow-custom-blue'
              placeholder='자기소개를 입력하세요'
            />
          ) : (
            <div className='w-[100%] border-2 border-custom-blue font-semibold rounded-2xl h-[80%] p-2 text-lg pl-8'>{data?.bio}</div>
          )}
        </div>
      </div>
      <div className='w-[80%] h-64 mt-16'>
        <div className='w-[100%] flex flex-col justify-between h-[100%]'>
          <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>직무</div>
          {isEditing ? (
            <div className='w-[100%] h-[80%] flex justify-center'>
              <div className='flex flex-wrap justify-center w-full p-4 overflow-auto border-2 border-custom-blue rounded-3xl' style={{ maxHeight: '200px' }}>
                {options.map(option => (
                  <div
                    key={option}
                    onClick={() => handlePositionClick(option)}
                    className={`m-2 p-2 border rounded cursor-pointer flex items-center justify-center ${editData.position === option ? 'bg-custom-blue text-white' : 'bg-gray-200'}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='w-[100%] border-2 border-custom-blue rounded-2xl font-semibold h-[80%] p-2 text-lg pl-8'>{data?.position}</div>
          )}
        </div>
      </div>
      <div className='w-[80%] bg-gray-200 h-64 mt-16 mb-16'>
        <div className='w-[100%] flex flex-col justify-between h-[100%]'>
          <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>수락한 상담 목록</div>
        </div>
      </div>
    </div>
  )
}

export default PartnerMypage;