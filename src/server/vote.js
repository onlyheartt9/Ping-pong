import axios from "@/utils/axios";
// 获取T信息
export function voteList(params) {
  return axios.post("/api/vote/list", params);
}

// 获取T信息
export function voteGet(params) {
  return axios.get("/api/vote/get", params);
}

// 删除T信息
export function voteDel(params) {
  return axios.get("/api/vote/del", params);
}

// 新增和更新
export function voteUpsert(params) {
  return axios.post("/api/vote/upsert", params);
}
