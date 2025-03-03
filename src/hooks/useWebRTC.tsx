import { useState, useRef, useEffect } from "react";

const SIGNALING_SERVER_URL = "ws://localhost:3001/";
const ICE_SERVERS = [{ urls: "stun:stun.l.google.com:19302" }];

type SignalMessage = {
  type: string;
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
  caller_id?: string;
  receiver_id?: string;
  call_id?: string;
};

export const useWebRTC = (userId: string) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(SIGNALING_SERVER_URL);
    socket.current.onmessage = handleSignalMessage;
    return () => socket.current?.close();
  }, []);

  const handleSignalMessage = async (message: MessageEvent) => {
    const data: SignalMessage = JSON.parse(message.data);
    
    if (!isCallActive) return;

    switch (data.type) {
      case "offer":
        await handleOffer(data);
        break;
      case "answer":
        await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(data.sdp!));
        break;
      case "ice_candidate":
        await peerConnection.current?.addIceCandidate(new RTCIceCandidate(data.candidate!));
        break;
      case "call_end":
        endCall();
        break;
    }
  };

  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current?.send(JSON.stringify({
          type: "ice_candidate",
          candidate: event.candidate,
          call_id: "some-call-id",
        }));
      }
    };
    peerConnection.current.ontrack = (event) => setRemoteStream(event.streams[0]);
  };

  const startCall = async (receiverId: string) => {
    createPeerConnection();
    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true }); // 🎙️ 음성만 사용
    localStream.getTracks().forEach((track) => peerConnection.current?.addTrack(track, localStream));
    
    const offer = await peerConnection.current?.createOffer();
    await peerConnection.current?.setLocalDescription(offer!);
    
    socket.current?.send(JSON.stringify({ type: "offer", receiver_id: receiverId, sdp: offer }));
    setIsCallActive(true);
    console.log("통화시작");
  };

  const handleOffer = async (data: SignalMessage) => {
    createPeerConnection();
    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true }); // 🎙️ 음성만 사용
    localStream.getTracks().forEach((track) => peerConnection.current?.addTrack(track, localStream));

    await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(data.sdp!));
    const answer = await peerConnection.current?.createAnswer();
    await peerConnection.current?.setLocalDescription(answer!);

    socket.current?.send(JSON.stringify({ type: "answer", caller_id: data.caller_id, sdp: answer }));
    setIsCallActive(true);
    console.log('send offer');
  };
  
  const endCall = () => {
    // 1. 로컬 미디어 스트림 중지 (마이크 종료)
    const senders = peerConnection.current?.getSenders();
    senders?.forEach((sender) => {
      sender.track?.stop();
      peerConnection.current?.removeTrack(sender);
    });
  
    // 2. PeerConnection 종료
    peerConnection.current?.close();
    peerConnection.current = null;
  
    // 3. RemoteStream 초기화
    setRemoteStream(null);
  
    // 4. 통화 종료 상태로 변경
    setIsCallActive(false);
  
    // 5. 서버에 통화 종료 메시지 전송
    socket.current?.send(JSON.stringify({ type: "call_end", call_id: "some-call-id" }));
  
    console.log("통화 종료");
  };
  
  return { remoteStream, isCallActive, startCall, endCall };
};
