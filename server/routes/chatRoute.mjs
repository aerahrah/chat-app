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
import authenticate from "../middleware/authenticate.mjs";

const router = express.Router();

router.get("/", authenticate, getAllChat);
router.get("/:chatId", authenticate, getConversation);
router.post("/private", authenticate, createPrivateChat);
router.post("/group", authenticate, createGroupChat);

router.post("/:chatId", authenticate, sendChatMessage);
router.post("/:chatId/add-member", authenticate, addNewMember);
router.post("/:chatId/leave", authenticate, leaveGroupChat);

export default router;
