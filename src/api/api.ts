import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: Authorization 헤더 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 토큰 저장 위치 확인 필요
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
