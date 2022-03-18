import styles from "./style.module.less";
import { Vote, Replys, UserAvatar, Comment, WithAuth } from "@/components";
import { Card, Divider } from "antd";
import { voteGet } from "@/server/vote";
import { timeCompute } from "@/utils";

function ReplysModule() {
  const submit = (value) => {
    console.log(value, 666);
  };
  return (
    <div>
      <Comment submit={submit}></Comment>
      <Replys></Replys>
    </div>
  );
}

function DetailInfo({ vote }) {
  return (
    <div className={styles["detail-info"]}>
      <div className={styles["detail-info-title"]}>{vote.title}</div>
      <div className={styles["detail-info-describe"]}>
        <div className={styles["detail-info-time"]}>
          {timeCompute(vote.createTime)}
        </div>
        <div>标签 话题</div>
      </div>
      <div className={styles["detail-info-content"]}>{vote.content}</div>
      <div>
        <Vote vote={vote} option={{}} isVote={true}></Vote>
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
function VoteDetail({ vote }) {
  return (
    <div className={styles["vote-detail"]}>
      <div className={styles["vote-detail-left"]}>
        <DetailInfo vote={vote}></DetailInfo>
      </div>
      <div className={styles["vote-detail-right"]}>
        <DetailCards></DetailCards>
      </div>
    </div>
  );
}

VoteDetail.getInitialProps = async (ctx) => {
  const { data } = await voteGet({ id: ctx.query.voteId });
  return { vote: data };
};
export default WithAuth(VoteDetail);
