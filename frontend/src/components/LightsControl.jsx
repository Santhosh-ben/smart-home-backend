// src/components/LightsControl.jsx
import React, { useState, useEffect } from "react";
import { FaLightbulb } from "react-icons/fa";
import socket from "../socket";

function LightsControl() {
  const [lightStatus, setLightStatus] = useState(false);

  useEffect(() => {
    socket.on("light-updated", (status) => {
      setLightStatus(status);
    });

    return () => {
      socket.off("light-updated");
    };
  }, []);

  const toggleLight = () => {
    socket.emit("toggle-light", !lightStatus);
  };

  return (
    <div className="control-card">
      <h2>
        <FaLightbulb style={{ marginRight: "8px" }} />
        Lights Control
      </h2>
      <label className="toggle-switch">
        <input type="checkbox" checked={lightStatus} onChange={toggleLight} />
        <span className="slider"></span>
      </label>
      <p className="status-text">{lightStatus ? "ON" : "OFF"}</p>
    </div>
  );
}

export default LightsControl;
