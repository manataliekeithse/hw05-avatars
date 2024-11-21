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

// lets import the upload middleware that we created in upload.js
// lets call the single function of multer to restrict the file upload to one file per
// model or schema field

router.patch(
  "/avatars",
  authenticateToken,
  upload.single("avatarURL"),
  updateAvatar
);

export { router };
