import React from 'react';

type CalendarProps = {
  counselData: { 
    date: string;
    time: string; 
    name: string; 
    simpleQ: string[];
    imageUrl?: string;
  }[]
}

const Calendar: React.FC<CalendarProps> = ({ counselData }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const week = new Date();
  
  // 현재 주의 시작일 (일요일)
  const startOfWeek = week.getDate() - week.getDay();
  
  // 일주일 날짜 배열 생성
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(week);
    date.setDate(startOfWeek + i);
    return { 
      day: days[i], 
      date: date.getDate(),
      fullDate: date.toISOString().split('T')[0] // YYYY-MM-DD 형식
    };
  });

  const getAppointmentsForDate = (dateString: string) => {
    return counselData.filter(counsel => 
      counsel.date === dateString
    );
  };

  return (
    <div className="w-full overflow-hidden">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div 
            key={day} 
            className={`text-center py-2 font-semibold rounded-t-lg 
              ${day === 'Sun' ? 'text-red-500' : day === 'Sat' ? 'text-blue-600' : 'text-gray-700'}`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* 날짜 그리드 */}
      <div className="grid h-64 grid-cols-7 gap-1">
        {weekDates.map(({ day, date, fullDate }) => {
          const dayAppointments = getAppointmentsForDate(fullDate);
          const isWeekend = day === 'Sun' || day === 'Sat';
          
          return (
            <div 
              key={day + date} 
              className={`relative flex flex-col rounded-lg shadow-sm border 
                ${isWeekend ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
            >
              {/* 날짜 표시 */}
              <div className={`text-right p-2 
                ${day === 'Sun' ? 'text-red-500' : day === 'Sat' ? 'text-blue-600' : 'text-gray-700'}`}>
                <span className="font-semibold">{date}</span>
              </div>
              
              {/* 일정 표시 */}
              <div className="flex-grow px-1 overflow-y-auto">
                {dayAppointments.map((appointment, index) => (
                  <div 
                    key={index}
                    className="px-2 py-1 mb-1 text-xs text-white rounded-md shadow-sm bg-gradient-to-r from-blue-400 to-blue-500"
                  >
                    <div className="font-semibold truncate">{appointment.time}</div>
                    <div className="truncate">{appointment.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;