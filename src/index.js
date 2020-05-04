import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CustomThemeProvider } from "../src/context/CustomThemeContext";
import configureStore from "./store";
import App from "./App";
import "./index.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </Provider>,
  document.getElementById("root")
);
