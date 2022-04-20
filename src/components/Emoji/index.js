import { Input, Popover } from "antd";
import { useCallback, useState } from "react";
import styles from "./style.module.less";

const { TextArea } = Input;

const EmojiContent = () => {
  return <div>aaaa</div>;
};

const EmojiPopover = (props) => {
  const { ...popoverProps } = props;
  return (
    <Popover
      {...popoverProps}
      content={<EmojiContent></EmojiContent>}
    ></Popover>
  );
};

export const Emoji = ({ placement = "bottomLeft" }) => {
  const [visible, setVisible] = useState(false);
  const emojiClick = () => {
    setVisible(true);
  };
  return (
    <>
      <EmojiPopover placement={placement} visible={visible}>
        <div className={styles["emoji"]} onAuxClick={(...e)=>{console.log(e)}} onBlur={(...e)=>{console.log(e)}} onClick={emojiClick}>
          表情
        </div>
      </EmojiPopover>
    </>
  );
};
