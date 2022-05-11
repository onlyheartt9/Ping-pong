import React, { useCallback, useState } from "react";
import styles from "./style.module.less";
import { voteUpsert, voteList } from "@/server/vote";
import { checkOnlion } from "@/server/user";
import { SimpleForm } from "@/components";
import { Input, Button, Form, Radio, Select, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Router from "next/router";

const New1 = () => {
  const add = () => {
    voteUpsert({
      title: "aaa",
      content: "bbb",
      status: 1,
      options: [{ content: "opt1" }, { content: "opt2" }],
    }).then((res) => {
      console.log(res);
    });
  };
  const add1 = () => {
    checkOnlion().then((res) => {
      console.log(res);
    });
  };
  const add2 = () => {
    voteList({ p: 1, s: 10 }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <button onClick={add}>addVote</button>
      <button onClick={add1}>checkOnlion</button>
      <button onClick={add2}>voteList</button>
    </div>
  );
};

const config = [
  {
    label: "投票标题",
    name: "title",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input placeholder="最多25字" showCount></Input>;
    },
  },
  {
    label: "投票详细内容",
    name: "content",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return <Input.TextArea placeholder="最多50字" showCount></Input.TextArea>;
    },
  },
  {
    label: "投票选项",
    name: "options",
  },
  {
    label: "单选/多选",
    name: "single",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return (
        <Radio.Group>
          <Radio value={1}>单选</Radio>
          <Radio value={2}>多选</Radio>
        </Radio.Group>
      );
    },
  },
  {
    label: "结束时间",
    name: "endTime",
    rules: [{ required: true, message: "请输出nick" }],
    component: () => {
      return (
        <Select>
          <Select.Option value={1}>一天后</Select.Option>
          <Select.Option value={2}>一周后</Select.Option>
          <Select.Option value={3}>一月后</Select.Option>
        </Select>
      );
    },
  },
];

const Option = (props) => {
  // console.log(e,5555)
  const { form } = props;
  const [type, setType] = useState("content");
  const [optionTypes] = useState(["A", "B", "C", "D", "E"]);
  const addOption = (add) => {
    const { options } = form.getFieldsValue();
    const { length } = options;
    if (length === 5) {
      message.warn("选项最多为5个");
      return;
    }
    add({ content: "", label: `${optionTypes[length]}派` });
  };
  const removeOption = (field, remove) => {
    const { options } = form.getFieldsValue();
    const { length } = options;
    if (length === 2) {
      message.warn("选项最少为2个");
      return;
    }
    remove(field.name);
  };
  const validator = useCallback((rule, value, callback) => {
    // 判断是否有选项的msg为空值
    const key = value.some((opt) => opt.content.replace(/\s*/g, "") === "");
    if (key) {
      callback("XXXX");
    }
  }, []);
  return (
    <div>
      <div className={styles["content-type"]}>
        <span
          onClick={() => {
            setType("content");
          }}
        >
          文字投票
        </span>
        <span
          onClick={() => {
            setType("pic");
          }}
        >
          图片投票
        </span>
      </div>
      <Form.Item
        label={"投票选项"}
        tooltip={{
          title: "选项内容必须完整，多余选项请删除后再提交",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Form.List name={"options"}>
          {(fields, { add, remove }) => (
            <>
              <div className={styles["content-list"]}>
                {fields.map((field, index) => (
                  <div key={field.key} className={styles["content-list-item"]}>
                    <div className={styles["content-list-item-title"]}>
                      <div>选项{optionTypes[index]}</div>
                      <div
                        className={styles["content-list-item-close"]}
                        onClick={() => removeOption(field, remove)}
                      >
                        关闭
                      </div>
                    </div>
                    <Form.Item
                      label={"选项内容"}
                      rules={[{ required: true, message: "请填写XXXX" }]}
                      name={[field.name, "content"]}
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.options !== curValues.options
                      }
                    >
                      <Input></Input>
                    </Form.Item>
                    <Form.Item
                      label={"自定义标签"}
                      name={[field.name, "label"]}
                      className={styles["content-list-item-label"]}
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.options !== curValues.options
                      }
                    >
                      <Input></Input>
                    </Form.Item>
                  </div>
                ))}
              </div>
              <Form.Item>
                <Button type="dashed" onClick={() => addOption(add)} block>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </div>
  );
};

const New = () => {
  const [form] = SimpleForm.useForm();

  const submit = async () => {
    console.log(form.getFieldsValue());
    if (!(await form.validateFields())) {
      return;
    }
    const values = form.getFieldsValue();
    voteUpsert(values).then((res) => {
      console.log(res);
      message.success('添加成功,3秒后跳转详情页');
      setTimeout(()=>{
        Router.push(`/detail/${res.data}`);
      },3000);
    });
  };
  return (
    <div className={styles["new"]}>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 4 }}
        name="contribution"
        initialValues={{
          single: 1,
          endTime: 1,
          options: [
            { content: "", label: "A派" },
            { content: "", label: "B派" },
          ],
        }}
      >
        {config.map(({ component, ...other }) =>
          other.name !== "options" ? (
            <Form.Item key={other.name} {...other}>
              {component(other)}
            </Form.Item>
          ) : (
            <Option form={form}></Option>
          )
        )}
      </Form>

      <div className={styles["new-footer"]}>
        <Button type="primary" ghost onClick={submit}>
          预览
        </Button>
        <Button type="primary" ghost onClick={submit}>
          提交
        </Button>
      </div>
    </div>
  );
};

// New.getInitialProps = () => {
//   return { tzz: 1 };
// };

export default New;
