import React, { memo } from 'react';

type EmploymentMemoirProps = {
    name: string;
    memoir: string;
    handleMemoirClick: (name: string, memoir: string) => void;
}
const EmploymentMemoir: React.FC<EmploymentMemoirProps> = ({ name, memoir, handleMemoirClick }) => {
    return (
        <div className='z-0 flex flex-col items-center justify-around w-64 h-64 p-2 m-4 text-center transition-transform transform bg-white border-2 shadow-lg text-custom-blue rounded-xl border-custom-blue/80 shadow-custom-blue/40 hover:-translate-y-1 hover:scale-105' 
            onClick={() => { handleMemoirClick(name, memoir) }}>
            <div className='w-[100%] flex items-center justify-center text-lg font-bold'>
                {name}
            </div>
            <div className='w-[100%] h-[90%] text-lg overflow-hidden whitespace-normal text-ellipsis'>
                {memoir}
            </div>
        </div>
    )
}

export default EmploymentMemoir;
