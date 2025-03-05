import React, { memo } from 'react';

type PartnerCardProps = {
  name: string;
  bio: string;
  company: string;
  year: string;
  imageUrl?: string;
  handleCardClick: (name: string, bio: string, company: string, year: string) => void
}

const PartnerCard: React.FC<PartnerCardProps> = ({ 
  name, 
  bio, 
  company, 
  year, 
  imageUrl = "", 
  handleCardClick 
}) => {
  return (
    <div 
      className="flex w-full max-w-sm overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md hover:-translate-y-1"
      onClick={() => handleCardClick(name, bio, company, year)}
    >
      {/* 프로필 이미지 영역 
      <div className="flex items-center justify-center w-1/3 p-4 bg-gradient-to-b from-teal-400 to-emerald-500">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-16 h-16 border-2 border-white rounded-full" />
        ) : (
          <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-teal-600 bg-teal-100 border-2 border-white rounded-full">
            {name.charAt(0)}
          </div>
        )}
      </div>
      */}
      
      {/* 콘텐츠 영역 */}
      <div className="w-2/3 p-4">
        <div className="flex flex-col h-full">
          <h3 className="mb-1 text-lg font-semibold text-gray-800">{name}</h3>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="px-2 py-1 text-xs text-teal-800 bg-teal-100 rounded-full">{company}</span>
            <span className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">{year}년차</span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(PartnerCard);