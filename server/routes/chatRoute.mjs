import express from "express";
import {
  createPrivateChat,
  sendPrivateChatMessage,
} from "../controller/chatController.mjs";

const router = express.Router();

router.post("/private", createPrivateChat);
router.post(":chatId", sendPrivateChatMessage);

export default router;
