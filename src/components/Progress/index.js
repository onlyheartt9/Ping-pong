import styles from "./style.module.less";
import { Tooltip } from "antd";
import { useState, useEffect } from "react";
import { getGradualNum } from "@/utils";

const Progress = ({ width = "initial", percent = "30%", isVote = false }) => {
  const [num, setNum] = useState(80);
  useEffect(() => {
    getGradualNum(num, setNum);
  }, []);
  return (
    <div
      className={styles["progress"]}
      style={{
        width,
      }}
    >
      <div className={styles["progress-percent"]} style={{ width: percent }}>
        <div></div>
      </div>
      <div className={styles["progress-option"]}>猜猜我是谁</div>
      <div className={styles["progress-right"]}>
        <div className={styles["progress-nums"]}>{num}票</div>
        {isVote && <div className={styles["progress-vote-botton"]}>+1</div>}
      </div>
    </div>
  );
};

export { Progress };
