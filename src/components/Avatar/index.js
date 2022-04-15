import { Avatar, AvatarProps } from "antd";
import styles from "./style.module.less";

export const UserAvatar = (props) => {
  const {
    user = {
      name: "tzz",
    },
    showName,
    className,
    src,
    style = {},
  } = props;
  const styleOpt = {
    imgSize: 32,
    space: "7px",
    fontSize: "14px",
    ...style,
  };
  return (
    <div className={[styles["avatar"],className].join(" ")}>
      <Avatar src={user?.avatar ?? src} size={styleOpt.imgSize}></Avatar>
      {user && showName ? (
        <div
          className={styles["avatar-name"]}
          style={{
            marginLeft: styleOpt.space,
            fontSize: styleOpt.fontSize,
          }}
        >
          {user?.nick}
        </div>
      ) : null}
    </div>
  );
};
