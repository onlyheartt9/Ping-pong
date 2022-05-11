import React from "react";
import styles from "./style.module.less";
import { userLogin } from "@/server/user";
import { SimpleForm } from "@/components";
import { Input, Button } from "antd";
import Cookies from "js-cookie";
import Router from "next/router";

const config = [
  {
    label: "username",
    name: "u",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "passwd",
    name: "p",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
];

const Login = () => {
  const [form] = SimpleForm.useForm();

  const submit = async () => {
    if (!(await form.validateFields())) {
      return;
    }
    const values = form.getFieldsValue();
    userLogin(values).then((res) => {
      if (res?.success === false) {
        return;
      }
      console.log(res);
      Cookies.set("user_token", res);
      Router.push(`/`);
    });
  };
  return (
    <div className={styles["login"]}>
      <SimpleForm
        form={form}
        items={config}
        initialValues={{ u: "422474821", p: "Qq5801988123qq" }}
      ></SimpleForm>
      <div><a onClick={()=>{Router.push('/register')}}>前往注册</a></div>
      <div className={styles["login-footer"]}>
        <Button type="primary" ghost onClick={submit}>
          冲鸭
        </Button>
      </div>
    </div>
  );
};

export default Login;
