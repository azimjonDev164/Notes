import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";
import Sidebar from "./Sidebar";

const Layuot = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layuot;
