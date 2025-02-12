import React from 'react';

type CounselProps = {
    time: string;
    name: string;
    //simpleQ: [];
    onClick: (time: string, name: string) => void; // onClick prop 추가
};

const CounselCard: React.FC<CounselProps> = ({ time, name, onClick }) => {
    return (
        <div 
            className='flex flex-col items-center w-32 h-40 m-4 text-center transition-transform transform bg-white border-2 shadow-lg text-custom-blue justify-evenly rounded-xl border-custom-blue/80 shadow-custom-blue/80 hover:-translate-y-1 hover:scale-105'
            onClick={() => onClick(time, name)} // 클릭 시 onClick 호출
        >
            <div>{time}</div>
            <div>{name}</div>
        </div>
    );
}

export default CounselCard;
