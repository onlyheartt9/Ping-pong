import { useList, useData, useStoreState } from "@/utils/hooks";
import { voteUpsert, voteList } from "@/server/vote";

// list demo
export const VoteListStore = (props) => {
  return useList({
    api: voteList,
    initialParams: {
      s: 10,
      p: 1,
    },
    initialData: props?.homeList,
  });
};

export const DDDStore = () => {
  const state = useStoreState("VoteListStore");
  return useData({
    api: null,
    initialParams: {},
    initialData: state?.indexData,
  });
};
