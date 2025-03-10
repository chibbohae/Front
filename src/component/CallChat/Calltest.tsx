import React, { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

type CalltestProps = {
    onComplete?: () => void;
};

const Calltest: React.FC<CalltestProps> = ({ onComplete }) => {
    const [status, setStatus] = useState("대기 중");
    const [incomingCall, setIncomingCall] = useState<{ caller_id: string } | null>(null);
    const [callMessage, setCallMessage] = useState("");
    const [currentCallId, setCurrentCallId] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
    const [callEnded, setCallEnded] = useState(false);
    const [callerIsMe, setCallerIsMe] = useState(false);

    // References
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const ws = useRef<Socket | null>(null);
    const localStream = useRef<MediaStream | null>(null);
    const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const localAudioRef = useRef<HTMLAudioElement | null>(null);

    const userId = useMemo(() => {
        const storedId = localStorage.getItem("userId");
        console.log("userId: ", storedId);
        return storedId;
    }, []);

    const partnerId = useMemo(() => {
        const storedId = sessionStorage.getItem("partnerId");
        if (storedId) return storedId;
        const newId = `user_${Math.floor(Math.random() * 1000)}`;
        sessionStorage.setItem("partnerId", newId);
        return newId;
    }, []);

    // URL을 http에서 https로, ws에서 wss로 변경
    const apiUrl = "http://15.164.104.129:8000"; // 서버가 https를 지원하지 않는 경우 http 유지
    const socketUrl = `ws://15.164.104.129:8000/signaling/ws/${userId}`; // 서버가 wss를 지원하지 않는 경우 ws 유지


    const startRecording = async (stream: MediaStream) => {
        if (isRecording) {
            console.log("이미 녹음 중입니다");
            return;
        }
    
        try {
            const audioContext = new AudioContext();
            const destination = audioContext.createMediaStreamDestination();

            // 로컬 스트림 (내 목소리) 추가
            if (localStream.current) {
                const localSource = audioContext.createMediaStreamSource(localStream.current);
                localSource.connect(destination);
            }

            // 원격 스트림 (상대방 목소리) 추가
            const remoteSource = audioContext.createMediaStreamSource(stream);
            remoteSource.connect(destination);

            const mixedStream = destination.stream;

            let options: MediaRecorderOptions = {};
            if (MediaRecorder.isTypeSupported('audio/mp4')) {
                options.mimeType = 'audio/mp4';
            } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                options.mimeType = 'audio/webm;codecs=opus';
            } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                options.mimeType = 'audio/webm';
            }

            if (options.mimeType) {
                options = {
                    ...options,
                    audioBitsPerSecond: 128000 // 128kbps
                };
            }

            const mediaRecorder = new MediaRecorder(mixedStream, options);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    console.log(`녹음 데이터 수신: ${event.data.size} bytes`);
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                console.log("녹음 중지: 청크 수", audioChunksRef.current.length);
                
                if (audioChunksRef.current.length === 0) {
                    console.error("녹음된 오디오 데이터가 없습니다");
                    return;
                }
                
                // mp4를 우선적으로 사용하도록 설정
                const mimeType = options.mimeType || 'audio/mp4';
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: mimeType
                });
        
                if (audioBlob.size < 1000) {
                    console.error("오디오 데이터가 너무 작습니다:", audioBlob.size);
                    return;
                }
        
                console.log("오디오 Blob 생성 완료:", audioBlob.size, "bytes, type:", mimeType);
                
                const url = URL.createObjectURL(audioBlob);
                setRecordedAudioUrl(url);
                
                // 확장자를 mime 타입에 따라 결정
                const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
                console.log(`파일 확장자: ${extension}`);
                
                // 파일 자동 다운로드는 제거하고 UI에서 다운로드 버튼으로 처리
                setCallEnded(true);
            };

            mediaRecorder.start(1000);
            setIsRecording(true);
            console.log("녹음이 시작되었습니다");
            
        } catch (error) {
            console.error("녹음 시작 실패:", error);
            setStatus("녹음 시작 실패");
        }
    };

    const stopRecording = () => {
        console.log("stopRecording 호출됨, isRecording:", isRecording);
        if (mediaRecorderRef.current && isRecording) {
            console.log("미디어 레코더 중지 실행");
            try {
                mediaRecorderRef.current.stop();
                console.log("미디어 레코더 중지 완료");
            } catch (error) {
                console.error("미디어 레코더 중지 중 오류:", error);
            }
            setIsRecording(false);
        } else {
            console.log("미디어 레코더가 없거나 녹음 중이 아님:", !!mediaRecorderRef.current, isRecording);
        }
    };

    const createPeerConnection = async () => {
        console.log("peer connection 생성 시작");
        peerConnection.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate && currentCallId) {
                ws.current?.emit("ice_candidate", { 
                    call_id: currentCallId, 
                    candidate: event.candidate,
                    caller_id: userId,
                    receiver_id: partnerId,
                });
            }
        };

        peerConnection.current.ontrack = (event) => {
            console.log("원격 오디오 트랙 수신됨");
            if (remoteAudioRef.current) {
                remoteAudioRef.current.srcObject = event.streams[0];
                remoteAudioRef.current.play().catch(err => console.error("원격 오디오 재생 실패:", err));
            }

            if (event.streams[0]) {
                console.log("녹음 시작 시도");
                startRecording(event.streams[0]);
            }
        };

        try {
            const constraints = {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 48000,
                    channelCount: 1
                }
            };
            console.log("미디어 스트림 획득 시도:", constraints);
            
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStream.current = stream;
            
            // 로컬 오디오 미리듣기 설정 (음소거 상태)
            if (localAudioRef.current) {
                localAudioRef.current.srcObject = stream;
                localAudioRef.current.muted = true; // 피드백 방지
                localAudioRef.current.play().catch(err => console.error("로컬 오디오 재생 실패:", err));
            }
            
            stream.getTracks().forEach(track => {
                console.log("트랙 추가:", track.kind, track.label);
                peerConnection.current?.addTrack(track, stream);
            });
            
            console.log("미디어 스트림 획득 성공");
        } catch (error) {
            console.error("오디오 스트림 획득 실패:", error);
            setStatus("마이크 접근 실패");
        }
    };

    const makeCall = async () => {
        setStatus("전화 거는 중...");
        setCallerIsMe(true);
        await createPeerConnection();
        
        try {
            // 1. 서버에 통화 요청 - API 엔드포인트 수정
            const response = await axios.post(`${apiUrl}/call/request`, { 
                caller_id: userId, 
                receiver_id: partnerId 
            });
            
            // call_id 저장
            const callId = response.data.call_id;
            setCurrentCallId(callId);
            
            // 2. WebSocket을 통해 수신자에게 incoming_call 이벤트 전송
            ws.current?.emit("incoming_call", { 
                caller_id: userId, 
                receiver_id: partnerId,
                call_id: callId
            });
    
            // 3. Offer 생성 및 전송
            const offer = await peerConnection.current?.createOffer();
            await peerConnection.current?.setLocalDescription(offer);
            console.log("offer: ", offer);
            ws.current?.emit("offer", { 
                caller_id: userId, 
                receiver_id: partnerId, 
                call_id: callId,
                sdp: offer,
            });
        } catch (error) {
            console.error("전화 연결 실패:", error);
            setStatus("전화 연결 실패");
            cleanupCall();
        }
    };
    
    const acceptCall = async () => {
        if (!incomingCall) return;
        
        setStatus("전화 받는 중...");
        setCallerIsMe(false);
        await createPeerConnection();
        
        try {
            // 1. 서버에 통화 수락 요청 - API 엔드포인트 수정
            const response = await axios.post(`${apiUrl}/call/answer`, { 
                caller_id: incomingCall.caller_id, 
                receiver_id: userId, 
                accepted: true 
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                // httpsAgent 설정 제거
            });
            
            // call_id 저장
            if (response.data.call_id) {
                setCurrentCallId(response.data.call_id);
                
                // 2. WebSocket을 통해 발신자에게 call_answer 이벤트 전송
                ws.current?.emit("call_answer", { 
                    caller_id: incomingCall.caller_id, 
                    call_id: response.data.call_id 
                });
            }
            
            setStatus("통화 중");
            setCallMessage("");
            setIncomingCall(null);
        } catch (error) {
            console.error("통화 수락 실패:", error);
            setStatus("통화 수락 실패");
            cleanupCall();
        }
    };

    const rejectCall = async () => {
        if (!incomingCall) return;
        
        try {
            // 1. 서버에 통화 거절 요청 - API 엔드포인트 수정
            await axios.post(`${apiUrl}/call/answer`, { 
                caller_id: incomingCall.caller_id, 
                receiver_id: userId, 
                accepted: false 
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                // httpsAgent 설정 제거
            });
            
            // 2. WebSocket을 통해 발신자에게 call_reject 이벤트 전송
            ws.current?.emit("call_reject", { 
                caller_id: incomingCall.caller_id 
            });
            
            setStatus("통화 거절됨");
            setIncomingCall(null);
            setCallMessage("");
        } catch (error) {
            console.error("통화 거절 실패:", error);
            setStatus("통화 거절 실패");
        }
    };

    const handleOffer = async (data: { from: string; offer: RTCSessionDescriptionInit; call_id: string }) => {
        try {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                
                // Answer 생성 및 전송
                const answer = await peerConnection.current?.createAnswer();
                await peerConnection.current?.setLocalDescription(answer);
                
                ws.current?.emit("answer", { 
                    caller_id: data.from, 
                    call_id: data.call_id, 
                    sdp: answer 
                });
                
                console.log("Answer 전송 완료");
            }
        } catch (error) {
            console.error("Offer 처리 실패:", error);
        }
    };
    
    const cleanupCall = () => {
        // 먼저 녹음 중지
        stopRecording();

        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        if (localStream.current) {
            localStream.current.getTracks().forEach(track => {
                track.stop();
            });
            localStream.current = null;
        }
        
        setIncomingCall(null);
    };

    const endCall = async () => {
        // 녹음 중지를 먼저 실행
        stopRecording();
        
        if (currentCallId) {
            try {
                // 1. 서버에 통화 종료 요청 - API 엔드포인트 수정, 요청 형식 수정
                await axios.post(`${apiUrl}/call/end`, { 
                    call_id: currentCallId 
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                    // httpsAgent 설정 제거
                });
                
                // 2. WebSocket을 통해 상대방에게 call_end 이벤트 전송
                ws.current?.emit("call_end", { 
                    call_id: currentCallId, 
                    receiver_id: incomingCall ? incomingCall.caller_id : partnerId 
                });
                
                setCurrentCallId(null);
            } catch (error) {
                console.error("통화 종료 요청 실패:", error);
            }
        }

        // 다른 리소스 정리
        cleanupCall();
        
        setCallMessage("");
        setStatus("통화 종료됨");
        
        if (onComplete) {
            onComplete();
        }
    };

    useEffect(() => {
        console.log("컴포넌트 마운트: WebSocket 연결 시도");
    
        ws.current = io(socketUrl, { 
            transports: ["websocket"],
            withCredentials: true, // 서버가 credentials 허용해야 함
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000
        });
        
        ws.current.on("connect", () => {
            console.log("✅ WebSocket 연결 성공!");
            ws.current?.emit("join", { userId });
        });
        
        // 수신자: 통화 요청 수신
        ws.current.on("incoming_call", (data) => {
            console.log("수신된 통화 요청:", data);
            setIncomingCall({
                caller_id: data.caller_id,
                // 필요한 다른 필드들도 추가
            });
            setCallMessage(`📞 ${data.caller_id} 님의 전화가 왔습니다!`);
            // call_id도 저장
            setCurrentCallId(data.call_id);
        });
        
        // 수신자: Offer 수신
        ws.current.on("offer", (data) => {
            console.log("Offer 수신:", data);
            handleOffer(data);
        });
            
        // 발신자: 통화 수락 수신
        ws.current.on("call_answer", (data) => {
            console.log("통화 수락 수신:", data);
            setStatus("통화 연결됨");
            if (localStream.current) {
                startRecording(localStream.current);
            }
        });
        
        // 발신자: 통화 거절 수신
        ws.current.on("call_reject", () => {
            console.log("통화 거절 수신");
            setStatus("통화 거절됨");
            cleanupCall();
        });
        
        // Answer 수신
        ws.current.on("answer", async (data) => {
            console.log("Answer 수신:", data);
            if (peerConnection.current) {
                try {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
                    setStatus("통화 중");
                } catch (error) {
                    console.error("Answer 처리 실패:", error);
                }
            }
        });
        
        // ICE candidate 수신
        ws.current.on("ice_candidate", async (data) => {
            console.log("ICE candidate 수신");
            if (peerConnection.current) {
                try {
                    await peerConnection.current.addIceCandidate(data.candidate);
                } catch (e) {
                    console.error("ICE candidate 추가 실패:", e);
                }
            }
        });
        
        // 통화 종료 이벤트 수신
        ws.current.on("call_end", () => {
            console.log("통화 종료 이벤트 수신");
            setStatus("상대방이 통화를 종료했습니다");
            stopRecording(); // 상대방이 종료해도 녹음 파일 생성
            cleanupCall();
            setCallEnded(true);
        });
        
        return () => {
            console.log("컴포넌트 언마운트: 연결 정리");
            if (ws.current?.connected) {
                ws.current.emit("leave", { userId });
                ws.current.disconnect();
            }
            cleanupCall();
        };
    }, [userId]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h2>{status}</h2>
            <p>내 ID: {userId}</p>
            <p>상대방 ID: {partnerId}</p>
            {callMessage && <p className="text-red-500">{callMessage}</p>}
            
            {incomingCall ? (
                <div className="p-4 text-center bg-gray-200 rounded shadow">
                    <p>📞 {incomingCall.caller_id} 님의 전화</p>
                    <button onClick={acceptCall} className="p-2 m-2 text-white bg-green-500 rounded">
                        ✅ 받기
                    </button>
                    <button onClick={rejectCall} className="p-2 m-2 text-white bg-red-500 rounded">
                        ❌ 거절
                    </button>
                </div>
            ) : (
                <>
                    <button 
                        onClick={makeCall} 
                        className="p-2 m-2 text-white bg-green-500 rounded"
                        disabled={status.includes("통화") && !status.includes("종료")}
                    >
                        📞 전화 걸기
                    </button>
                    <button 
                        onClick={endCall} 
                        className="p-2 m-2 text-white bg-red-500 rounded"
                        disabled={status === "대기 중" || status.includes("종료")}
                    >
                        ❌ 전화 종료
                    </button>
                </>
            )}
            
            {/* 디버그 정보 */}
            <div className="mt-2 text-sm text-gray-500">
                <p>통화 상태: {isRecording ? "녹음 중" : "녹음 안함"}</p>
                <p>통화 종료: {callEnded ? "종료됨" : "통화 중"}</p>
            </div>
            
            {/* 녹음된 통화 내용 재생 및 다운로드 */}
            {(recordedAudioUrl || callEnded) && (
                <div className="mt-4">
                    <p>녹음된 통화 내용:</p>
                    {recordedAudioUrl ? (
                        <>
                            <audio 
                                controls 
                                src={recordedAudioUrl} 
                                className="mt-2"
                                onError={(e) => console.error("오디오 재생 오류:", e)}
                            />
                            <div className="mt-2">
                                <a href={recordedAudioUrl} download={`call_recording_${new Date().getTime()}.mp4`} className="p-2 text-white bg-blue-500 rounded">
                                    🎧 녹음본 다운로드 (MP4)
                                </a>
                            </div>
                        </>
                    ) : (
                        <p>녹음 처리 중...</p>
                    )}
                </div>
            )}
            
            {/* 숨겨진 오디오 요소 */}
            <audio 
                ref={remoteAudioRef} 
                autoPlay 
                style={{display: 'none'}} 
                onError={(e) => console.error("원격 오디오 오류:", e)}
            />
            <audio 
                ref={localAudioRef} 
                autoPlay 
                muted 
                style={{display: 'none'}} 
                onError={(e) => console.error("로컬 오디오 오류:", e)}
            />
        </div>
    );
};

export default Calltest;