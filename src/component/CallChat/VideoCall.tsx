import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const VideoCall = () => {
  // sessionStorage에서 caller_id와 receiver_id를 가져옴
  const caller_id = sessionStorage.getItem('caller_id');
  sessionStorage.setItem('receiver_id', 'sehan' )
  const receiver_id = sessionStorage.getItem('receiver_id');
  sessionStorage.setItem('userId', 'se' )
  const userId = sessionStorage.getItem('userId');

  const socketRef = useRef<Socket>();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();

  const apiUrl = "/api";
  const socketUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/signaling/ws/${userId}`;

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (!(pcRef.current && socketRef.current)) {
        return;
      }
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          // ice_candidate를 보내는 대상이 caller_id와 receiver_id임
          socketRef.current.emit("ice_candidate", { candidate: e.candidate, caller_id, receiver_id });
        }
      };

      pcRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    if (!(pcRef.current && socketRef.current)) {
      return;
    }
    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      // offer를 보내는 대상이 receiver_id임
      socketRef.current.emit("offer", { sdp, caller_id, receiver_id });
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      // answer를 보내는 대상이 caller_id임
      socketRef.current.emit("answer", { sdp: answerSdp, caller_id, receiver_id });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io(socketUrl);

    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    socketRef.current.on("offer", (sdp: RTCSessionDescription) => {
      createAnswer(sdp);
    });

    socketRef.current.on("answer", (sdp: RTCSessionDescription) => {
      pcRef.current?.setRemoteDescription(sdp);
    });

    socketRef.current.on("ice_candidate", async (candidate: RTCIceCandidate) => {
      await pcRef.current?.addIceCandidate(candidate);
    });

    // join 이벤트에 roomName 대신 caller_id와 receiver_id 전달
    socketRef.current.emit("join", { caller_id, receiver_id });

    getMedia();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, [caller_id, receiver_id]);

  return (
    <div>
      <video ref={myVideoRef} autoPlay style={{ width: 240, height: 240, backgroundColor: "black" }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: 240, height: 240, backgroundColor: "black" }} />
    </div>
  );
};

export default VideoCall;
