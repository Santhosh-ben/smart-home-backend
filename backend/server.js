// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let lightStatus = false;
let temperature = 25;
let securityEnabled = false;

app.get("/", (req, res) => {
  res.send("Smart Home Control Backend");
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Send the initial status to the client
  socket.emit("initial-status", {
    lightStatus,
    temperature,
    securityEnabled,
  });

  // Light Control
  socket.on("toggle-light", (status) => {
    lightStatus = status;
    io.emit("light-updated", lightStatus);
  });

  // Thermostat Control
  socket.on("set-temperature", (temp) => {
    temperature = temp;
    io.emit("temperature-updated", temperature);
  });

  // Security Control
  socket.on("toggle-security", (status) => {
    securityEnabled = status;
    io.emit("security-updated", securityEnabled);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
