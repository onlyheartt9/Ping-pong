import { useList, useData, useResponse } from "@/utils/hooks";

// list demo
export const XXXStore = (props) => {
  return useList({
    api: null,
    initialParams: {
      pageSize: 10,
      pageNo: 1,
    },
    initialData: props.stars,
  });
};

export const DDDStore = () => {
  const { state } = useData();
  return useResponse({
    api: null,
    initialParams: {},
    initialData: state?.indexData,
  });
};
