// import React, { useEffect, useRef, useState } from 'react';
// import INPUT from '../INPUT';
// import Rarrow from '../../images/right-arrow.png'
// import { SeparatorHorizontal } from 'lucide-react';
// import createSocket from "../../server"
// import { io } from "socket.io-client";
// const socket = createSocket();

// type CallProps={
//     onComplete: ()=>void
//     goBack: ()=>void;
// }
// const Chat: React.FC<CallProps> = ({onComplete, goBack}) => {
//     const [user, setUser] = useState<string>("");
//     const [partner, setPartner] = useState<string>("");
//     const [chat, setChat] = useState<string>('');
//     const [chatlist, setChatList] = useState<{ sender: string, message: string }[]>([]);
//     const messagesEndRef = useRef<HTMLDivElement | null>(null); // 스크롤할 요소 참조
//     const socketRef = useRef<any>(null);

//     useEffect(() => {
//         socketRef.current = io("http://localhost:5001");
    
//         return () => {
//             socketRef.current.disconnect();
//         };
//     }, []);
    
//     useEffect(() => {
//         socketRef.current.on("chat_message", (messageData :any) => {
//             console.log("📥 메시지 받음:", messageData);
//             setChatList((prev) => [...prev, messageData]);
//         });
    
//         return () => {
//             socketRef.current.off("chat_message");
//         };
//     }, []);

//     // 메시지를 보내는 버튼
//     const handleSend = () => {
//         if (chat.trim() && user) {
//             const messageData = {
//                 sender: user,
//                 receiver: partner,
//                 message: chat
//             };
    
//             setChatList(prev => [...prev, { sender: user, message: chat }]);
//             setChat('');
    
//             socket.emit("chat_message", messageData);
//         }
//     };

//     // 엔터키 눌렸을 때
//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             handleSend(); // 엔터 키를 눌렀을 때 메시지 전송
//         }
//     };

//     // 처음 들어왔을 때
//     useEffect(() => {
//         setUser(localStorage.getItem("userId") || "");
//         setPartner(localStorage.getItem("partnerId") || "");
//     }, []);

//     // 상대방 채팅을 실시간 듣기
//     useEffect(() => {
//         if (user && partner) {
//             socket.emit("login", user, partner, (res: any) => {
//                 console.log("Res", res);
//             });
    
//             // login 후 리스너 등록
//             socket.on("chat_message", (messageData) => {
//                 console.log("📥 받음:", messageData);
//                 setChatList(prev => [...prev, messageData]);
//             });
    
//             return () => {
//                 socket.off("chat_message");
//             };
//         }
//     }, [user, partner]);
      

//     // 메시지 리스트가 변경될 때마다 스크롤 아래로
//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
//         }
//     }, [chatlist]);

//     return (
//         <div className='flex flex-col items-center justify-center h-[600px]'>
//             <div className='flex flex-col justify-between h-[100%] w-[80%] bg-custom-blue/20 rounded-b-xl p-2'>
//                 <div className='w-[100%] flex flex-row justify-between'>
//                     <button className='flex flex-row justify-center w-20 border-2 rounded-lg border-custom-blue'
//                         onClick={goBack}>
//                         <img src={Rarrow} alt="right-arrow" className='-scale-x-100'/>나가기 
//                     </button>
//                     <button className='flex flex-row justify-center w-20 border-2 rounded-lg border-custom-blue'
//                         onClick={onComplete}>
//                         끝내기 <img src={Rarrow} alt="right-arrow" />
//                     </button>
//                 </div>
                
//                 <div className='flex-grow mb-2 mt-4 overflow-y-auto h-[90%]'>
//                     {chatlist.map((chatItem, index) => (
//                         <div key={index} className={`w-full flex ${chatItem.sender === user ? 'justify-end' : 'justify-start'}`}>
//                             <div 
//                                 className={`inline-block p-2 mb-2 rounded-lg max-w-[80%] ${chatItem.sender === user ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
//                                 style={{ wordWrap: 'break-word' }}
//                             >
//                                 {chatItem.message} 
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                 </div>
//                 <div className='flex flex-row w-[100%] h-[10%]'>
//                     <INPUT 
//                         placeholder='채팅' 
//                         value={chat} 
//                         onChange={(e) => setChat(e.target.value)} 
//                         onKeyDown={handleKeyDown} // 엔터 키 핸들러 추가
//                         classname='text-custom-blue w-[90%]'
//                     />
//                     <button 
//                         className='text-center bg-custom-blue w-[10%] rounded-xl drop-shadow-xl' 
//                         onClick={handleSend} // 버튼 클릭 시 메시지 전송
//                     >
//                         보내기
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;
