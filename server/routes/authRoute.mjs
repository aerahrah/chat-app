import express from "express";
import { signup, signin, getAllUsers } from "../controller/authController.mjs";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
