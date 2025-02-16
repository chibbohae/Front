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

// 파트너 마이페이지 응답 타입
export interface PartnerData {
    name: string,
    company: string,
    yearsOfExperience: number,
    age: number,
    bio: string,
    position: string,
    email: string,
    telephone: string
}
// 파트너 마이페이지 조회
export const CheckPartnerMypage = async (): Promise<PartnerData>=>{
    const response = await api.get('/v1/partner/profile');
    return response.data;
}

// 클라이언트 마이페이지 응답 타입
export interface ClientData{
    name: string,
    university: string,
    age: number,
    major: string,
    interest: string,
    telephone: string,
    email: string
}

// 클라이언트 마이페이지 조회
export const CheckClientMypage = async () : Promise<ClientData> =>{
    const response = await api.get('/v1/client/profile');
    return response.data;
}