import API from "./apis";

export const createResume = ({resumeData})=>{
    return API.post('/resume/create' , resumeData);
}

export const getResumeOfUser = ()=>{
    return API.get('/resume/get-resumeOfUser');
}

export const deleteResume = ({resumeId})=>{
    return API.delete(`/resume/${resumeId}`);
}