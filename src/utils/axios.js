import axios from "axios";
import { message } from "antd";
import qs from "qs";
import { parseCookie } from "./index";
import { proxyUrl } from "@/../proxy";

const isServer = typeof window === "undefined";
const baseURL = isServer ? proxyUrl : "/";
// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: baseURL,
  //   baseURL: process.env.NODE_ENV === "dev" ? "/api" : process.env.VUE_APP_URL, // 本地-前端解决跨域
  timeout: 15000, // 请求超时时间
});

// request 请求拦截器
service.interceptors.request.use(
  (config) => {
    //设置header
    config.headers["Content-Type"] = "application/json;charset=UTF-8";

    // 格式化 get 请求
    if (config.method === "get" && config.data) {
      config.url = `${config.url}?${qs.stringify(config.data, {
        indices: false,
      })}`;
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    // 让每个请求携带自定义token
    const cookies = parseCookie(isServer ? service.cookie : document?.cookie);
    if (cookies["user_token"]) {
      // header添加token
      config.headers["user_token"] = cookies["user_token"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// respone 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response.data, 2222);
    // 接口值报错，且不在服务端
    if (response.data.success === false && !isServer) {
      message.error(response.data.msg);
    }
    return response.data;
  },
  (error) => {
    if (isServer) {
      return;
    }
    if (error.response.status == 400) {
      message.warning("参数信息有误");
      return;
    } else if (error.response.status == 302) {
      message.warning("用户未登录");
      //   router.push("/login");
      //   setStore({ name: 'TOKEN', content: '', type: 'session' })
      return;
    } else if (error.response.status == 404) {
      message.warning("连接失败");
      return;
    } else if (error.response.status == 500) {
      message.warning("服务器内部错误");
      return;
    } else if (error.response.status == 560) {
      message.warning("数据库异常");
      return;
    }
    message.warning(error.message);
    return Promise.reject(error);
  }
);

export default service;
