import express from "express";
import {
  createPrivateChat,
  createGroupChat,
  sendChatMessage,
  getAllChat,
  getConversation,
  addNewMember,
  leaveGroupChat,
  editChatMemberNickname,
  editChatName,
  editChatImage,
} from "../controller/chatController.mjs";
import authenticate from "../middleware/authenticate.mjs";

const router = express.Router();

router.get("/", authenticate, getAllChat);
router.get("/:chatId", authenticate, getConversation);
router.post("/private", authenticate, createPrivateChat);
router.post("/group", authenticate, createGroupChat);

router.post("/:chatId", authenticate, sendChatMessage);
router.post("/:chatId/add-member", authenticate, addNewMember);
router.post("/:chatId/edit-chat-name", authenticate, editChatName);
router.post("/:chatId/edit-chat-image", authenticate, editChatImage);
router.post("/:chatId/leave", authenticate, leaveGroupChat);
router.post(
  "/:chatId/edit-member-nickname",
  authenticate,
  editChatMemberNickname
);

export default router;
