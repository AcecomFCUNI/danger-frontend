import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { RegionsContextProvider } from "../src/context/RegionsContext";
import CustomThemeProvider from "../src/context/CustomThemeContext";

ReactDOM.render(
  <CustomThemeProvider>
    <RegionsContextProvider>
      <App />
    </RegionsContextProvider>
  </CustomThemeProvider>,
  document.getElementById("root")
);
