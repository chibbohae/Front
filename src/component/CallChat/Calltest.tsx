import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

type CalltestProps = {
    onComplete?: () => void;
};

const Calltest: React.FC<CalltestProps> = ({ onComplete }) => {
    const [status, setStatus] = useState("대기 중");
    const [incomingCall, setIncomingCall] = useState<{ caller_id: string; sdp?: RTCSessionDescriptionInit } | null>(null);
    const [callMessage, setCallMessage] = useState("");
    const [currentCallId, setCurrentCallId] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
    const [callEnded, setCallEnded] = useState(false);
    const [callerIsMe, setCallerIsMe] = useState(false);

    // References
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const localStream = useRef<MediaStream | null>(null);
    const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const localAudioRef = useRef<HTMLAudioElement | null>(null);

    const userId = useMemo(() => {
        let storedId = localStorage.getItem("userId");

        if (!storedId) {
            storedId = `user_${Math.floor(Math.random() * 1000)}`;
            localStorage.setItem("userId", "sehan");
        }

        console.log("✅ 설정된 userId:", storedId);
        return storedId;
    }, []);

    const partnerId = useMemo(() => {
        let storedId = localStorage.getItem("partnerId");

        if (!storedId) {
            storedId = `user_${Math.floor(Math.random() * 1000)}`;
            localStorage.setItem("partnerId", "se");
        }

        console.log("✅ 설정된 partnerId:", storedId);
        return storedId;
    }, []);

    // CORS 프록시 서비스 변경 - cors-anywhere는 현재 제한이 있어 다른 프록시 사용
    // const apiUrl = 'https://adc9-61-42-109-13.ngrok-free.app' // "http://localhost:5001"; // 다른 CORS 프록시 사용
    const apiUrl = `https://api.chibbohae-fastapi.store`;
    
    // WebSocket URL 수정
    const socketUrl = `wss://api.chibbohae-fastapi.store/signaling/ws/${userId}`;

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

        // 이미 존재하는 연결 정리
        if (peerConnection.current) {
            console.log("기존 PeerConnection 정리");
            peerConnection.current.close();
            peerConnection.current = null;
        }

        peerConnection.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate && currentCallId) {
                console.log("❄️ ICE 후보 전송 시도:", event.candidate);
                
                ws.current?.send(JSON.stringify({
                    type: "ice_candidate",
                    // call_id: currentCallId,
                    candidate: event.candidate,
                    caller_id: userId,
                    receiver_id: partnerId,
                }));
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
            }, {
                headers: {
                    'Content-Type': 'application/json'
                    // Access-Control-Allow-Origin 헤더 제거 (CORS 프록시가 처리)
                }
            });

            // call_id 저장
            const callId = response.data.call_id;
            setCurrentCallId(callId);

            // 2. WebSocket을 통해 수신자에게 incoming_call 이벤트 전송
            ws.current?.send(JSON.stringify({
                type: "incoming_call",
                // caller_id: userId,
                receiver_id: partnerId,
                // call_id: callId,
                // sdp: offer,
            }));
            console.log("incoming_call 전송완");

            
        } catch (error) {
            console.error("전화 연결 실패:", error);
            setStatus("전화 연결 실패");
            cleanupCall();
        }
    };

    const handleOffer = async (data: { from: string; sdp: RTCSessionDescriptionInit; call_id: string }) => {
        try {
            console.log("📡 Offer 수신:", data);

            // ✅ 항상 최신 SDP로 덮어쓰기
            setIncomingCall({ caller_id: data.from, sdp: data.sdp });
            setCurrentCallId(data.call_id);
            setCallMessage(`📞 ${data.from} 님이 전화를 걸었습니다!`);
        } catch (error) {
            console.error("🚨 Offer 처리 실패:", error);
        }
    };


    // const handleOffer = async (data: { from: string; sdp: RTCSessionDescriptionInit; call_id: string }) => {
    //     try {
    //         console.log("📡 Offer 수신:", data);

    //         // SDP 정보를 incomingCall에 업데이트
    //         if (incomingCall && incomingCall.caller_id === data.from) {
    //             console.log("✅ 기존 통화 요청에 SDP 정보 추가");
    //             setIncomingCall(prev => prev ? { ...prev, sdp: data.sdp } : null);
    //         } else {
    //             // 새 통화 요청인 경우
    //             console.log("✅ 새 통화 요청과 함께 SDP 정보 설정");
    //             setIncomingCall({ caller_id: data.from, sdp: data.sdp });
    //             setCurrentCallId(data.call_id);
    //             setCallMessage(`📞 ${data.from} 님이 전화를 걸었습니다!`);
    //         }
    //     } catch (error) {
    //         console.error("🚨 Offer 처리 실패:", error);
    //     }
    // };

    const acceptOffer = async () => {
        if (!incomingCall) return;
        console.log(incomingCall);

        console.log("✅ Offer 수락 시작: PeerConnection 설정 중...");

        try {
            // 수락 -> accepted : true
            // return CallResponse(message="통화 수락됨", call_id=call.call_id)
            const response = await axios.post(`${apiUrl}/call/answer`, {
                caller_id: incomingCall.caller_id,  // ✅ 발신자 ID
                receiver_id: userId,                // ✅ 지금 나 (수신자)
                accepted: true
            }, {
                headers: {
                    'Content-Type': 'application/json'
                    // Access-Control-Allow-Origin 헤더 제거 (CORS 프록시가 처리)
                }
            });
            console.log("수락 answer: ",response.data.message);
            
            await createPeerConnection();

            // 3. Offer 생성 및 전송
            const offer = await peerConnection.current?.createOffer();
            await peerConnection.current?.setLocalDescription(offer);
            console.log("offer: ", offer);

            ws.current?.send(JSON.stringify({
                type: "offer",
                caller_id: userId,
                receiver_id: partnerId,
                media_constraints: {
                    "video": false,
                    "audio": true
                },
                sdp: offer,
            }));
            console.log("offer websocket에 전송");

            if (!peerConnection.current) {
                console.error("🚨 PeerConnection 생성 실패");
                return;
            }
            if( !incomingCall.sdp){
                console.error("SDP 없음");
                return;
            }

            console.log("PeerConnection 생성됨:", peerConnection.current.signalingState);

            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(incomingCall.sdp));
            console.log("Remote SDP 설정 완료");

            const answer = await peerConnection.current.createAnswer();
            console.log("Answer 생성됨:", answer);

            await peerConnection.current.setLocalDescription(answer);
            console.log("Local SDP 설정 완료");

            ws.current?.send(JSON.stringify({
                type: "call_answer",
                caller_id: incomingCall.caller_id,
                // call_id: currentCallId
            }));

            ws.current?.send(JSON.stringify({
                type: "answer",
                caller_id: userId,
                receiver_id: incomingCall.caller_id,
                // call_id: currentCallId,
                sdp: answer
            }));

            console.log("📞 Answer 전송 완료", incomingCall.caller_id, "에게");

            setStatus("통화 중");
            setIncomingCall(null);
        } catch (error) {
            console.error("🚨 Answer 처리 실패:", error);
            setStatus("통화 연결 실패");
            cleanupCall();
        }
    };

    const rejectOffer = async () => {
        if (!incomingCall || !currentCallId) return;

        console.log("🚫 Offer 거절");

        // 거절 -> accepted : false
        // return CallResponse(message="통화 수락됨", call_id=call.call_id)
        const response = await axios.post(`${apiUrl}/call/answer`, {
            caller_id: userId,
            receiver_id: partnerId,
            accepted: false
        }, {
            headers: {
                'Content-Type': 'application/json'
                // Access-Control-Allow-Origin 헤더 제거 (CORS 프록시가 처리)
            }
        });
        console.log("거절 answer: ",response.data.message);

        ws.current?.send(JSON.stringify({
            type: "call_reject",
            caller_id: incomingCall.caller_id,
            call_id: currentCallId
        }));

        setStatus("통화 거절됨");
        setIncomingCall(null);
        setCallMessage("");
        cleanupCall();
    };

    const handleAnswer = async (data: { from: string; sdp: RTCSessionDescriptionInit }) => {
        try {
            if (!peerConnection.current) return;

            console.log("📡 Answer 수신:", data);
            console.log("📡 현재 PeerConnection 상태:", peerConnection.current.signalingState);

            if (peerConnection.current.signalingState !== "have-local-offer") {
                console.warn("🚨 Answer를 처리할 수 없는 상태입니다!");
                return;
            }

            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
            console.log("✅ Remote SDP 설정 완료 (Answer 적용됨)");
        } catch (error) {
            console.error("🚨 Answer 처리 실패:", error);
        }
    };

    const cleanupCall = () => {
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
        setCurrentCallId(null);
    };

    const endCall = async () => {
        stopRecording();

        if (currentCallId) {
            try {
                await axios.post(`${apiUrl}/call/end`, {
                    call_id: currentCallId
                });

                ws.current?.send(JSON.stringify({
                    type: "call_end",
                    caller_id: userId,
                    receiver_id: incomingCall ? incomingCall.caller_id : partnerId
                }));

                setCurrentCallId(null);
            } catch (error) {
                console.error("통화 종료 요청 실패:", error);
            }
        }

        cleanupCall();

        setCallMessage("");
        setStatus("통화 종료됨");

        if (onComplete) {
            onComplete();
        }
    };

    useEffect(() => {
        console.log("WebSocket 연결 시도");

        const socket = new WebSocket(socketUrl);

        ws.current = socket;

        ws.current.onopen = () => {
            console.log("✅ WebSocket 연결됨");
            ws.current?.send(JSON.stringify({ type: "join", userId, partnerId }));
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📨 수신:", data);

            if (data.type === "incoming_call") {
                setIncomingCall({ caller_id: data.caller_id });
                setCallMessage(`📞 ${data.caller_id} 님이 전화를 걸었습니다`);
                setCurrentCallId(data.call_id);
            }

            if (data.type === "offer") {
                handleOffer(data);
            }

            if (data.type === "answer") {
                handleAnswer(data);
            }

            if (data.type === "call_answer") {
                setStatus("통화 중");
            }

            if (data.type === "call_reject") {
                setStatus("상대방이 통화를 거절했습니다");
                setCallMessage("");
                cleanupCall();
            }

            if (data.type === "call_end") {
                setStatus("상대방이 통화를 종료했습니다");
                stopRecording();
                cleanupCall();
            }
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket 오류:", error);
        };

        ws.current.onclose = (event) => {
            console.log("WebSocket 연결 종료");
        };

        return () => {
            console.log("🛑 WebSocket 연결 해제");
            ws.current?.close();
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
                    <p>📞 {incomingCall.caller_id} 님이 전화를 걸었습니다</p>
                    <button onClick={acceptOffer} className="p-2 m-2 text-white bg-green-500 rounded">
                        ✅ 받기
                    </button>
                    <button onClick={rejectOffer} className="p-2 m-2 text-white bg-red-500 rounded">
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
