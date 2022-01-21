import styles from "./style.module.less";
import { Tooltip } from "antd";

const Progress = ({ width }) => {
  const arr = [
    {
      title: "title1",
      num: 40,
      color: "red",
    },
    {
      title: "title2",
      num: 30,
      color: "green",
    },
    {
      title: "title3",
      num: 20,
      color: "blue",
    },
    {
      title: "title4",
      num: 10,
      color: "pink",
    },
  ];
  const countNum = arr.reduce((num, count) => num + count.num, 0);
  return (
    <div
      className={styles["progress"]}
      style={{
        width,
      }}
    >
      {arr.map((item, index) => (
        <Tooltip key={index} title={item.title}>
          <div
            className={styles["progress-item"]}
            style={{
              width: `${((item.num / countNum) * 100).toFixed(2)}%`,
              background: item.color,
              zIndex: 99 - index,
            }}
          >
            <span>{`${((item.num / countNum) * 100).toFixed(2)}%`}</span>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
export { Progress };
