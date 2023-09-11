import express from "express";
import {
  createPrivateChat,
  createGroupChat,
  sendChatMessage,
} from "../controller/chatController.mjs";

const router = express.Router();

router.post("/private", createPrivateChat);
router.post("/group", createGroupChat);
router.post("/:chatId", sendChatMessage);

export default router;
