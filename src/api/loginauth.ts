import api from "./api";


// 로그인 요청 타입
export interface LoginRequest {
    loginId: string;
    loginPassword: string;
}

// 로그인 응답 타입
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

// 멘토(파트너) 로그인 API
export const loginPartner = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/v1/auth/partner/login", data);
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('refreshToken',response.data.refreshToken);
    return response.data;
};

// 멘티(클라이언트) 로그인 API (백엔드 명세서 확인 필요)
export const loginClient = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/v1/auth/client/login", data);
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('refreshToken',response.data.refreshToken);
    return response.data;
};

// 카카오 로그인 응답 타입
export interface KakaoLoginResponse {
    accessToken: string;
    refreshToken: string;
}

// 카카오 파트너 로그인 API
export const loginKakaoPartner = async (code: string): Promise<KakaoLoginResponse> => {
    const response = await api.post<KakaoLoginResponse>('/v1/auth/kakao/partner/callback', { code });
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
};

// 카카오 클라이언트 로그인 API
export const loginKakaoClient = async (code: string): Promise<KakaoLoginResponse> => {
    const response = await api.post<KakaoLoginResponse>('/v1/auth/kakao/client/callback', { code });
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
};

// 카카오 로그인 초기화
export const initiateKakaoLogin = (userType: 'partner' | 'client') => {
    // Replace with your actual Kakao App key
    const KAKAO_CLIENT_ID = 'YOUR_KAKAO_CLIENT_ID';

    // Replace with your actual redirect URI (must be registered in Kakao Developer console)
    const REDIRECT_URI = `${window.location.origin}/kakao-callback`;

    // Store the user type for use after redirect
    localStorage.setItem('kakaoLoginUserType', userType);

    // Construct the Kakao authorization URL
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // Redirect the user to the Kakao login page
    window.location.href = kakaoAuthURL;
};


// 회원가입 성병 ENUM
export enum Gender {
    M = "M",
    F = "F",
    O = "O"
}
// 파트너 회원가입 요청 타입
export interface RegisterPartnerRequest {
    name: string,
    age: number,
    gender: Gender,
    telephone: string,
    email: string,
    loginId: string,
    loginPassword: string,
    company: string,
    yearsOfExperience: number,
    position: string,
    bio: string
}
// 파트너 회원가입 응답 타입
export interface RegisterPartnerResponse {
    accessToken: string,
    refreshToken: string
}
export const registerPartner = async (data:RegisterPartnerRequest): Promise<RegisterPartnerResponse> => {
    const response = await api.post<RegisterPartnerResponse>("/v1/auth/partner/signup", data);
    return response.data;
}

// 클라이언트 회원가입 요청 타입
export interface RegisterClientRequest {
    name: string,
    age: number,
    gender: Gender,
    telephone: string,
    email: string,
    loginId: string,
    loginPassword: string,
    interest: string,
    major: string,
    university: string
}
// 클라이언트 회원가입 응답 타입
export interface RegisterClientResponse{
    accessToken: string;
    refreshToken: string;
}
// 클라이언트 회원가입
export const registerClient = async (data:RegisterClientRequest): Promise<RegisterClientResponse> => {
    const response = await api.post<RegisterClientResponse>("/v1/auth/client/signup", data);
    return response.data;
}