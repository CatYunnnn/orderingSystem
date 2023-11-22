import React, { useState, useEffect } from "react";
import styles from "../styles/menu.module.css";
import axios from "axios";
////從後端資料庫撈菜單
const Menu = ({ onDataClick, params }) => {

  ////變數放資料庫裡面撈的資料
  const [food, setFood] = useState({});

  ////連接後端api
  useEffect(() => {
 
    axios
      .get(`http://localhost:5000/page/pages/${params}`)
      .then((res) => {
        setFood(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params]);

  ////選取點選的食物
  const handleClick = (key) => {
    onDataClick(food[key].name);
  };

  ////製作分頁
  const itemsPerPage = 8; ////每頁顯示數量
  const [currentPage, setCurrentPage] = useState(1); ////當前頁數
  const startIndex = (currentPage - 1) * itemsPerPage; ////計算起始項目
  const endIndex = startIndex + itemsPerPage; ////計算結束項目
  const currentItems = Object.keys(food).slice(startIndex, endIndex); ////取每頁要渲染的資料
  const totalPages = Math.ceil(Object.keys(food).length / itemsPerPage); ////計算總頁數

  ////前一頁或下一頁
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  return (
    <div className={styles.menu}>
      <div className={styles.optionArea}>
        {currentItems.map((key) => {
          return (
            <div
              key={key}
              onClick={() => handleClick(key)}
              className={styles.options}
            >
              {food[key].name}
            </div>
          );
        })}
      </div>
      <div className={styles.pageButton}>
        <button
          className={styles.pageButtons}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          上一頁
        </button>
        <p className={styles.pages}>
          {currentPage} / {totalPages}
        </p>
        <button
          className={styles.pageButtons}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          下一頁
        </button>
      </div>
    </div>
  );
};

export default Menu;
