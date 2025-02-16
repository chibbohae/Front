import React, { useEffect, useState } from 'react'
import { CheckPartnerMypage } from '../../api/auth'

// 파트너 마이페이지 응답 타입
export interface PartnerData {
    name: string,
    company: string,
    yearsOfExperience: number,
    age: number,
    bio: string,
    position: string,
    email: string,
    telephone: string
}
const PartnerMypage = () => {
    const [data, setData] = useState<PartnerData | null>(null); // API로부터 받은 데이터를 저장할 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await CheckPartnerMypage(); // API 호출
                setData(res); // 데이터 저장
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    return <div className='w-[100%] flex flex-col items-center'>
        <div className='w-[80%] h-64 mt-16 flex-col flex justify-between'>
            <div className='flex flex-row justify-between px-8 h-[15%]'>
                <div className='text-3xl font-bold'>{data?.name}</div>
                <button className='flex items-center justify-center w-32 border text-custom-blue border-custom-blue rounded-2xl ' onClick={()=>{}}>수정하기</button>
            </div>
            <div className='flex flex-col border-2 rounded-3xl p-4 border-custom-blue w-[100%] h-[80%]'>
                <div className='flex flex-row w-[100%] h-[30%] items-center'>
                    <div className='w-[20%] flex font-bold text-2xl pl-8'>회사: </div>
                    <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.company}</div>
                </div>
                <div className='flex flex-row w-[100%] h-[30%] items-center'>
                    <div className='w-[20%] flex font-bold text-2xl pl-8'>년차: </div>
                    <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.yearsOfExperience} 년차</div>
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
                <div className='w-[100%] border-2 border-custom-blue font-semibold rounded-2xl h-[80%] p-2 text-lg pl-8'>{data?.bio}</div>
            </div>
        </div>
        <div className='w-[80%] h-64 mt-16'>
            <div className='w-[100%] flex flex-col justify-between h-[100%]'>
                <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>취업수기</div>
                <div className='w-[100%] border-2 border-custom-blue rounded-2xl font-semibold h-[80%] p-2 text-lg pl-8'>취업수기</div>
            </div>
        </div>
        <div className='w-[80%] bg-gray-200 h-64 mt-16'>
            <div className='w-[100%] flex flex-col justify-between h-[100%]'>
                <div className='w-[100%] pl-8 font-bold text-2xl h-[15%]'>수락한 상담 목록</div>
                
            </div>
        </div>
    </div>
}

export default PartnerMypage;