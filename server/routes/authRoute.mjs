import express from "express";
import {
  signup,
  signin,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateUserImage,
} from "../controller/authController.mjs";
import authenticate from "../middleware/authenticate.mjs";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/user", authenticate, getUserProfile);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/user/update-info", authenticate, updateUserProfile);
router.patch("/user/update-userimg", authenticate, updateUserImage);

export default router;
