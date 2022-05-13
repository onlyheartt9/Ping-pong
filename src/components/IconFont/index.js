import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
const Icon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_3361519_bk49up67s1.js",
});
const IconFont = ({ type, fontSize, color, style, className }) => {
  return (
    <Icon
      className={className}
      type={type}
      style={{ fontSize, color, ...style }}
    ></Icon>
  );
};
export { IconFont };
