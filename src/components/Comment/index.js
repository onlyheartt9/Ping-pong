import { Input } from "antd";
import { useCallback, useState } from "react";
import styles from "./style.module.less";
import { Emoji } from "../Emoji";

const { TextArea } = Input;
export const Comment = ({ submit, ...props }) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = useCallback(() => {
    submit(value);
    setValue("");
  }, [value]);

  return (
    <div className={styles["comment"]}>
      <div className={styles["comment-textarea-container"]}>
        <TextArea
          value={value}
          onChange={onChange}
          style={{ fontSize: "12px" }}
          placeholder="发表一条我的评论"
          autoSize={{ minRows: 3, maxRows: 3 }}
          {...props}
        ></TextArea>
        <button onClick={onSubmit} className={styles["comment-submit"]}>
          发表评论
        </button>
      </div>
      <div>
        <Emoji></Emoji>
      </div>
    </div>
  );
};
