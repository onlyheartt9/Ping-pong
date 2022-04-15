import axios from "@/utils/axios";

// 根据主体查询所有选项
export function getReplyList(params) {
  return axios.post("/api/vote/reply/list", params);
}

// 根据主体添加对应选项
export function replyAdd(params) {
  return axios.post("/api/vote/reply/reply", params);
}

// 根据主体查询所有选项
export function replyDel(params) {
  return axios.get("/api/vote/reply/del", { params });
}
