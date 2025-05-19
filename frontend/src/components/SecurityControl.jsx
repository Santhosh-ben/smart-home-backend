// src/components/SecurityControl.jsx
import React, { useState, useEffect } from "react";
import { FaShieldAlt } from "react-icons/fa";
import socket from "../socket";

function SecurityControl() {
    const [securityEnabled, setSecurityEnabled] = useState(false);

    useEffect(() => {
        socket.on("security-updated", (status) => {
            setSecurityEnabled(status);
        });

        return () => {
            socket.off("security-updated");
        };
    }, []);

    const toggleSecurity = () => {
        socket.emit("toggle-security", !securityEnabled);
    };

    return (
        <div className="control-card">
            <h2>
                <FaShieldAlt style={{ marginRight: "8px" }} />
                Security Control
            </h2>
            <label className="toggle-switch">
                <input type="checkbox" checked={securityEnabled} onChange={toggleSecurity} />
                <span className="slider"></span>
            </label>
            <p className="status-text">{securityEnabled ? "Enabled" : "Disabled"}</p>
        </div>
    );
}

export default SecurityControl;
