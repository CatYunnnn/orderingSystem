import React from "react";
import styles from "../styles/nav.module.css";
import { Link } from "react-router-dom";
////導覽列
const Nav = () => {
  return (
    <div className={styles.navbar}>
      <Link className={styles.link} to="/">
        <button className={styles.option}>Top</button>
      </Link>
      <Link className={styles.link} to="/pages/limitedtimeoffer">
        <button className={styles.option}>期間限定</button>
      </Link>
      <Link className={styles.link} to="/pages/nigiriSushi">
        <button className={styles.option}>握壽司</button>
      </Link>
      <Link className={styles.link} to="/pages/gunkanmaki">
        <button className={styles.option}>軍艦、捲類</button>
      </Link>
      <Link className={styles.link} to="/pages/noodles">
        <button className={styles.option}>麵類、湯類</button>
      </Link>
      <Link className={styles.link} to="/pages/sideDishes">
        <button className={styles.option}>副餐類</button>
      </Link>
      <Link className={styles.link} to="/pages/desserts">
        <button className={styles.option}>甜點、飲料</button>
      </Link>
    </div>
  );
};

export default Nav;
