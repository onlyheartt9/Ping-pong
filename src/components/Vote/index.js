import { Progress } from "../Progress";
import styles from "./style.module.less";
export const Vote = ({ width = "492px" }) => {
  const arr = [1, 2, 3];
  return (
    <div className={styles["vote"]}>
      {arr.map((item) => (
        <div key={item} className={styles["vote-progress"]}>
          <Progress width={width}></Progress>
        </div>
      ))}
    </div>
  );
};
