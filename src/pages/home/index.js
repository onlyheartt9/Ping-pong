import React, { useContext, useEffect, useState } from "react";
import { VoteListStore } from "@/model";
import { useStore } from "reto";
import { UserAvatar, Vote, Panel, WithAuth } from "@/components";
import { Button, Divider } from "antd";
import styles from "./style.module.less";
import Router from "next/router";
import { voteUpsert, voteList } from "@/server/vote";
import { checkOnlion } from "@/server/user";
import { timeCompute } from "@/utils";

function VoteItem({ item }) {
  const onClick = () => {
    window.rrr = Router;
    console.log(Router,6666)
    Router.push(`/detail/${item.id}`);
  };
  return (
    <div className={styles["vote-item"]} onClick={onClick}>
      <div className={styles["vote-item-user"]}>
        <div className={styles["vote-item-user-left"]}>
          <UserAvatar
            user={item.user}
            showName={true}
            // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></UserAvatar>
          <div className={styles["vote-item-user-time"]}>
            {timeCompute(item.createTime)}
          </div>
        </div>
        <div className={styles["vote-item-user-right"]}>
          <div>标签</div>
          <div>话题</div>
        </div>
      </div>
      <div className={styles["vote-item-title"]}>{item.content}</div>
      {/* <div className={styles["vote-item-content"]}>
        contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
      </div> */}
      <Vote width={"47%"} options={item.options}></Vote>
      <div className={styles["vote-item-footer"]}>
        <div className={styles["vote-item-replys"]}>12</div>
        <div className={styles["vote-item-stars"]}>3577</div>
      </div>
    </div>
  );
}

function VoteList({ list }) {
  const arr = [1, 2, 3];
  // const [list, setList] = useState([]);
  // useEffect(() => {
  //   voteList({ p: 1, s: 10 }).then(({ records }) => {
  //     console.log(records);
  //     setList(records);
  //   });
  // }, []);
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          <VoteItem item={item}></VoteItem>
          <Divider></Divider>
        </div>
      ))}
    </div>
  );
}

function Index(props) {
  //const [data] = useState(props.stars)
  const { list } = useStore(VoteListStore);

  return (
    <div className={styles["home"]}>
      <Panel></Panel>
      <div className={styles["vote-list-container"]}>
        <VoteList list={list}></VoteList>
      </div>
    </div>
  );
}

Index.getInitialProps = async (ctx) => {
  const { records } = await voteList({ p: 1, s: 10 });
  return { homeList:records };
};

export default WithAuth(Index);
