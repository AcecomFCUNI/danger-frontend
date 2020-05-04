import React from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  colors: {
    background: "#E7E7E7",
    fontTitle: "#484947",
    casesIndicator: "#CF5252",
    fontSubtitle: "#30312f",
    totalCasesButton: "#249B9F",
    totalCasesButtonHover: "#31a5a9",
  },
});

export const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
