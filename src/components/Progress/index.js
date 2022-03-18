import styles from "./style.module.less";
import { Tooltip } from "antd";
import { useState, useEffect } from "react";
import { FlashNumber } from "../FlashNumber";

const CheckMark = () => {
  return <div></div>;
};

const Progress = ({
  width = "initial",
  percent = "30%",
  isVote = false,
  vote,
  callback,
}) => {
  const [type, setType] = useState(true);
  const onClick = () => {
    console.log(vote);
    setType(false);
    callback && callback();
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
      <div className={styles["progress-option"]}>猜猜我是谁</div>
      <div className={styles["progress-right"]}>
        <div className={styles["progress-nums"]}>
          <FlashNumber>290</FlashNumber>票
        </div>
        {isVote && (
          <div onClick={onClick} className={styles["progress-vote-botton"]}>
            {type ? <p>+1</p> : <CheckMark></CheckMark>}
          </div>
        )}
      </div>
    </div>
  );
};

export { Progress };
