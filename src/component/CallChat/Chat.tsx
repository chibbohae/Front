import React, { useEffect, useRef, useState } from 'react';
import INPUT from '../INPUT';
import Rarrow from '../../images/right-arrow.png'

type CallProps={
    onComplete: ()=>void
    goBack: ()=>void;
}
const Chat: React.FC<CallProps> = ({onComplete, goBack}) => {
    const [chat, setChat] = useState<string>('');
    const [chatlist, setChatList] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // 스크롤할 요소 참조

    // 메시지를 보내는 버튼
    const handleSend = () => {
        if (chat.trim()) { // 빈 메시지 방지
            setChatList([...chatlist, chat]); // 새로운 채팅 메시지를 추가
            setChat(''); // 입력 필드 초기화
        }
    };

    // 엔터키 눌렸을 때
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend(); // 엔터 키를 눌렀을 때 메시지 전송
        }
    };

    // 메시지 리스트가 변경될 때마다 스크롤 아래로
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
        }
    }, [chatlist]);

    return (
        <div className='flex flex-col items-center justify-center h-[600px]'>
            <div className='flex flex-col justify-between h-[100%] w-[80%] bg-custom-blue/20 rounded-b-xl p-2'>
                <div className='w-[100%] flex flex-row justify-between'>
                    <button className='flex flex-row justify-center w-20 border-2 rounded-lg border-custom-blue'
                        onClick={goBack}>
                        <img src={Rarrow} alt="right-arrow" className='-scale-x-100'/>나가기 
                    </button>
                    <button className='flex flex-row justify-center w-20 border-2 rounded-lg border-custom-blue'
                        onClick={onComplete}>
                        끝내기 <img src={Rarrow} alt="right-arrow" />
                    </button>
                </div>
                
                <div className='flex-grow mb-2 mt-4 overflow-y-auto h-[90%]'>
                    {chatlist.map((message, index) => (
                        <div key={index} className='w-[100%]'>
                            <div 
                                className='inline-block p-2 mb-2 bg-white rounded-lg max-w-[80%] text-custom-blue' 
                                style={{ wordWrap: 'break-word' }}
                            >
                                {message} 
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className='flex flex-row w-[100%] h-[10%]'>
                    <INPUT 
                        placeholder='채팅' 
                        value={chat} 
                        onChange={(e) => setChat(e.target.value)} 
                        onKeyDown={handleKeyDown} // 엔터 키 핸들러 추가
                        classname='text-custom-blue w-[90%]'
                    />
                    <button 
                        className='text-center bg-custom-blue w-[10%] rounded-xl drop-shadow-xl' 
                        onClick={handleSend} // 버튼 클릭 시 메시지 전송
                    >
                        보내기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
