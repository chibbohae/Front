import React, { useRef, useEffect } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";

const CallComponent: React.FC = () => {
  const userId = sessionStorage.getItem("userId") || "";
  const partnerId = sessionStorage.getItem("partnerId") || "";
  const { remoteStream, isCallActive, startCall, endCall } = useWebRTC(userId);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  // 🎙️ 상대방 음성 스트림 설정
  useEffect(() => {
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h2 className="text-lg font-bold">음성 통화</h2>

      {/* 상대방 음성 출력 (화면에는 안 보임) */}
      {isCallActive && <audio ref={remoteAudioRef} autoPlay playsInline />}

      <div className="flex mt-4 space-x-4">
        <button onClick={() => startCall(partnerId)} className="px-4 py-2 text-white bg-green-500 rounded-md">
          통화 시작
        </button>
        <button onClick={endCall} className="px-4 py-2 text-white bg-red-500 rounded-md">
          통화 종료
        </button>
      </div>
    </div>
  );
};

export default CallComponent;
