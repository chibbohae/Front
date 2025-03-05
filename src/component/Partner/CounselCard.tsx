import React from 'react';

type CounselProps = {
  date: string;
  time: string;
  name: string;
  simpleQ: string[];
  imageUrl?: string;
  onClick: (date: string, time: string, name: string, simpleQ: string[], imageUrl: string) => void;
};

const CounselCard: React.FC<CounselProps> = ({ date, time, name, simpleQ, imageUrl = '/api/placeholder/100/100', onClick }) => {
  return (
    <div 
      className="flex flex-col w-full p-5 transition-transform duration-200 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1"
      onClick={() => onClick(date, time, name, simpleQ, imageUrl)}
    >
      <div className="flex items-center mb-4">
        {/* <img 
          src={imageUrl} 
          alt={name} 
          className="w-12 h-12 mr-4 rounded-full" 
        /> */}
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <div className="flex mt-1 space-x-2">
            <span className="px-2 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full">
              {date}
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
              {time}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow">
        <h4 className="mb-2 text-sm font-medium text-gray-600">상담 질문:</h4>
        <ul className="pl-5 mb-4 space-y-1 text-sm text-gray-700 list-disc">
          {simpleQ.slice(0, 2).map((q, idx) => (
            <li key={idx} className="line-clamp-1">{q}</li>
          ))}
          {simpleQ.length > 2 && (
            <li className="text-teal-600">외 {simpleQ.length - 2}개 더보기...</li>
          )}
        </ul>
      </div>
      
      <button className="w-full py-2 mt-2 text-white transition-colors duration-200 bg-teal-500 rounded-md hover:bg-teal-600">
        상세 보기
      </button>
    </div>
  );
};

export default CounselCard;