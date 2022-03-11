import { Progress } from "../Progress";
import styles from "./style.module.less";
import { UserAvatar } from "../Avatar";

const ReplyItem = ({ hasChild = true, imgSize }) => {
  return (
    <div className={styles["reply-item"]}>
      <div className={styles["reply-item-header"]}>
        <div className={styles["reply-item-header-left"]}>
          <UserAvatar showName style={{ imgSize }}></UserAvatar>
          <div className={styles["reply-item-time"]}>2022.2.14 10:44:30</div>
        </div>
        <div className={styles["reply-item-header-right"]}>回复</div>
      </div>
      <div className={styles["reply-item-content"]}>content</div>
      {hasChild && <ReplyBox></ReplyBox>}
    </div>
  );
};

const ReplyBox = () => {
  const arr = [1, 2];
  return (
    <div className={styles["reply-box"]}>
      {arr.map((item) => (
        <ReplyItem key={item} hasChild={false} imgSize={24}></ReplyItem>
      ))}
      <div className={styles["reply-box-more"]}>共11条消息,点击查看</div>
    </div>
  );
};

const Replys = () => {
  const arr = [1, 2, 3];
  return (
    <div className={styles["reply"]}>
      {arr.map((item) => (
        <ReplyItem key={item}></ReplyItem>
      ))}
    </div>
  );
};
export { Replys };
