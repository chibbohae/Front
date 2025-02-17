import React from 'react';

type CalenderProps = {
    counselData: { date:string, time: string; name: string; simpleQ: string[] }[]
}

//이번주 달력 보여주기
const Calender:React.FC<CalenderProps> = ({counselData}) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = new Date();
    
    // 현재 주의 시작일 (일요일)
    const startOfWeek = week.getDate() - week.getDay();
    
    // 일주일 날짜 배열 생성
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(week.setDate(startOfWeek + i));
        return { day: days[i], date: date.getDate() };
    });

    return (
        <div className='w-[80%]'>
            <table className='w-[100%]'>
                <thead className='flex justify-center w-[100%]'>
                    <tr className='flex justify-evenly w-[100%]'>
                        {days.map(day => (
                            <th className='w-[15%]' key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='flex justify-center w-[100%]'>
                    <tr className='flex justify-evenly w-[100%] border border-custom-blue/80 devided-x-4 h-32'>
                        {weekDates.map(({ day, date }) => (
                            <td className={`w-[15%] text-end text-custom-blue pr-2 border border-custom-blue/80 ${day==='Sun'||day==='Sat' ? 'bg-custom-blue/20':''}`} key={day}>
                                {date}
                                {counselData.map((counsel) => 
                                    new Date(counsel.date).getDate() === date ? (
                                        <div className='text-center text-custom-blue' key={counsel.time}>
                                            <div>{counsel.time} {counsel.name}</div>
                                        </div>
                                    ) : null
                                )}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Calender;