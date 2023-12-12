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
  let fill = 4 - dataList.length;
  if (fill < 0) fill = 0;
  const fillRecord = Array(fill).fill(0); ////要先把裡面設值 不然無法用map
  console.log(fillRecord)
  ////刪除
  const cancel = (item) => {
    const newArray = dataList.filter((i) => i !== item);
    setDataList(newArray);
  };

  ////創造一個可以接收子層數據的物件用來傳遞到資料庫
  let order = {};

  ////彈窗
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fillList,setFillList] = useState([]);
  const openModal = () => {
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 3000);
  };
  const [list, setList] = useState({});
  const [listArray, setListArray] = useState([]);
  ////串接後端post api

  useEffect(() => {
    setListArray(Object.keys(list));
    setFillList(Array(4 - Object.keys(list).length).fill(0));
    console.log(list);
  }, [list]);

  const ordering = () => {
    ////彈窗內容
    setList(order);

    ////用來使用map

    ////彈窗裡的list
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

      ////清空購物清單
      setDataList([]);

      ////建立餐點送出彈窗
      openModal();
    }
  };

  return (
    <div className={styles.record}>
      {/*彈窗*/}
      <Modal className={styles.modal} isOpen={modalIsOpen}>
        <div className={styles.text}>您訂購的餐點即將送達</div>
        <div className={styles.list}>
          <div className={styles.listRow}>
            <div className={styles.listNameTitle}>商品名稱</div>
            <div className={styles.listAmountTitle}>數量</div>
          </div>
          {listArray.map((key) => {
            return (
              <div className={styles.itemWrap}>
                <div className={styles.listName}>{key}</div>
                <div className={styles.listAmount}>{list[key]}</div>
              </div>
            );
          })}
          {fillList.map(() => {
            return (
              <div className={styles.fill}>
                <div className={styles.listName}></div>
                <div className={styles.listAmount}></div>
              </div>
            );
          })}
        </div>
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

        {/*填滿空間*/}
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
