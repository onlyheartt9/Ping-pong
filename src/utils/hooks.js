import { useState, useEffect, useContext } from "react";

export const storeState = {};
export function useStoreState(key) {
  return storeState[key];
}

export function useResetState(val) {
  const [value, setValue] = useState(val);
  const resetValue = () => {
    setValue(val);
    return val;
  };
  return [value, setValue, resetValue];
}

// 自定义翻页请求hooks
export function useList({ api, initialParams, initialData }) {
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
      const { size, current, records } = res.data;
      setHasMore(size * current < res.total);
      setTotal(res.total);
      setList(!add ? records : [...list, ...records]);
    });
  }, [params, add, key]);
  return {
    getList,
    list: list.length === 0 ? initialData : list,
    hasMore,
    total,
    params,
    reset,
    loading,
    setList,
  };
}

//
export function useData({ api, initialParams, initialData }) {
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
  const getData = (param, option = {}) => {
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

  return {
    getData,
    data: data ?? initialData,
    params,
    reset,
    loading,
    setData,
  };
}

// 点击外部事件
export function useOutsideClick({ refs, callback }) {
  useEffect(
    () => {
      if (refs.some((ref) => !ref.current)) {
        return;
      }
      const onClick = (e) => {
        let { target } = e;
        while (target) {
          if (refs.some((ref) => ref.current.contains(target))) {
            return;
          }
          target = target.offsetParent;
        }

        callback();
      };
      document.addEventListener("click", onClick);
      return () => {
        document.removeEventListener("click", onClick);
      };
    },
    refs.map((ref) => ref.current)
  );
}
