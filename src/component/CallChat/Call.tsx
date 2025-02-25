import React, { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

type CallProps = {
    onComplete: () => void;
};

const apiUrl = "http://localhost:8080"; // API 서버 주소
const socketUrl = "http://localhost:8000"; // WebSocket 서버 주소

const Call: React.FC<CallProps> = ({ onComplete }) => {
    const [status, setStatus] = useState("대기 중");
    const [incomingCall, setIncomingCall] = useState<{ from: string; offer: RTCSessionDescriptionInit } | null>(null);
    const [callMessage, setCallMessage] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

    // References
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const ws = useRef<Socket | null>(null);
    const localStream = useRef<MediaStream | null>(null);
    const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const userId = useMemo(() => {
        const storedId = sessionStorage.getItem("userId");
        if (storedId) return storedId;
        const newId = `user_${Math.floor(Math.random() * 1000)}`;
        sessionStorage.setItem("userId", newId);
        return newId;
    }, []);

    const partnerId = useMemo(() => {
        const storedId = sessionStorage.getItem("partnerId");
        if (storedId) return storedId;
        const newId = `user_${Math.floor(Math.random() * 1000)}`;
        sessionStorage.setItem("partnerId", newId);
        return newId;
    }, []);

    const startRecording = async (stream: MediaStream) => {
        if (isRecording) {
            console.log("이미 녹음 중입니다");
            return;
        }
    
        try {
            const audioContext = new AudioContext();
            const destination = audioContext.createMediaStreamDestination();

            if (localStream.current) {
                const localSource = audioContext.createMediaStreamSource(localStream.current);
                localSource.connect(destination);
            }

            const remoteSource = audioContext.createMediaStreamSource(stream);
            remoteSource.connect(destination);

            const mixedStream = destination.stream;

            let options: MediaRecorderOptions = {};
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                options.mimeType = 'audio/webm;codecs=opus';
            } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                options.mimeType = 'audio/webm';
            }

            if (options.mimeType?.includes('webm')) {
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
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: options.mimeType || 'audio/webm'
                });

                if (audioBlob.size < 1000) {
                    console.error("오디오 데이터가 너무 작습니다");
                    return;
                }

                const url = URL.createObjectURL(audioBlob);
                setRecordedAudioUrl(url);

                const extension = options.mimeType?.includes('webm') ? 'webm' : 'mp4';
                const link = document.createElement("a");
                link.href = url;
                link.download = `call_recording_${new Date().getTime()}.${extension}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            mediaRecorder.start(1000);
            setIsRecording(true);
            console.log("녹음이 시작되었습니다");
            
        } catch (error) {
            console.error("녹음 시작 실패:", error);
            setStatus("녹음 시작 실패");
        }
    };
    
    const createPeerConnection = async () => {
        peerConnection.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                ws.current?.emit("candidate", { candidate: event.candidate, from: userId, to: partnerId });
            }
        };

        peerConnection.current.ontrack = (event) => {
            console.log("📡 상대방 오디오 트랙 수신", event.streams[0].getTracks());
            if (remoteAudioRef.current) {
                remoteAudioRef.current.srcObject = event.streams[0];
            }

            if (event.streams[0]) {
                startRecording(event.streams[0]);
            }
        };

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 48000,
                    channelCount: 1
                } 
            });

            localStream.current = stream;
            stream.getTracks().forEach(track => {
                peerConnection.current?.addTrack(track, stream);
            });

            return stream;
        } catch (error) {
            console.error("오디오 스트림 획득 실패:", error);
            throw error;
        }
    };

    const makeCall = async () => {
        setStatus("전화 거는 중...");
        setCallMessage("전화 중...");
        await createPeerConnection();
        const offer = await peerConnection.current?.createOffer();
        await peerConnection.current?.setLocalDescription(offer);

        ws.current?.emit("offer", { offer, from: userId, to: partnerId });
        
        // API 호출: 통화 요청 전송
        await axios.post(`${apiUrl}/call/request`, {
            caller_id: userId,
            receiver_id: partnerId,
        });
    };

    const acceptCall = async () => {
        if (!incomingCall) return;
        setStatus("전화 받는 중...");
        await createPeerConnection();
        await peerConnection.current?.setRemoteDescription(incomingCall.offer);

        const answer = await peerConnection.current?.createAnswer();
        await peerConnection.current?.setLocalDescription(answer);

        ws.current?.emit("answer", { answer, from: userId, to: incomingCall.from });

        // API 호출: 통화 수락 전송
        await axios.post(`${apiUrl}/call/answer`, {
            caller_id: incomingCall.from,
            receiver_id: userId,
            accepted: true,
        });

        setStatus("통화 중");
        setCallMessage("");
        setIncomingCall(null);
    };

    const declineCall = () => {
        if (incomingCall) {
            ws.current?.emit("decline", { from: userId, to: incomingCall.from });
            
            // API 호출: 통화 거절 전송
            axios.post(`${apiUrl}/call/answer`, {
                caller_id: incomingCall.from,
                receiver_id: userId,
                accepted: false,
            });
        }
        setIncomingCall(null);
    };

    const endCall = async () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }

        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        if (localStream.current) {
            localStream.current.getTracks().forEach(track => {
                track.stop();
            });
        }

        setStatus("통화 종료");
        setCallMessage("");

        // API 호출: 통화 종료 전송
        await axios.post(`${apiUrl}/call/end`, {
            call_id: "여기에 통화 ID를 넣어주세요", // 실제 통화 ID를 넣어야 합니다.
        });

        onComplete(); // 통화 종료 후 추가 작업
    };

    useEffect(() => {
        ws.current = io(socketUrl, { transports: ["websocket"] });
        
        ws.current.on("connect", () => console.log("✅ WebSocket 연결 성공!"));
        ws.current.on("offer", (data) => {
            console.log("📨 Offer 수신:", data);
            setIncomingCall(data);
            setCallMessage(`📞 ${data.from} 님의 전화가 왔습니다!`);
        });

        ws.current.emit("join", { userId });
        
        return () => {
            ws.current?.emit("leave", { userId });
        };
    }, [userId]);

    return (
        <div className="flex flex-col items-center justify-center">
        <h2>{status}</h2>
        {callMessage && <p className="text-red-500">{callMessage}</p>}
        {incomingCall ? (
            <div className="p-4 text-center bg-gray-200 rounded shadow">
                <p>📞 {incomingCall.from} 님의 전화</p>
                <button onClick={acceptCall} className="p-2 m-2 text-white bg-green-500 rounded">✅ 받기</button>
                <button onClick={declineCall} className="p-2 m-2 text-white bg-red-500 rounded">❌ 거절</button>
            </div>
        ) : (
            <>
                <button onClick={makeCall} className="p-2 m-2 text-white bg-green-500 rounded">📞 전화 걸기</button>
                <button onClick={endCall} className="p-2 m-2 text-white bg-red-500 rounded">❌ 전화 종료</button>
            </>
        )}
        <audio ref={remoteAudioRef} autoPlay />

        {/* 녹음된 통화 내용 재생 */}
        {recordedAudioUrl && (
            <div className="mt-4">
                <p>녹음된 통화 내용:</p>
                <audio 
                    controls 
                    src={recordedAudioUrl} 
                    className="mt-2"
                    onError={(e) => console.error("오디오 재생 오류:", e)}
                    onLoadedMetadata={(e) => console.log("오디오 메타데이터 로드됨:", e.currentTarget.duration)}
                />
            </div>
        )}
    </div>
);
};

export default Call;
