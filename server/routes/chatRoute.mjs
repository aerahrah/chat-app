import express from "express";
import {
  getAllChat,
  getConversation,
  createPrivateChat,
  createGroupChat,
  createPinMessage,
  createChatMessage,
  addNewMember,
  leaveGroupChat,
  removeChatMember,
  editChatMemberNickname,
  editChatName,
  editChatImage,
  editColorTheme,
} from "../controller/chatController.mjs";
import authenticate from "../middleware/authenticate.mjs";

const router = express.Router();

router.get("/", authenticate, getAllChat);
router.get("/:chatId", authenticate, getConversation);
router.post("/private", authenticate, createPrivateChat);
router.post("/group", authenticate, createGroupChat);

router.post("/:chatId", authenticate, createChatMessage);
router.post("/:chatId/add-pin-message", authenticate, createPinMessage);
router.post("/:chatId/add-member", authenticate, addNewMember);
router.post("/:chatId/remove-member", authenticate, removeChatMember);
router.post("/:chatId/leave-group", authenticate, leaveGroupChat);
router.post("/:chatId/edit-chat-name", authenticate, editChatName);
router.post("/:chatId/edit-chat-image", authenticate, editChatImage);
router.post("/:chatId/edit-chat-colortheme", authenticate, editColorTheme);
router.post(
  "/:chatId/edit-member-nickname",
  authenticate,
  editChatMemberNickname
);

export default router;
