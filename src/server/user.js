import axios from "@/utils/axios";

// 登录
export function userLogin(params){
    return axios.post('/api/user/login',params)
}

//检查是否在线
export function checkOnlion(){
    return axios.get('/api/user/checkOnlion')
}

//用户注册
export function userRegist(params){
    return axios.post('/api/user/regist',params)
}