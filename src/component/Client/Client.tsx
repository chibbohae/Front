import React ,{useState, useEffect} from 'react'
import EmploymentMemoir from './EmploymentMemoir'
import PartnerCard from './PartnerCard';

const Client:React.FC = () => {
    const [memoir, setmemoir] = useState<string[]>([]);
    const handleSearch = () =>{
        //검색 api
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='mt-5 mb-20 rounded-lg h-10 shadow-md shadow-custom-blue/50 w-[50%] flex justify-between items-center'>
                <input type="text" placeholder='회사명 & 직무명' className='w-[75%] ml-5'/>
                <button className='w-[15%] mr-3 bg-custom-blue h-[80%] rounded-lg text-white'
                    onClick={handleSearch}>검색하기</button>
            </div>
            <EmploymentMemoir />
            <PartnerCard />
        </div>
    )
}

export default Client;