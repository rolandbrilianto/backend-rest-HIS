const express = require("express");
const router = express.Router();
const {
  getProfileController,
  updateProfileController,
  updateProfileImageController,
} = require("../controllers/profile.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { sendResponse } = require("../utils/response");
const upload = require("../config/multer");

router.get("/profile", authMiddleware, getProfileController);

router.put("/profile/update", authMiddleware, updateProfileController);

router.put(
  "/profile/image",
  authMiddleware,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return sendResponse(res, 400, 102, "Format Image tidak sesuai");
      }
      next();
    });
  },
  updateProfileImageController,
);

module.exports = router;
