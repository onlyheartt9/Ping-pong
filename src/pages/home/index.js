import React, { useContext, useEffect, useState } from "react";
import { XXXStore } from "@/model";
import { useStore } from "reto";
import { UserAvatar, Vote, Progress,Panel } from "@/components";
import { Button, Divider } from "antd";
import styles from "./style.module.less";
import Router from "next/router";

function VoteItem() {
  const user = {
    id: "1",
    name: "仝壮壮",
    nick: "仝壮壮",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  };
  const onClick = () => {
    Router.push("/detail");
  };
  return (
    <div className={styles["vote-item"]} onClick={onClick}>
      <div className={styles["vote-item-user"]}>
        <div className={styles["vote-item-user-left"]}>
          <UserAvatar
            user={user}
            showName={true}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></UserAvatar>
          <div className={styles["vote-item-user-time"]}>5 分钟前</div>
        </div>
        <div className={styles["vote-item-user-right"]}>
          <div>标签</div>
          <div>话题</div>
        </div>
      </div>
      <div className={styles["vote-item-title"]}>
        titletitletitletitletitletitletitletitletitletitletitletitletitletitletitle
      </div>
      {/* <div className={styles["vote-item-content"]}>
        contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
      </div> */}
      <Vote></Vote>
      <div className={styles["vote-item-footer"]}>
        <div className={styles["vote-item-replys"]}>12</div>
        <div className={styles["vote-item-stars"]}>3577</div>
      </div>
    </div>
  );
}

function VoteList() {
  const arr = [1, 2, 3];
  return (
    <div>
      {arr.map((_item) => (
        <>
          <VoteItem key={_item}></VoteItem>
          <Divider></Divider>
        </>
      ))}
    </div>
  );
}


function Index(props) {
  //const [data] = useState(props.stars)
  const { list, setList } = useStore(XXXStore);
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className={styles["home"]}>
      <Panel></Panel>
      <div
        className={styles["vote-list-container"]}
      >
        <VoteList></VoteList>
      </div>
    </div>
  );
}

Index.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default Index;
