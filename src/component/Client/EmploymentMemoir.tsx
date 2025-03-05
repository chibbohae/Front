import React, { memo } from 'react';

type EmploymentMemoirProps = {
  name: string;
  memoir: string;
  company?: string;
  position?: string;
  imageUrl?: string;
  handleMemoirClick: (name: string, memoir: string, company?: string, position?: string) => void;
}

const EmploymentMemoir: React.FC<EmploymentMemoirProps> = ({ 
  name, 
  memoir, 
  company = "", 
  position = "", 
  imageUrl = "", 
  handleMemoirClick 
}) => {
  return (
    <div 
      className='z-0 flex flex-col w-64 overflow-hidden transition-all bg-white border shadow-lg cursor-pointer h-80 rounded-xl hover:-translate-y-1 hover:shadow-xl sm: w-[80%]'
      onClick={() => { handleMemoirClick(name, memoir, company, position) }}
    >
      {/* 상단 이미지/프로필 영역
      <div className="flex items-center justify-center h-32 bg-gradient-to-r from-blue-400 to-indigo-500">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-16 h-16 border-2 border-white rounded-full" />
        ) : (
          <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-blue-600 bg-blue-200 border-2 border-white rounded-full">
            {name.charAt(0)}
          </div>
        )}
      </div>
       */}
      
      {/* 콘텐츠 영역 */}
      <div className="flex flex-col flex-grow p-4 space-y-2">
        <div className="flex items-center justify-between mb-2 ">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          {company && (
            <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">{company}</span>
          )}
        </div>
        
        <p className="flex-grow mb-3 overflow-hidden text-sm text-gray-600 line-clamp-3">
          {memoir}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          {position && <span className="text-xs text-gray-500">{position}</span>}
          <button className="text-sm text-blue-600 hover:underline">자세히</button>
        </div>
      </div>
    </div>
  )
}

export default memo(EmploymentMemoir);