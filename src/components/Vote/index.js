import { Progress } from "../Progress";
import { useState, useEffect } from "react";
import styles from "./style.module.less";
const getTotal = (options) => {
  return options.reduce((count, option) => {
    return count + option.totalSelected;
  }, 0);
};

const getPercent = (num,total)=>{
  if(total === 0){
    return 0
  }
  const percent = (num/total*100).toFixed(2);
  return percent+"%"
}
export const Vote = ({ width = "492px", options, ...props }) => {
  const [total, setTotal] = useState(getTotal(options));
  useEffect(() => {
    setTotal(getTotal(options));
  }, [options]);
  useEffect(()=>{console.log(total)},[total])
  return (
    <div className={styles["vote"]}>
      {options.map((item) => (
        <div
          key={`${item.id}${item.totalSelected}`}
          style={{ width }}
          className={styles["vote-progress"]}
        >
          <Progress
            percent={getPercent(item.totalSelected,total)}
            // num={item.totalSelected}
            option={item}
            {...props}
          ></Progress>
        </div>
      ))}
    </div>
  );
};
