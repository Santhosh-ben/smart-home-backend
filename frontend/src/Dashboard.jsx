// src/Dashboard.jsx
import React from "react";
import LightsControl from "./components/LightsControl";
import ThermostatControl from "./components/ThermostatControl";
import SecurityControl from "./components/SecurityControl";
import "./App.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Smart Home Control Dashboard</h1>
      <div className="control-section">
        <LightsControl />
      </div>
      <div className="control-section">
        <ThermostatControl />
      </div>
      <div className="control-section">
        <SecurityControl />
      </div>
    </div>
  );
}

export default Dashboard;
