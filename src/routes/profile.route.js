const express = require("express");
const router = express.Router();
const {
  getProfileController,
  updateProfileController,
  updateProfileImageController,
} = require("../controllers/profile.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const upload = require("../config/multer");

router.get("/profile", authMiddleware, getProfileController);

router.put("/profile/update", authMiddleware, updateProfileController);

router.put(
  "/profile/image",
  authMiddleware,
  upload.single("file"),
  updateProfileImageController,
);

module.exports = router;
