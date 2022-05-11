import { Progress } from "../Progress";
import { useState,useEffect,useMemo } from "react";
import styles from "./style.module.less";
import { UserAvatar } from "../Avatar";
import { Comment } from "../Comment";
import { useStore } from "reto";
import { ReplyOtherStore, ReplyListStore, DetailDataStore } from "@/model";
import { replyAdd } from "@/server";
import moment from "moment";

const ReplyItem = ({ data, imgSize = 48 }) => {
  const { other, setOther, replyId, setReplyId } = useStore(ReplyOtherStore);
  const { getList } = useStore(ReplyListStore);
  const { data: vote } = useStore(DetailDataStore);
  const onReplyOther = () => {
    setReplyId(data.id);
    setOther(data.user);
  };

  const submit = (value) => {
    let params = {
      content: value,
      bodyId: vote.id,
      rootReplyId: data.rootReplyId === 0 ? data.id : data.rootReplyId,
      toReplyId: data.id,
    };
    if (other) {
    }
    replyAdd(params).then((res) => {
      if (!res) {
        return;
      }
      getList({ bodyId: vote.id });
    });
  };

  return (
    <div className={styles["reply-item"]}>
      <div className={styles["reply-item-avatar"]}>
        <UserAvatar user={data.user} style={{ imgSize }}></UserAvatar>
      </div>
      <div className={styles["reply-item-content"]}>
        <div className={styles["reply-item-user"]}>
          <a className={styles["reply-item-nick"]}>{data.user.nick}</a>
        </div>
        <div className={styles["reply-item-text"]}>{data.content}</div>
        <div className={styles["reply-item-info"]}>
          <div className={styles["reply-item-time"]}>
            {moment(data.createTime).format("YYYY-MM-DD HH-mm")}
          </div>
          <div className={styles["reply-item-comment"]} onClick={onReplyOther}>
            回复
          </div>
        </div>

        {data.replys && (
          <ReplyBox replys={data.replys} rootReply={data}></ReplyBox>
        )}
        {replyId === data.id && <Comment submit={submit}></Comment>}
      </div>
    </div>
  );
};

const ReplyBoxItem = ({ data, imgSize = 48, rootReply }) => {
  const { setOther, setReplyId } = useStore(ReplyOtherStore);

  const onReplyOther = () => {
    setReplyId(rootReply.id);
    setOther(data.user);
  };

  return (
    <div className={styles["reply-box-item"]}>
      <div className={styles["reply-box-item-avatar"]}>
        <UserAvatar user={data.user} style={{ imgSize }}></UserAvatar>
      </div>
      <div className={styles["reply-box-item-content"]}>
        <div className={styles["reply-box-item-user"]}>
          <a className={styles["reply-box-item-nick"]}>{data.user.nick}</a>
          <span>{data.content}</span>
        </div>
        <div className={styles["reply-box-item-info"]}>
          <div className={styles["reply-box-item-time"]}>
            {moment(data.createTime).format("YYYY-MM-DD HH-mm")}
          </div>
          <div
            className={styles["reply-box-item-comment"]}
            onClick={onReplyOther}
          >
            回复
          </div>
        </div>

        {data.replys && <ReplyBox replys={data.replys}></ReplyBox>}
      </div>
    </div>
  );
};

const ReplyBox = ({ replys, rootReply }) => {
  const [showMore, setShowMore] = useState(false);
  // const [showReplys,setShowReplys] = useState();
  const showReplys = useMemo(()=>{
    if(!showMore){
      return replys.slice(0,3)
    }
    return replys
  },[replys,showMore])
  return (
    <div className={styles["reply-box"]}>
      {showReplys.map((item) => (
        <ReplyBoxItem
          key={item.id}
          data={item}
          rootReply={rootReply}
          imgSize={24}
        ></ReplyBoxItem>
      ))}
      {!showMore && (
        <div className={styles["reply-box-more"]}>
          共11条消息,
          <span
            onClick={() => {
              setShowMore(true);
            }}
          >
            点击查看
          </span>
        </div>
      )}
      {showMore && <div>下一页</div>}
    </div>
  );
};

const Replys = ({ list }) => {
  return (
    <div className={styles["reply"]}>
      {list.map((item) => (
        <ReplyItem key={item.id} data={item}></ReplyItem>
      ))}
    </div>
  );
};
export { Replys };
