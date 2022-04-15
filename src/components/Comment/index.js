import { Input } from "antd";
import { useCallback, useState } from "react";
import styles from "./style.module.less";
import { Emoji } from "../Emoji";
import { useStore } from "reto";
import { ReplyOtherStore } from "@/model";

const { TextArea } = Input;
export const Comment = ({ submit, ...props }) => {
  const { other } = useStore(ReplyOtherStore);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = useCallback(() => {
    submit(value);
    setValue("");
  }, [value]);

  return (
    <div id={''} className={styles["comment"]}>
      <div className={styles["comment-textarea-container"]}>
        <TextArea
          value={value}
          onChange={onChange}
          style={{ fontSize: "12px" }}
          placeholder={other?`回复 @${other.nick}  ：`:"发表一条我的评论"}
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
