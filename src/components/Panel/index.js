import styles from "./style.module.less";
function Panel() {
  return (
    <div className={styles['panel']}>
      <div className={styles['panel-title']}>PP Talk</div>
      <div className={styles['panel-describe']}>一个没有硝烟的辩论战场</div>
    </div>
  );
}

export { Panel };
