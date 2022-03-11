import { Progress } from "../Progress";
import styles from "./style.module.less";
export const Vote = ({ width = "492px",...props }) => {
  const arr = [1, 2, 3];
  return (
    <div className={styles["vote"]}>
      {arr.map((item) => (
        <div key={item} style={{ width }} className={styles["vote-progress"]}>
          <Progress {...props}></Progress>
        </div>
      ))}
    </div>
  );
};
