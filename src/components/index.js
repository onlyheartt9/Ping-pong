import React from "react";

// 获取所有需要export的组件
const r = require.context("./", true, /.index.js$/);
let components = {};
const excludes = ["./index.js", "./Layout/index.js"];
r.keys().forEach((key) => {
  if (excludes.includes(key)) {
    return;
  }
  const cmp = r(key);
  components = { ...components, ...cmp };
});


// 组件添加memo
Object.keys(components).forEach((key) => {
  const cmp = components[key];
  if(cmp.memo===false){
    return
  }
  components[key] = React.memo(cmp);
});

module.exports = components;
