import axios from "@/utils/axios";

// 根据主体查询所有选项
export function listByVoteBodyId(params){
    return axios.get('/api/vote/option/listByVoteBodyId',params)
}

// 根据主体添加对应选项
export function upsertOption(params){
    return axios.post('/api/vote/option/upsert',params)
}

// 删除指定项
export function delOption(params){
    return axios.post('/api/vote/option/del',params)
}

// 参与投票
export function voteOption(params){
    return axios.post('/api/vote/option/voteOption',params)
}