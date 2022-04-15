import styles from "./style.module.less";
import { Vote, Replys, UserAvatar, Comment, WithAuth } from "@/components";
import { Card, Divider } from "antd";
import { voteGet, voteOption, getReplyList, replyAdd } from "@/server";
import { timeCompute } from "@/utils";
import { DetailDataStore, ReplyListStore, ReplyOtherStore } from "@/model";
import { useStore } from "reto";
import { useEffect } from "react";

function ReplysModule() {
  const { list, getList } = useStore(ReplyListStore);
  const { data: vote } = useStore(DetailDataStore);
  useEffect(() => {
    console.log(list);
  }, [list]);
  const submit = (value) => {
    replyAdd({ content: value, bodyId: vote.id }).then((res) => {
      if (!res) {
        return;
      }
      getList({ bodyId: vote.id });
    });
  };
  // const list = useState()
  return (
    <div>
      <Comment submit={submit}></Comment>
      <Replys list={list}></Replys>
    </div>
  );
}

function DetailInfo() {
  const { data: vote, getData } = useStore(DetailDataStore);
  const voteClick = (option) => {
    console.log(vote, option, 9999);
    voteOption({ voteOption: { id: option.id } }).then(() => {
      getData({ id: vote.id });
    });
  };
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
        <Vote
          vote={vote}
          options={vote.options}
          isVote={true}
          voteClick={voteClick}
        ></Vote>
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
function VoteDetail(props) {
  const { resetOther } = useStore(ReplyOtherStore);

  // 清除回复他人的状态
  useEffect(() => {
    return () => {
      resetOther();
    };
  }, []);
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
  const { data: vote } = await voteGet({ id: ctx.query.voteId });
  const {
    data: { records: replyList },
  } = await getReplyList({ bodyId: ctx.query.voteId });
  return { vote, replyList: replyList ?? [] };
};
export default WithAuth(VoteDetail);
