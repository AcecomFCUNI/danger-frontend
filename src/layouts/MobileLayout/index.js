import React from "react";
import CustomAppBar from "./components/CustomAppBar";
import SectionDropdown from "./components/SectionDropdown";

const MobileLayout = ({ children }) => {
  return (
    <React.Fragment>
      <SectionDropdown />
      <CustomAppBar />
      <div style={{ position: "fixed", zIndex: 10 }}>{children}</div>
    </React.Fragment>
  );
};

export default MobileLayout;
