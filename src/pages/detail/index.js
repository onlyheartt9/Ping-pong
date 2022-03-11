import Head from "next/head";
import Image from "next/image";
import styles from "./style.module.less";
import { Button } from "antd";
import { XXXStore } from "@/model";
import { useStore } from "reto";
import { useEffect } from "react";
import { Vote, Replys, UserAvatar,Comment } from "@/components";
import { Card, Divider } from "antd";

function ReplysModule() {
  const submit = (value)=>{
    console.log(value,666)
  }
  return (
    <div>
      
      <Comment submit={submit}></Comment>
      <Replys></Replys>
    </div>
  );
}

function DetailInfo() {
  return (
    <div className={styles["detail-info"]}>
      <div className={styles["detail-info-title"]}>Title</div>
      <div className={styles["detail-info-describe"]}>
        <div className={styles["detail-info-time"]}>2分钟前</div>
        <div>标签 话题</div>
      </div>
      <div className={styles["detail-info-content"]}>content</div>
      <div>
        <Vote isVote={true}></Vote>
      </div>
      <div className={styles["detail-info-stars"]}>stars</div>
      <ReplysModule></ReplysModule>
    </div>
  );
}
function DetailCards() {
  return (
    <div className={styles["detail-cards"]}>
      <Card className={[styles["user-card"], styles["card"]]}>
        <div className={styles["user-avatar"]}>
          <UserAvatar
            showName
            style={{
              imgSize: 64,
              space: "18px",
              fontSize: "16px",
            }}
          ></UserAvatar>
        </div>

        <div className={styles["user-data"]}>
          <div className={styles["user-publish"]}>
            <div className={styles["user-publish-num"]}>155</div>
            <div className={styles["user-publish-text"]}>发布</div>
          </div>
          <Divider type="vertical" style={{ height: "30px" }}></Divider>
          <div className={styles["user-stars"]}>
            <div className={styles["user-stars-num"]}>9111</div>
            <div className={styles["user-stars-text"]}>获赞</div>
          </div>
        </div>
      </Card>
      <Card className={[styles["recommend-card"], styles["card"]]}>
        <div className={styles["recommend-card-header"]}>相关推荐</div>
        <div className={styles["recommend-card-list"]}>
          <div className={styles["recommend-card-item"]}>
            话题标题，根据标签属性添加？
          </div>
          <div className={styles["recommend-card-item"]}>
            话题标题，根据标签属性添加？
          </div>
          <div className={styles["recommend-card-item"]}>
            话题标题，根据标签属性添加？
          </div>
          <div className={styles["recommend-card-item"]}>
            话题标题，根据标签属性添加？
          </div>
        </div>
      </Card>
    </div>
  );
}
function VoteDetail({ stars }) {
  const { list, setList } = useStore(XXXStore);
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className={styles["vote-detail"]}>
      <div className={styles["vote-detail-left"]}>
        <DetailInfo></DetailInfo>
      </div>
      <div className={styles["vote-detail-right"]}>
        <DetailCards></DetailCards>
      </div>
    </div>
  );
}

VoteDetail.getInitialProps = async (ctx) => {
  // const res = await fetch("https://api.github.com/repos/vercel/next.js");
  // const json = await res.json();
  return { stars: 1 };
};
export default VoteDetail;
