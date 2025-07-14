import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

const Layout = () => {
  const [active, setActive] = useState(false);

  const activeSideBar = () => {
    setActive((prev) => (prev = !prev));
  };

  return (
    <div className="flex flex-col">
      <Navbar activeSideBar={activeSideBar} />
      <div className="flex flex-row h-[calc(100vh-70px)]">
        <Sidebar active={active} />
        <div className="App hide-scrollbar flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
