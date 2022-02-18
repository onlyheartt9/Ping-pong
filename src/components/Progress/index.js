import styles from "./style.module.less";
import { Tooltip } from "antd";

const Progress = ({ width, percent = "30%" }) => {
  return (
    <div
      className={styles["progress"]}
      style={{
        width,
      }}
    >
      <div
        className={styles["progress-percent"]}
        style={{ width: percent }}
      ></div>
      <div className={styles["progress-option"]}>猜猜我是谁</div>
      <div className={styles["progress-right"]}>
        <div className={styles["progress-nums"]}>80票</div>
        {<div className={styles["progress-vote-botton"]}>+1</div>}
      </div>
    </div>
  );
};
export { Progress };
