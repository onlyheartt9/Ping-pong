import { useList, useData, useResponse } from "@/utils/hooks";

// list demo
export const XXXStore = () => {
  const { state } = useData<any>();
  return useList({
    api: null,
    initialParams: {
      pageSize: 10,
      pageNo: 1,
    },
    initialData: state?.indexData,
  });
};

export const DDDStore = () => {
  const { state } = useData<any>();
  return useResponse({
    api: null,
    initialParams: {},
    initialData: state?.indexData,
  });
};
