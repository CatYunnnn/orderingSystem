import React, { useState, useEffect } from "react";
import styles from "../styles/record.module.css";
import Add from "./adder";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
////點餐紀錄
const Record = ({ data, dataReset }) => {

  ////從menu那邊點餐所取得的資料
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    if (dataList.length >= 4) return;
    if (data && !dataList.includes(data))
      setDataList((preDataList) => [...preDataList, data]);
    dataReset();
    /* eslint-disable-next-line */ //把警告關掉 這裡只要用data判斷
  }, [data]);

  ////建立填充的格子
  let fill = 4 - dataList.length; ////在沒有數據時創造填滿的格子
  if (fill < 0) fill = 0;
  const fillRecord = Array(fill).fill(0); ////要先把裡面設值 不然無法用map

  ////刪除
  const cancel = (item) => {
    const newArray = dataList.filter((i) => i !== item);
    setDataList(newArray);
  };

  ////創造一個可以接收子層數據的物件用來傳遞到資料庫
  let order = {}; 

  ////彈窗
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 3000);
  };
  
  ////串接後端post api
  const ordering = () => {
    if (Object.keys(order).length !== 0) {
      axios
        .post("http://localhost:5000/page/ordering", order)
        .then((res) => {
          console.log("Data sent successfully:", res.data);
        })
        .catch((err) => {
          console.error("Error sending data:", err);
        });
      order = {};
      setDataList([]); ////清空購物清單
      openModal();
      console.log(dataList);
    }
  };
  return (
    <div className={styles.record}>
      <Modal isOpen={modalIsOpen}>
        <h2>Modal Title</h2>
        <p>Modal Content</p>
      </Modal>
      <Link className={styles.link} to="/ordered">
        <button className={styles.recordButton}>點餐紀錄</button>
      </Link>
      <div className={styles.recordsWrap}>
        <div className={styles.titleRow}>
          <div className={styles.title}>商品名稱</div>
          <div className={styles.amount}>數量</div>
          <div className={styles.changeAmount}>增</div>
          <div className={styles.changeAmount}>減</div>
          <div className={styles.cancel}>取消</div>
        </div>
        {dataList.map((items) => {
          return <Add items={items} cancel={cancel} order={order} />;
        })}
        {fillRecord.map(() => {
          return (
            <div className={styles.recordRow}>
              <div className={styles.itemName}></div>
              <div className={styles.itemAmount}></div>
              <div className={styles.itemAmountChange}></div>
              <div className={styles.itemAmountChange}></div>
              <div className={styles.itemCancel}></div>
            </div>
          );
        })}
      </div>

      <button className={styles.orderButton} onClick={ordering}>
        點餐
      </button>
    </div>
  );
};

export default Record;
