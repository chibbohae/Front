// import {io} from "socket.io-client"

// const socket = io("http://localhost:5001")

// export default socket;

import { io } from "socket.io-client";

const createSocket = () => io("http://localhost:5001"); // 새 인스턴스

export default createSocket;