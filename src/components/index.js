import { requireComponent } from "@/utils";
import React from "react";

const callback = (cmp) => {
  if (cmp.memo === false) {
    return false;
  }
  return React.memo(cmp);
};
const r = require.context("./", true, /.index.js$/);
module.exports = requireComponent(r, {
  excludes: ["./index.js", "./Layout/index.js"],
  callback,
});