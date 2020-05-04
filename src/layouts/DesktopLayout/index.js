import React from "react";
import Sidebar from "./components/Sidebar";
import DrawerBottom from "./components/DrawerBottom";

const DesktopLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Sidebar />
      <div style={{ position: "absolute", zIndex: 10 }}>{children}</div>
      <DrawerBottom />
    </React.Fragment>
  );
};

export default DesktopLayout;
