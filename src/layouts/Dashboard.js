import React from "react";

import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import Sidebar from "../components/Sidebar";
import CustomAppBar from "../components/CustomAppBar";

import { DropdownContextProvider } from "../context/DropdownContext";

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DropdownContextProvider>
      {mobile ? <CustomAppBar /> : <Sidebar />}
      {children}
    </DropdownContextProvider>
  );
};

export default Dashboard;
