import API from "./apis"

export const signUpAPI = ({signUpData})=>{
    return API.post('/auth/register' , signUpData)
}

export const loginAPI = ({loginData})=>{
    return API.post('/auth/login' , loginData);
}

export const logoutAPI = ()=>{
    return API.post('/auth/logout');
}

