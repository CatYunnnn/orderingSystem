import React from "react";
import { useState } from "react";
import styles from "../styles/home.module.css";
import { Link, useSearchParams } from "react-router-dom";
import Modal from "react-modal";
////主頁
const Home = () => {
  ////結帳彈窗
  const [modalCheckoutIsOpen, setModalCheckoutIsOpen] = useState(false);
  const openModal = () => {
    setModalCheckoutIsOpen(true);
  };

  ////離開彈窗
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const leave = () => {
    setModalIsOpen(true);
    setModalCheckoutIsOpen(false);
  };

  ////取消
  const cancel = () => {
    setModalCheckoutIsOpen(false);
    console.log('test')
  }

  return (
    <div className={styles.homePage}>
      {/*結帳彈窗*/}
      <Modal className={styles.checkout} isOpen={modalCheckoutIsOpen}>
        <div className={styles.text}>稍後由服務員為您進行買單服務</div>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={leave}>是</button>
          <button className={styles.no} onClick={cancel}>否</button>
        </div>
      </Modal>
      {/*謝謝惠顧彈窗*/}
      <Modal className={styles.leave} isOpen={modalIsOpen}>
        <div className="text">非常感謝您光臨本店</div>
      </Modal>
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
      {/*其他選項*/}
      <div className={styles.additionalButtons}>
        <Link className={styles.recordButtonLink} to="/ordered">
          <button className={styles.recordButton}>點餐紀錄</button>
        </Link>
        <button onClick={openModal} className={styles.serviceButton}>
          服務鈴/結帳
        </button>
      </div>
    </div>
  );
};

export default Home;
