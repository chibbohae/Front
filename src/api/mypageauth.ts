import api from "./api";

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


// 파트너 업데이트 요청 타입
export interface UpdatePartnerData {
  company: string,
  yearsOfExperience: number,
  bio: string,
  position: string
}

// 파트너 업데이트 응답 타입
export interface UpdatePartnerResponse {
    name: string,
    company: string,
    yearsOfExperience: number,
    age: number,
    bio: string,
    position: string,
    email: string,
    telephone: string
}

export const UpdatePartnerInfo = async (data: UpdatePartnerData): Promise<UpdatePartnerResponse> => {
    const response = await api.put('/v1/partner/profile', data);
    return response.data;
}


// 파트너 업데이트 요청 타입
export interface UpdateClientData {
    university: string,
    major: string,
    interest: string
}
  
// 파트너 업데이트 응답 타입
export interface UpdateClientResponse {
    name: string,
    university: string,
    age: number,
    major: string,
    interest: string,
    telephone: string,
    email: string
}
export const UpdateClientInfo = async (data: UpdateClientData): Promise<UpdateClientResponse> => {
    const response = await api.put('/v1/client/profile', data);
    return response.data;
}

