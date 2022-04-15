import moment from "moment";
export const timeCompute = (timeStr) => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  const now = new Date().getTime();
  const beforeTime = new Date(timeStr).getTime();
  const timeDifference = now - beforeTime;
  let result = "刚刚发布";
  if (timeDifference / week > 1) {
    result = moment(timeStr).format("YYYY-MM-DD");
  } else if (timeDifference / day >= 1) {
    result = `${Math.floor(timeDifference / day)}天前`;
  } else if (timeDifference / hour >= 1) {
    result = `${Math.floor(timeDifference / hour)}小时前`;
  } else if (timeDifference / minute >= 1) {
    result = `${Math.floor(timeDifference / minute)}分钟前`;
  }
  return result;
};

export const parseCookie = (cookieStr) => {
  const cookies = cookieStr.split(";");
  const map = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    map[key.trim()] = decodeURI(value);
  });
  return map;
};

export const getEmoji = (str) => {
  const emojis = str.match(/\[.*?\]/g);
  return str;
};

export const getGradualNum = (num, setNum) => {
  let start = new Date();
  let startNum = 0;
  const addNum = num / 100;
  const ani = (callback, interval) => {
    const now = new Date();
    let key = false;
    if (now - start >= interval) {
      start = now;
      key = callback();
    }
    if (key) {
      return;
    }
    requestAnimationFrame(() => {
      ani(callback, interval);
    });
  };

  ani(() => {
    startNum += addNum;
    setNum(startNum >= num ? num : Math.floor(startNum));
    if (startNum >= num) {
      return true;
    }
  }, 10);
};

export const requireComponent = (r, { excludes = [], callback = (e) => e }) => {
  // 获取所有需要export的组件
  // const r = require.context("./", true, /.index.js$/);

  let components = {};
  // const excludes = ["./index.js", "./Layout/index.js"];
  r.keys().forEach((key) => {
    if (excludes.includes(key)) {
      return;
    }
    const cmp = r(key);
    components = { ...components, ...cmp };
  });

  // 组件添加memo
  Object.keys(components).forEach((key) => {
    const cmp = callback(components[key], key, components);
    if (!cmp) {
      return;
    }
    components[key] = cmp;
  });

  return components;
};
