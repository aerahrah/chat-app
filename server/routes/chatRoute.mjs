import express from "express";
import {
  createPrivateChat,
  createGroupChat,
  sendChatMessage,
  getAllChat,
  addNewMember,
} from "../controller/chatController.mjs";

const router = express.Router();

router.get("/", getAllChat);

router.post("/private", createPrivateChat);
router.post("/group", createGroupChat);

router.post("/:chatId", sendChatMessage);
router.post("/:chatId/add-member", addNewMember);

export default router;
