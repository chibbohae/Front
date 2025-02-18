import React from 'react';

type PartnerCardProps={
    name:string;
    bio:string;
    componey: string;
    year:string;
    handleCardClick: (name: string, bio: string) => void
}
const PartnerCard:React.FC<PartnerCardProps> = ({ name, bio, componey, year, handleCardClick }) =>{
    return (
        <div className='flex flex-col items-center w-32 h-40 p-8 m-4 text-center transition-transform transform bg-white border-2 shadow-lg text-custom-blue justify-evenly rounded-xl border-custom-blue/80 shadow-custom-blue/40 hover:-translate-y-1 hover:scale-105' 
            onClick={()=>handleCardClick(name,bio)}>
            <p className='text-xl font-bold'>{name}</p>
            <div className='flex flex-col'>
                <p>{componey}</p>
                <p>{year} 년차</p>
            </div>
        </div>
    )
}

export default PartnerCard;