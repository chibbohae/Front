import React from 'react';

const Home:React.FC = () => {
    return (
    <div>
        <div className='flex h-[500px] p-4 text-lg bg-custom-blue/50'>
            <div className='w-1/2 p-16 text-5xl font-bold'>
                어쩌고 저쩌고 우리 사이트 설명
            </div>
            <div className='w-1/2 p-32 text-xl'>
                부연설명 + 등등
            </div>
        </div>
        <div className='flex flex-row justify-around mt-20 mb-20'>
            <Card explan='어쩌고 저쩌고 설명충' />
            <Card explan='어쩌고 저쩌고 설명충' />
            <Card explan='어쩌고 저쩌고 설명충' />
        </div>
    </div>
    )
}


type CardProps = {
    explan : string;
}
const Card:React.FC<CardProps> = ({explan}) => {
    return (
        <div className='w-64 text-xl font-bold text-center border-2 shadow-lg h-80 place-content-center border-custom-blue rounded-3xl text-custom-blue'>
            {explan}
        </div>
    )
}

export default Home;