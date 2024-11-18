import { commonAPI } from "./commonApi";
import { BASE_URL } from "./baseUrl";

// 1.Register user
export const registerAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "")
}

// 2.Login user
export const loginAPI = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "")
}
 
export const getAllCmp=async ()=>{
    return await commonAPI("get",`${BASE_URL}/complaints/getAll`)
}
 
export const statusChange=async (data)=>{
    return await commonAPI("post",`${BASE_URL}/complaints/statusChange`,data,"")
}
