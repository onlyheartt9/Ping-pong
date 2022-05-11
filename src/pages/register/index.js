import React from "react";
import styles from "./style.module.less";
import { userRegist } from "@/server/user";
import { SimpleForm } from "@/components";
import Router from "next/router";
import { Input, Radio, Button, Upload, message } from "antd";

const Register = () => {
  const [form] = SimpleForm.useForm();
  const initialValues = {
    gender: 1,
  };
  const config = [
    {
      label: "用户名",
      name: "nick",
      rules: [{ required: true, message: "请输入用户名" }],
      component: () => {
        return <Input></Input>;
      },
    },
    {
      label: "账号",
      name: "username",
      rules: [{ required: true, message: "请输入账号" }],
      component: () => {
        return <Input></Input>;
      },
    },
    {
      label: "真实姓名",
      name: "realName",
      rules: [{ required: true, message: "请输入真实姓名" }],
      component: () => {
        return <Input></Input>;
      },
    },
    {
      label: "密码",
      name: "passwd",
      rules: [{ required: true, message: "请输入密码" }],
      component: () => {
        return <Input.Password></Input.Password>;
      },
    },
    {
      label: "确认密码",
      name: "rePasswd",
      rules: [
        { required: true, message: "请再次输入密码" },
        {
          validator: (rule, value, fn) => {
            const pwd = form.getFieldValue("passwd");
            if (!value) {
              fn("请再次输入密码");
            } else if (pwd === value) {
              fn();
            } else {
              fn("与密码不符，请重新输入");
            }
          },
        },
      ],
      component: () => {
        return <Input.Password></Input.Password>;
      },
    },
    {
      label: "头像",
      name: "avatar",
      rules: [{ message: "请选择头像图片" }],
      component: () => {
        return (
          <Upload.Dragger className={styles["upload"]} action="/upload.do">
            <p className="ant-upload-text">upload</p>
          </Upload.Dragger>
        );
      },
    },
    {
      label: "邮箱",
      name: "email",
      rules: [
        { required: true, message: "请输入邮箱地址" },
        {
          pattern:
            /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}\;))*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/,
          message: "邮箱格式不正确，请重新输入",
        },
      ],
      component: () => {
        return <Input></Input>;
      },
    },
    {
      label: "手机号",
      name: "phone",
      rules: [
        { required: true, message: "请输入手机号码" },
        {
          pattern:
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: "手机号格式不正确，请重新输入",
        },
      ],
      component: () => {
        return <Input></Input>;
      },
    },
    {
      label: "性别",
      name: "gender",
      rules: [{ required: true, message: "请选择性别" }],
      component: () => {
        return (
          <Radio.Group>
            <Radio value={1}>帅锅</Radio>
            <Radio value={2}>美铝</Radio>
          </Radio.Group>
        );
      },
    },
  ];
  const submit = async () => {
    window.fff = form;
    if (!(await form.validateFields())) {
      return;
    }
    const values = form.getFieldsValue();

    userRegist(values).then((res) => {
      console.log(res);
      if (res.success) {
        message.success("注册成功！3秒后前往登陆页面");
        setTimeout(() => {
          Router.push("/login");
        }, 3000);
      } else {
        message.error(res.msg);
      }
    });
  };
  return (
    <div className={styles["register"]}>
      <SimpleForm
        initialValues={initialValues}
        form={form}
        items={config}
        validateTrigger={[]}
      ></SimpleForm>
      <div className={styles["register-footer"]}>
        <Button type="primary" ghost onClick={submit}>
          注册，开启新的旅程
        </Button>
      </div>
    </div>
  );
};

export default Register;
