import express from "express";
import cors from "cors";
import connectDb from "./db/connectDB.mjs";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import authRoute from "./routes/authRoute.mjs";
import chatRoute from "./routes/chatRoute.mjs";

dotenv.config();

const port = 3500;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/chat", chatRoute);
app.use("/auth", authRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
});
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
