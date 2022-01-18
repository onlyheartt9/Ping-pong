import React, { useContext, useEffect } from "react";
import { SProps } from "ssr-types-react";
import { XXXStore } from "@/model";
import { UserAvatar, Vote, Progress } from "@/components";
import { useStore } from "reto";
import { Button } from "antd";
import { User } from "~/typings/user";
import styles from "./style.module.less";

function VoteItem() {
  const user: User = {
    id: "1",
    name: "仝壮壮",
    nick: "仝壮壮",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  };
  return (
    <div className={styles["vote-item"]}>
      <div className={styles["vote-item-user"]}>
        <UserAvatar
          user={user}
          showName={true}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        ></UserAvatar>
        <div>5分钟前</div>
      </div>
      <div className={styles["vote-item-title"]}>
        titletitletitletitletitletitletitletitletitletitletitletitletitletitletitle
      </div>
      <div className={styles["vote-item-content"]}>
        contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
      </div>
      <Vote></Vote>
      <Progress width="500px"></Progress>
    </div>
  );
}

function VoteList() {
  const arr = [1];
  return (
    <div>
      {arr.map((_item) => (
        <VoteItem key={_item}></VoteItem>
      ))}
    </div>
  );
}

export default function Index(props: SProps) {
  const { list } = useStore(XXXStore);
  return (
    <div>
      <VoteList></VoteList>
    </div>
  );
}
