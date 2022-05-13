import { useState } from "react";
import { voteGet, getReplyList } from "@/server";
import { useList, useData, useStoreState, useResetState } from "@/utils/hooks";
export const DetailDataStore = (props) => {
  return useData({
    api: voteGet,
    initialParams: {},
    initialData: props?.vote,
  });
};

export const ReplyListStore = (props) => {
  return useList({
    api: getReplyList,
    initialParams: {},
    initialData: props?.replyList ?? [],
  });
};

export const ReplyOtherStore = () => {
  const [other, setOther, resetOther] = useResetState(null);
  const [replyId, setReplyId, resetReplyId] = useResetState(null);
  return { other, setOther, resetOther, replyId, setReplyId, resetReplyId };
};
