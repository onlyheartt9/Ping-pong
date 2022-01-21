import { Avatar, AvatarProps } from "antd";
import styles from "./style.module.less";

export const UserAvatar = (props) => {
  const { user, showName, src } = props;
  return (
    <div className={styles["avatar"]}>
      <Avatar src={user?.img ?? src}></Avatar>
      {user && showName ? (
        <div className={styles["avatar-name"]}>{user?.name}</div>
      ) : null}
    </div>
  );
};
