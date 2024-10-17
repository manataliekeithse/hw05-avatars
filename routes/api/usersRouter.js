import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUsers,
  updateUserSubscription,
  updateAvatar,
} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/auth.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/logout", authenticateToken, logoutUser);

router.get("/current", authenticateToken, getCurrentUsers);

router.patch("/", authenticateToken, updateUserSubscription);

router.patch(
  "/avatars",
  authenticateToken,
  upload.single("avatar"),
  updateAvatar
);

export { router };
