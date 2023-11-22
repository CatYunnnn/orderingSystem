import React from "react";
import styles from "../styles/ordered.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
////點餐明細
const Ordered = () => {
  const [data, setData] = useState();

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/page/ordered`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <button className={styles.backToHome}>返回首頁</button>
      <p className={styles.remind}>這是您現在的點餐內容</p>
      <main>
        <div className={styles.leftSide}>
          <div className={styles.titleRow}>
            <div className={styles.titleName}>商品名稱</div>
            <div className={styles.titleAmount}>數量</div>
            <div className={styles.titleFinish}>上菜</div>
          </div>
          <div className={styles.recordRow}>
            <div className={styles.id}>1</div>
            <div className={styles.dishName}>天婦羅</div>
            <div className={styles.amount}>2</div>
            <div className={styles.finish}>結束</div>
          </div>
        </div>
        <div className={styles.mid}>
          <div className={styles.scrollButtonUp}>上</div>
          <div className={styles.scrollButtonDown}>下</div>
        </div>
        <div className={styles.rightSide}>
          <p className={styles.remind}>
            如有餐點尚未到齊，請告知您附近的服務人員
          </p>
          <div className={styles.otherButton}>
            <button className={styles.back}>返回</button>
            <button className={styles.check}>服務鈴/結帳</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ordered;
