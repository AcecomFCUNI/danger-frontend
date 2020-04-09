import React from "react";

import "./components/main.css";

// import Statistics from "./components/Statistics";
import MapView from "./components/MapView";
import Dashboard from "./layouts/Dashboard";

export default function App() {
  return (
    <React.Fragment>
      <Dashboard>
        <MapView />
      </Dashboard>
    </React.Fragment>
  );
}
