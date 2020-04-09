import React from "react";
import AppBar from "../components/AppBar";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Sidebar from "../components/Sidebar";

export default function Dashboard({ children, regions }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      {matches ? <AppBar /> : <Sidebar />}
      {children}
    </React.Fragment>
  );
}
