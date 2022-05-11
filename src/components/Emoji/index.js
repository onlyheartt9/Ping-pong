import { Input, Popover } from "antd";
import { useCallback, useState, useRef, useEffect } from "react";
import styles from "./style.module.less";
import { useOutsideClick } from "@/utils/hooks";

const { TextArea } = Input;
const EmojiItem = ({ emoji, chooseEmoji }) => {
  const onClick = () => {
    chooseEmoji(emoji);
  };
  return <a onClick={onClick}>{emoji}</a>;
};

const EmojiContent = ({ emojiRef, chooseEmoji }) => {
  const emojis = new Array(50).fill(`😀`);
  return (
    <div ref={emojiRef} className={styles["emoji-content"]}>
      <div className={styles["emoji-content-container"]}>
        <div className={styles["emoji-content-title"]}>小黄脸</div>
        <div className={styles["emoji-content-imgs"]}>
          {emojis.map((emoji, index) => (
            <EmojiItem key={index} emoji={emoji} chooseEmoji={chooseEmoji} />
          ))}
        </div>
      </div>
      <div className={styles["emoji-content-menu"]}></div>
    </div>
  );
};

const EmojiPopover = (props) => {
  const { chooseEmoji, emojiRef, ...popoverProps } = props;
  return (
    <Popover
      {...popoverProps}
      overlayClassName={styles["emoji-popover"]}
      content={
        <EmojiContent
          emojiRef={emojiRef}
          chooseEmoji={chooseEmoji}
        ></EmojiContent>
      }
    ></Popover>
  );
};

export const Emoji = ({ chooseEmoji = () => {}, placement = "bottomLeft" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const emojiRef = useRef();

  const emojiClick = () => {
    setVisible(true);
  };

  const closeEmoji = () => {
    setVisible(false);
  };
  
  useOutsideClick({ refs: [ref, emojiRef], callback: closeEmoji });
  return (
    <>
      <EmojiPopover
        emojiRef={emojiRef}
        placement={placement}
        visible={visible}
        setVisible={setVisible}
        chooseEmoji={chooseEmoji}
      >
        <div ref={ref} className={styles["emoji"]} onClick={emojiClick}>
          表情
        </div>
      </EmojiPopover>
    </>
  );
};
