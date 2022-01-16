import { STORE_CONTEXT } from "_build/create-context";
import { IContext } from "ssr-types-react";
import { useState, useEffect, useContext } from "react";

export function useData<T>() {
  return useContext<IContext<T>>(STORE_CONTEXT);
}

export function useResetState<T>(val: T): [T, any, any] {
  const [value, setValue] = useState(val);
  const resetValue = () => {
    setValue(val);
    return val;
  };
  return [value, setValue, resetValue];
}

// 自定义翻页请求hooks
export function useList<T, V>({
  api,
  initialParams,
  initialData,
}: {
  api?: any;
  initialParams: T;
  initialData?: V[];
}): any {
  // 接口参数
  const [params, setParams, resetParams] = useResetState(initialParams);
  // 数据
  const [list, setList, resetList] = useResetState(initialData ?? []);
  // 总数
  const [total, setTotal, resetTotal] = useResetState(0);
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true);
  // 是叠加还是翻页
  const [add, setAdd] = useState(false);
  // hooks自身第一次useEffect不执行，需要外部调用getList触发useEffect
  const [key, setKey] = useState(false);
  // loading
  const [loading, setLoading] = useState(false);

  //重置状态
  const reset = () => {
    const resetMethods = [resetParams, resetList, resetTotal];
    resetMethods.forEach((method) => method());
  };

  // 采用参数合并的方式
  const getList = (param = {}, option = {}) => {
    const { isAdd = false } = option;
    setParams({ ...params, ...param });
    setAdd(isAdd);
    setKey(true);
  };

  useEffect(() => {
    if (!key || !api) {
      return;
    }
    setLoading(true);
    api(params).then((res) => {
      setLoading(false);
      if (!res) {
        return;
      }
      const { pageSize, pageNo, items } = res;
      setHasMore(pageSize * pageNo < res.total);
      setTotal(res.total);
      setList(!add ? items : [...list, ...items]);
    });
  }, [params, add, key]);
  return { getList, list, hasMore, total, params, reset, loading };
}

//
export function useResponse<T, V>({
  api,
  initialParams,
  initialData,
}: {
  api?: any;
  initialParams: T;
  initialData?: V[];
}): any {
  // 接口参数
  const [params, setParams, resetParams] = useResetState(initialParams);
  // 数据
  const [data, setData, resetData] = useResetState(initialData ?? null);
  
  // hooks自身第一次useEffect不执行，需要外部调用getData触发useEffect
  const [key, setKey] = useState(false);
  // loading
  const [loading, setLoading] = useState(false);

  //重置状态
  const reset = () => {
    const resetMethods = [resetParams, resetData];
    resetMethods.forEach((method) => method());
  };

  // 采用参数合并的方式
  const getData = (param: any, option = {}) => {
    setParams({ ...params, ...param });
    setKey(true);
  };

  useEffect(() => {
    if (!key || !api) {
      return;
    }
    setLoading(true);
    api(params).then((res) => {
      setLoading(false);
      if (!res) {
        return;
      }
      setData(res.data);
    });
  }, [params, key]);
  return { getData, data, params, reset, loading };
}
