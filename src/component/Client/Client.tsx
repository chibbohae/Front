import React, { useState } from 'react';
import EmploymentMemoir from './EmploymentMemoir';
import PartnerCard from './PartnerCard';

const Client: React.FC = () => {
    const [modal, setModal] = useState<string>('main');
    const [memoir, setmemoir] = useState<string>(''); //취업수기

    const memoirData = [
        { name: '세한', memoir: '세한의 취업수기' },
        { name: '세한', memoir: '세한의 취업수기' },
        { name: '세한', memoir: '세한의 취업수기' },
        { name: '세한2', memoir: '세한의 취업수기 입니다 하지마 어ㅓㅉㄱ ㅗ어쩌어 ㄹ아니ㅓ밀 이멀 ㅇ니머림 ㄴㅁ라머 럴미ㅏㄴ ㄹ머ㅣㄹ ㅓㅁ리 ㅁㄴ러ㅏㅣ 럼니럼나ㅣㄹ sdfa f dsaf dsaf fdsaf' },
        { name: '세한', memoir: '세한의 취업수기' },
        { name: '세한', memoir: '세한의 취업수기' },
        { name: '세한', memoir: '세한의 취업수기' },
        { name: '세한', memoir: '세한의 취업수기' },
    ];
    
    const partnerData = [
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
        { name: 'wow', bio: 'biobio', componey: '부산대학교', year: '2' },
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
        { name: 'sehan', bio: '안녀어엉', componey: '배민', year: '1' },
    ];
    
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [componey, setComponey] = useState<string>('');

    const handleSearch = () => {
        //검색 api
    }

    // 취업수기 카드 클릭
    const handleMemoirClick = (name: string, memoir: string) => {
        setName(name);
        setmemoir(memoir);
        setModal('memoir');
    }
    
    // 파트너 카드 클릭
    const handleCardClick = (name: string, bio: string, componey: string) => {
        setName(name);
        setBio(bio);
        setComponey(componey);
        setModal('partner');
    }

    const renderModal = () => {
        switch (modal) {
            case 'partner':
                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setModal('main')}>
                        <div className="flex flex-col items-center justify-between w-[50%] min-h-[70%] p-6 bg-white rounded-xl shadow-custom-blue shadow-md z-60"
                            onClick={(e) => e.stopPropagation()}>
                            {name}
                            {bio}
                        </div>
                    </div>
                )
            case 'memoir':
                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setModal('main')}>
                        <div className="flex flex-col items-center justify-between w-[50%] min-h-[70%] p-6 bg-white rounded-xl shadow-custom-blue shadow-md z-60"
                            onClick={(e) => e.stopPropagation()}>
                            {name}
                            {memoir}
                        </div>
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            {renderModal()}
            <div className='mt-5 mb-16 rounded-lg h-10 shadow-md shadow-custom-blue/50 w-[50%] flex justify-between items-center'>
                <input type="text" placeholder='회사명 & 직무명' className='w-[75%] ml-5' />
                <button className='w-[15%] mr-3 bg-custom-blue h-[80%] rounded-lg text-white'
                    onClick={handleSearch}>검색하기</button>
            </div>
            
            {/* 취업수기 카드만 가로 스크롤 가능하게 설정 */}
            <div className='flex flex-col items-center w-full'>
                <div className='text-2xl font-bold'>취업수기</div>
                <div className='flex flex-row w-full overflow-x-auto h-80 no-scrollbar'>
                    {memoirData.map((item, index) => (
                        <div className='flex-shrink-0'> {/* 카드 크기 고정 */}
                            <EmploymentMemoir 
                                key={index}
                                memoir={item.memoir}
                                name={item.name}
                                handleMemoirClick={() => handleMemoirClick(item.name, item.memoir)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
            
            <div className='flex flex-col items-center w-full mt-16'>
                <div className='text-2xl font-bold'>인기 파트너</div>
                <div className='flex flex-row w-full overflow-x-auto no-scrollbar'>
                    {partnerData.slice(0,10).map((item, index) => (
                        <PartnerCard 
                            key={index} 
                            name={item.name}
                            bio={item.bio}
                            componey={item.componey}
                            year={item.year}
                            handleCardClick={() => handleCardClick(item.name, item.bio, item.componey)}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Client;
