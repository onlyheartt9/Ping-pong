import { Avatar, AvatarProps } from "antd";
import React from "react";
import { User } from "~/typings/user";
import styles from "./style.module.less";

interface Props extends AvatarProps {
  user?: User;
  showName?: boolean;
}

export const UserAvatar = (props: Props) => {
  const { user, showName, src } = props;
  return (
    <div className={styles["avatar"]}>
      <Avatar src={user?.img??src}></Avatar>
      {user && showName ? (
        <div className={styles["avatar-name"]}>{user?.name}</div>
      ) : null}
    </div>
  );
};
