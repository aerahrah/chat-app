import { io } from "socket.io-client";

const socket = io("http://localhost:3500");

socket.on("receive message", (message) => {
  console.log("Received message:", message);
});

export default socket;
