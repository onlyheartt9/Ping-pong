import React from "react";
import styles from "./style.module.less";
import { userLogin } from "@/server/user";
import { SimpleForm } from "@/components";
import { Input } from "antd";

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
      // console.log(res);
      cookieStore.set('user_token',res)
    });
  };
  return (
    <div>
      <SimpleForm form={form} items={config} initialValues={{u:'422474821',p:'Qq5801988123qq'}}></SimpleForm>
      <button onClick={submit}>submit</button>
    </div>
  );
};

export default Login;
