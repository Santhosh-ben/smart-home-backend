// src/components/ThermostatControl.jsx
import React, { useState, useEffect } from "react";
import { FaThermometerHalf } from "react-icons/fa";
import socket from "../socket";

function ThermostatControl() {
  const [temperature, setTemperature] = useState(25);

  useEffect(() => {
    socket.on("temperature-updated", (temp) => {
      setTemperature(temp);
    });

    return () => {
      socket.off("temperature-updated");
    };
  }, []);

  const changeTemperature = (e) => {
    socket.emit("set-temperature", e.target.value);
  };

  return (
    <div className="control-card">
      <h2>
        <FaThermometerHalf style={{ marginRight: "8px" }} />
        Thermostat Control
      </h2>
      <input
        type="range"
        min="16"
        max="32"
        value={temperature}
        onChange={changeTemperature}
        style={{ width: "100%" }}
      />
      <p className="status-text">Temperature: {temperature}°C</p>
    </div>
  );
}

export default ThermostatControl;
