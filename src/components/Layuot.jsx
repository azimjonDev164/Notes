import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row h-[calc(100vh-70px)]">
        <Sidebar />
        <div className="App flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
