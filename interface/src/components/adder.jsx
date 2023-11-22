import React, { useState } from "react";
import styles from "../styles/record.module.css";
const Add = ({ items, cancel, order }) => {

  ////一開始的餐點數量預設為1
  const [count, setCount] = useState(1);

  ////建立某個品項的類別及項目
  order[`${items}`] = count; 

  ////增加餐點數量
  const adder = () => {
    if (count < 9) setCount(count + 1);
    order[`${items}`] = count;
  };

  ////減少餐點數量
  const subtractor = () => {
    if (count > 1) setCount(count - 1);
    order[`${items}`] = count;
    console.log(order);
  };

  ////取消餐點
  const clean = () => {
    cancel(items);
    delete order[`${items}`];
  };
  
  return (
    <div className={styles.recordRow}>
      <div className={styles.itemName}>{items}</div>
      <div className={styles.itemAmount}>{count}</div>
      <div className={styles.itemAmountChange} onClick={subtractor}>{`<`}</div>
      <div className={styles.itemAmountChange} onClick={adder}>{`>`}</div>
      <div className={styles.itemCancel} onClick={clean}>
        取消
      </div>
    </div>
  );
};

export default Add;
