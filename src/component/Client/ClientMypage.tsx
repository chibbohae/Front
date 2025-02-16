
import React, { useEffect, useState } from 'react'
import { CheckClientMypage } from '../../api/auth'

// 클라이언트 마이페이지 응답 타입
export interface ClientData{
    name: string,
    university: string,
    age: number,
    major: string,
    interest: string,
    telephone: string,
    email: string
}
const ClientMypage = () => {
    const [data, setData] = useState<ClientData | null>(null); // API로부터 받은 데이터를 저장할 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await CheckClientMypage(); // API 호출
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
                    <div className='w-[20%] flex font-bold text-2xl pl-8'>학교: </div>
                    <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.university}</div>
                </div>
                <div className='flex flex-row w-[100%] h-[30%] items-center'>
                    <div className='w-[20%] flex font-bold text-2xl pl-8'>학과: </div>
                    <div className='w-[80%] flex text-2xl font-bold justify-center'>{data?.major}</div>
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
                <div className='w-[100%] border-2 border-custom-blue font-semibold rounded-2xl h-[80%] p-2 text-lg pl-8'>{data?.interest}</div>
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