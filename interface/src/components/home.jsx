import React from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
////主頁
const Home = () => {
  return (
    <div className={styles.homePage}>
      {/*不同餐點頁面*/}
      <div className={styles.menuOptions}>
        <Link className={styles.link} to="/pages/limitedtimeoffer">
          <button className={styles.option}>期間限定</button>
        </Link>
        <Link className={styles.link} to="/pages/nigiriSushi">
          <button className={styles.option}>握壽司</button>
        </Link>
        <Link className={styles.link} to="/pages/gunkanmaki">
          <button className={styles.option}>軍艦、捲類</button>
        </Link>
        <Link className={styles.link}  to="/pages/noodles">
          <button className={styles.option}>麵類、湯類</button>
        </Link>
        <Link className={styles.link} to="/pages/sideDishes">
          <button className={styles.option}>副餐類</button>
        </Link>
        <Link className={styles.link} to="/pages/desserts">
          <button className={styles.option}>甜點、飲料</button>
        </Link>
      </div>
      {/*其他選項*/}
      <div className={styles.additionalButtons}>
        <button className={styles.recordButton}>點餐紀錄</button>
        <button className={styles.serviceButton}>服務鈴/結帳</button>
      </div>
    </div>
  );
};

export default Home;
