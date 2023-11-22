import "./App.css";
import Home from "./components/home";
import Page from "./components/page";
import Ordered from "./components/ordered";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/*定義react路由*/}
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="ordered" element={<Ordered />} />
        <Route path="pages/:pageId" element={<Page />} />
      </Routes>
    </>
  );
}

export default App;
