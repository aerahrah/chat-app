import express from "express";
import {
  signup,
  signin,
  getAllUsers,
  getUserProfile,
} from "../controller/authController.mjs";
import authenticate from "../middleware/authenticate.mjs";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/user", authenticate, getUserProfile);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
