import React from "react";
import styles from "./style.module.less";
import { userRegist } from "@/server/user";
import { SimpleForm } from "@/components";
import { Input } from "antd";

const config = [
  {
    label: "nick",
    name: "nick",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "username",
    name: "username",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "realName",
    name: "realName",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "passwd",
    name: "passwd",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "avatar",
    name: "avatar",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "email",
    name: "email",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "phone",
    name: "phone",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
  {
    label: "gender",
    name: "gender",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input></Input>;
    },
  },
];

const Register = () => {
  const [form] = SimpleForm.useForm();

  const submit = async () => {
    if (!(await form.validateFields())) {
      return;
    }
    const values = form.getFieldsValue();
    userRegist(values).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <SimpleForm form={form} items={config}></SimpleForm>
      <button onClick={submit}>submit</button>
    </div>
  );
};

export default Register;
