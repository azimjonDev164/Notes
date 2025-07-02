import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

const Layuot = () => {
  return (
    <>
      <Navbar />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layuot;
