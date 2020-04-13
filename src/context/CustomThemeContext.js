import React from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  colors: {
    green: green[300],
    grey: grey[800],
    softGrey: grey[300],
  },
});

export const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
