import React from "react";
import { Form } from "antd";
import styles from "./style.module.less";

const SimpleForm = ({ items, ...otherProps }) => {
  return (
    <Form
      labelCol={{ span: 4 }}
      name="contribution"
      {...otherProps}
    >
      {items.map(({ component, ...other }) => (
        <Form.Item key={other.name} {...other}>
          {component(other)}
        </Form.Item>
      ))}
    </Form>
  );
};

SimpleForm.useForm = Form.useForm;
SimpleForm.memo = false;

export { SimpleForm };
