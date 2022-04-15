import styles from "./style.module.less";
import { Tooltip } from "antd";
import { useState, useEffect } from "react";
import { getGradualNum } from "@/utils";
import React from "react";

const FlashNumber = ({ children }) => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    getGradualNum(children - 0, setNumber);
  }, [children]);
  return <>{number}</>;
};

export { FlashNumber };
