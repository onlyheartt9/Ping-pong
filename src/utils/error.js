import { message } from "antd";
import Router from "next/router";

export const NotLogin = () => {
  message.error({
    key: "NOT_LOGIN",
    duration: 5,
    content: (
      <span>
        您没有登录!
        <a
          onClick={() => {
            Router.push("/login");
            message.destroy("NOT_LOGIN");
          }}
        >
          点击此处
        </a>
        ,前往登陆
      </span>
    ),
  });
};

export class AxiosError {
  constructor(data) {
    if (this[data.errorCode]) {
      this[data.errorCode](data);
    } else {
      message.error(data.msg);
    }
  }

  NOT_LOGIN(data) {
    NotLogin();
  }
}
