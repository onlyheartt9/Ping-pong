import styles from "./style.module.less";
import { Tooltip } from "antd";
import { useState, useEffect, useMemo } from "react";
import { FlashNumber } from "../FlashNumber";
import IconFont from "../IconFont";
import { options } from "less";

const CheckMark = () => {
  return (
    <div>
      <IconFont type={"icon-pinglun"}></IconFont>
    </div>
  );
};

const Progress = ({
  width = "initial",
  percent,
  isVote = false,
  voteClick,
  option,
  type = false,
}) => {
  const onClick = () => {
    if (type) {
      return;
    }
    voteClick && voteClick(option);
  };
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
      <div className={styles["progress-option"]}>{option.content}</div>
      <div className={styles["progress-right"]}>
        <div className={styles["progress-nums"]}>
          <FlashNumber>{option.totalSelected}</FlashNumber>票
        </div>
        {isVote && (
          <div onClick={onClick} className={styles["progress-vote-botton"]}>
            {!option.selected ? <p>+1</p> : <CheckMark></CheckMark>}
          </div>
        )}
      </div>
    </div>
  );
};

export { Progress };
