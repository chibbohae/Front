import React, { useState } from 'react';
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

type ReviewProps={

}
const Review:React.FC<ReviewProps> = () =>{
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState<string>('');
    const navigate = useNavigate();
    
    const handleSubmit = () =>{
        // 리뷰 작성 api 호출 
        
        navigate('/main/client')
    }

    return (
        <div className='flex flex-col items-center'>
            {/** 별점 */}
            <div className='w-[100%] flex flex-col items-center mt-16'>
                <p className='text-2xl font-bold'>통화는 만족하셨나요?</p>
                <div className="flex mt-4 space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star
                        key={index}
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(index + 1)}
                        />
                    ))}
                </div>
            </div>
            
            {/** 리뷰 작성 */}
            <div className='w-[100%] h-80 flex flex-col items-center mt-16'>
                <p className='text-2xl font-bold'>리뷰를 작성해주세요</p>
                    {/** INPUT은 한줄 입력만 돼서 줄바꿈 불가 */}
                    <textarea
                        placeholder='파트너에 대해 리뷰를 남겨주세요 !'
                        className='mt-4 p-2 w-[40%] h-64 border-2 border-custom-blue resize-none rounded-2xl placeholder-custom-blue' // resize-none으로 크기 조절 방지
                        value={review}
                        onChange={(e) => setReview(e.target.value)} // 문자열을 직접 받는 핸들러
                    /> 
            </div>

            {/** 버튼 */}
            <div className='flex flex-row w-[30%] justify-between mt-8'>
                <button className='h-10 border-2 text-custom-blue w-36 border-custom-blue rounded-3xl'
                    onClick={()=>navigate('/main/client/ai')}
                    >AI 요약본 보러가기</button>
                <button className='h-10 border-2 text-custom-blue w-36 border-custom-blue rounded-3xl'
                    onClick={handleSubmit}>
                    제출하기</button>
            </div>
        </div>
    )
}

export default Review;