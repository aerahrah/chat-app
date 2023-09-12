import express from "express";
import {
  createPrivateChat,
  createGroupChat,
  sendChatMessage,
  getAllChat,
  getConversation,
  addNewMember,
  leaveGroupChat,
} from "../controller/chatController.mjs";

const router = express.Router();

router.get("/", getAllChat);
router.get("/:chatId", getConversation);
router.post("/private", createPrivateChat);
router.post("/group", createGroupChat);

router.post("/:chatId", sendChatMessage);
router.post("/:chatId/add-member", addNewMember);
router.post("/:chatId/leave", leaveGroupChat);

export default router;
