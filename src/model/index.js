import { storeState } from "@/utils/hooks";
import { requireComponent } from "@/utils";
// 获取所有需要export的组件
const callback = (cmp, key) => {
  return (...e) => {
    const newComponent = cmp(...e);
    storeState[key] = newComponent;
    return newComponent;
  };
};

const r = require.context("./", true, /.js$/);

module.exports = requireComponent(r, {
  excludes: ["./index.js"],
  callback,
});

