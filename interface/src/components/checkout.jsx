import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/checkout.module.css";
import Modal from "react-modal";
const Checkout = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  ////確認結帳打開彈窗
  const leave = () => {
    setModalIsOpen(true);
  };

  ////記住上一頁的紀錄
  let history = useNavigate();

  return (
    <div className={styles.checkout}>
      <Modal className={styles.modal} isOpen={modalIsOpen}>
        <div className={styles.text}>非常感謝您光臨本店</div>
      </Modal>
      <div className={styles.text}>稍後由服務員為您進行買單服務, 確定嗎?</div>
      <div className={styles.buttons}>
        <button className={styles.yes} onClick={leave}>
          是
        </button>
        <button className={styles.no} onClick={() => history(-1)}>
          否
        </button>
      </div>
    </div>
  );
};

export default Checkout;
