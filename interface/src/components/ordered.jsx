import React from "react";
import styles from "../styles/ordered.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

////點餐明細
const Ordered = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/page/ordered`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  ////轉成陣列好用map
  let items = Object.keys(data);

  ////
  let history = useNavigate()
  return (
    <div>
      <Link className={styles.link} to="/">
        <button className={styles.backToHome}>返回首頁</button>
      </Link>
      <p className={styles.remind}>這是您現在的點餐內容</p>
      <main>
        <div className={styles.leftSide}>
          <div className={styles.titleRow}>
            <div className={styles.titleName}>商品名稱</div>
            <div className={styles.titleAmount}>數量</div>
            <div className={styles.titleFinish}>上菜</div>
          </div>
          {/*渲染下單的餐點*/}
          {items.map((key) => {
            return (
              <div className={styles.recordRow}>
                <div className={styles.id}>{Number(key) + 1}</div>
                <div className={styles.dishName}>{data[key].name}</div>
                <div className={styles.amount}>{data[key].amount}</div>
                <div className={styles.finish}>結束</div>
              </div>
            );
          })}
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
              <button className={styles.back} onClick={()=>history(-1)}>返回</button>
            <Link className={styles.link} to="/checkout">
              <button className={styles.check}>服務鈴/結帳</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ordered;
