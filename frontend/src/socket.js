// src/socket.js
import { io } from "socket.io-client";
const socket = io("http://localhost:4000"); // Make sure this URL matches your backend URL
export default socket;
