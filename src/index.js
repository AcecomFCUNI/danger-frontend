import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { RegionsContextProvider } from "../src/context/RegionsContext";

ReactDOM.render(
  <RegionsContextProvider>
    <App />
  </RegionsContextProvider>,
  document.getElementById("root")
);
