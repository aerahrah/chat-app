import express from "express";
import cors from "cors";
import connectDb from "./db/connectDB.mjs";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.mjs";
import chatRoute from "./routes/chatRoute.mjs";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/chat", chatRoute);
app.use("/auth", authRoute);
const port = 3500;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
