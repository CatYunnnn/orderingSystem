import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./navbar";
import Menu from "./menu";
import Record from "./record";
// import styles from "../styles/pages.module.css";
////第一頁
const Page = () => {
  const [data, setData] = useState();

  ////選取點擊餐點到記錄區
  const handleDataChange = (newData) => {
    setData(newData);
  };

  ////把data歸零 讓record頁的useEffect可以正常運作
  const dataReset = () => {
    setData("");
  };

  ////建立params把要渲染的是哪個類型的網頁傳下去
  let params = useParams();

  return (
    <div>
      <Nav />
      <div className="container" style={{ display: "flex", width: "100%" }}>
        <Menu onDataClick={handleDataChange} params={params.pageId} />
        <Record data={data} dataReset={dataReset} />
      </div>
    </div>
  );
};

export default Page;
