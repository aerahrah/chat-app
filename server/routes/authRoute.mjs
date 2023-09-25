import express from "express";
import {
  signup,
  signin,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../controller/authController.mjs";
import authenticate from "../middleware/authenticate.mjs";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/user", authenticate, getUserProfile);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/user/update-info",authenticate, updateUserProfile);

export default router;
