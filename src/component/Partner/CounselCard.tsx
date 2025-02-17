import React from 'react';

type CounselProps = {
    date: string
    time: string;
    name: string;
    simpleQ: string[];
    onClick: (date: string, time: string, name: string, simpleQ: string[]) => void; // onClick prop 추가
};

const CounselCard: React.FC<CounselProps> = ({ date, time, name, simpleQ, onClick }) => {
    return (
        <div 
            className='flex flex-col items-center w-32 h-40 m-4 text-center transition-transform transform bg-white border-2 shadow-md text-custom-blue justify-evenly rounded-xl border-custom-blue/80 shadow-custom-blue/80 hover:-translate-y-1 hover:scale-105'
            onClick={() => onClick(date, time, name, simpleQ)} // 클릭 시 onClick 호출
        >
            <div>{time}</div>
            <div>{name}</div>
        </div>
    );
}

export default CounselCard;
